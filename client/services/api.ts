const API_BASE_URL = "http://localhost:5001";

export async function getClasses() {
  const response = await fetch(`${API_BASE_URL}/api/classes`);
  return response.json();
}

export async function getClassById(classId: number) {
  const response = await fetch(`${API_BASE_URL}/api/classes/${classId}`);
  return response.json();
}

export async function saveUserProfile(payload: any) {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function getUserProfile(userId: string) {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
  return response.json();
}

export async function deleteUser(userId: string) {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function likeClass(payload: { userId: string; classId: number }) {
  const response = await fetch(`${API_BASE_URL}/api/likes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}

export async function getUserLikes(userId: string) {
  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/likes`);
  return response.json();
}

export async function getRecommendations(payload: any) {
  const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}