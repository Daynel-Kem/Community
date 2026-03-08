import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { saveUserProfile, getUserProfile, deleteUser, getRecommendations } from "../services/api";

export default function AccountScreen() {
  const userId = "user_1";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState("");
  const [recs, setRecs] = useState<any[]>([]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await getUserProfile(userId);
        const user = result.data;
        setName(user?.name || "");
        setEmail(user?.email || "");
        setInterests((user?.interests || []).join(", "));
      } catch {}
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    await saveUserProfile({
      userId,
      name,
      email,
      interests: interests.split(",").map((x) => x.trim()).filter(Boolean),
      preferredTags: [],
      skillLevel: "beginner",
    });
    Alert.alert("Saved", "Profile saved");
  };

  const handleDelete = async () => {
    await deleteUser(userId);
    Alert.alert("Deleted", "User deleted");
  };

  const handleRecommendations = async () => {
    const result = await getRecommendations({
      userId,
      interests: interests.split(",").map((x) => x.trim()).filter(Boolean),
      preferredTags: [],
      skillLevel: "beginner",
      limit: 3,
    });
    setRecs(result.data || []);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />
      <Text>Interests</Text>
      <TextInput value={interests} onChangeText={setInterests} style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} />

      <Button title="Save Profile" onPress={handleSave} />
      <View style={{ height: 10 }} />
      <Button title="Get Recommendations" onPress={handleRecommendations} />
      <View style={{ height: 10 }} />
      <Button title="Delete User" onPress={handleDelete} />

      <View style={{ marginTop: 20 }}>
        {recs.map((item) => (
          <View key={item.id} style={{ marginBottom: 10 }}>
            <Text>{item.title}</Text>
            <Text>{item.category}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}