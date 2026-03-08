from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import os
import json
from pathlib import Path
from dotenv import load_dotenv
import uvicorn

load_dotenv()

app = FastAPI(title="Community API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data_store"
DATA_DIR.mkdir(exist_ok=True)

USERS_FILE = DATA_DIR / "users.json"
LIKES_FILE = DATA_DIR / "likes.json"

SAMPLE_CLASSES = [
    {
        "id": 1,
        "title": "Beginner Yoga Flow",
        "category": "Wellness",
        "description": "A relaxing yoga class for beginners.",
        "instructor": "Maya",
        "price": 15,
        "tags": ["yoga", "wellness", "beginner"],
        "level": "beginner"
    },
    {
        "id": 2,
        "title": "Creative Painting Workshop",
        "category": "Art",
        "description": "Explore acrylic painting with guided exercises.",
        "instructor": "Arun",
        "price": 20,
        "tags": ["art", "painting", "creative"],
        "level": "beginner"
    },
    {
        "id": 3,
        "title": "Hip Hop Basics",
        "category": "Dance",
        "description": "Learn rhythm, steps, and confidence.",
        "instructor": "Nina",
        "price": 18,
        "tags": ["dance", "hiphop", "fitness"],
        "level": "beginner"
    }
]

def load_json(path: Path, default):
    if not path.exists():
        return default
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default

def save_json(path: Path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

class UserProfileRequest(BaseModel):
    userId: str
    name: str
    email: str
    interests: List[str] = Field(default_factory=list)
    preferredTags: List[str] = Field(default_factory=list)
    skillLevel: Optional[str] = "beginner"

class RecommendationRequest(BaseModel):
    userId: Optional[str] = None
    interests: List[str] = Field(default_factory=list)
    preferredTags: List[str] = Field(default_factory=list)
    skillLevel: Optional[str] = None
    limit: int = 5

class LikeRequest(BaseModel):
    userId: str
    classId: int

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/api/classes")
async def get_classes():
    return {"status": "success", "data": SAMPLE_CLASSES}

@app.get("/api/classes/{class_id}")
async def get_class_by_id(class_id: int):
    class_item = next((c for c in SAMPLE_CLASSES if c["id"] == class_id), None)
    if not class_item:
        raise HTTPException(status_code=404, detail="Class not found")
    return {"status": "success", "data": class_item}

@app.post("/api/users")
async def create_or_update_user(request: UserProfileRequest):
    users = load_json(USERS_FILE, {})
    users[request.userId] = request.model_dump()
    save_json(USERS_FILE, users)
    return {"status": "success", "data": users[request.userId]}

@app.get("/api/users/{user_id}")
async def get_user(user_id: str):
    users = load_json(USERS_FILE, {})
    user = users.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"status": "success", "data": user}

@app.delete("/api/users/{user_id}")
async def delete_user(user_id: str):
    users = load_json(USERS_FILE, {})
    likes = load_json(LIKES_FILE, {})
    if user_id not in users:
        raise HTTPException(status_code=404, detail="User not found")
    del users[user_id]
    likes.pop(user_id, None)
    save_json(USERS_FILE, users)
    save_json(LIKES_FILE, likes)
    return {"status": "success"}

@app.post("/api/likes")
async def add_like(request: LikeRequest):
    likes = load_json(LIKES_FILE, {})
    user_likes = likes.get(request.userId, [])
    if request.classId not in user_likes:
        user_likes.append(request.classId)
    likes[request.userId] = user_likes
    save_json(LIKES_FILE, likes)
    return {"status": "success", "data": user_likes}

@app.delete("/api/likes")
async def remove_like(request: LikeRequest = Body(...)):
    likes = load_json(LIKES_FILE, {})
    user_likes = likes.get(request.userId, [])
    if request.classId in user_likes:
        user_likes.remove(request.classId)
    likes[request.userId] = user_likes
    save_json(LIKES_FILE, likes)
    return {"status": "success", "data": user_likes}

@app.get("/api/users/{user_id}/likes")
async def get_user_likes(user_id: str):
    likes = load_json(LIKES_FILE, {})
    liked_ids = likes.get(user_id, [])
    liked_classes = [c for c in SAMPLE_CLASSES if c["id"] in liked_ids]
    return {"status": "success", "data": liked_classes}

@app.post("/api/recommendations")
async def get_recommendations(request: RecommendationRequest):
    users = load_json(USERS_FILE, {})
    likes = load_json(LIKES_FILE, {})

    user_profile = users.get(request.userId, {}) if request.userId else {}
    liked_ids = likes.get(request.userId, []) if request.userId else []

    interests = set([x.lower() for x in (request.interests or user_profile.get("interests", []))])
    preferred_tags = set([x.lower() for x in (request.preferredTags or user_profile.get("preferredTags", []))])
    skill_level = (request.skillLevel or user_profile.get("skillLevel") or "").lower()

    scored = []
    for class_item in SAMPLE_CLASSES:
        score = 0
        class_tags = [t.lower() for t in class_item.get("tags", [])]
        category = class_item.get("category", "").lower()
        level = class_item.get("level", "").lower()

        for interest in interests:
            if interest in class_tags or interest in category or interest in class_item["title"].lower():
                score += 3

        for tag in preferred_tags:
            if tag in class_tags:
                score += 2

        if skill_level and level == skill_level:
            score += 2

        if class_item["id"] in liked_ids:
            score += 1

        scored.append((score, class_item))

    scored.sort(key=lambda x: x[0], reverse=True)
    results = [item for score, item in scored if score > 0][:request.limit]
    if not results:
        results = SAMPLE_CLASSES[:request.limit]

    return {"status": "success", "data": results}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5001, reload=True)