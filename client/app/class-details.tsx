import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getClassById, likeClass } from "../services/api";

export default function ClassDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [classItem, setClassItem] = useState<any>(null);

  useEffect(() => {
    const loadClass = async () => {
      const result = await getClassById(Number(id));
      setClassItem(result.data);
    };
    if (id) loadClass();
  }, [id]);

  const handleLike = async () => {
    await likeClass({ userId: "user_1", classId: Number(id) });
    Alert.alert("Success", "Class liked");
  };

  if (!classItem) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{classItem.title}</Text>
      <Text>{classItem.description}</Text>
      <Text>{classItem.category}</Text>
      <Text>{classItem.instructor}</Text>
      <Button title="Like Class" onPress={handleLike} />
    </View>
  );
}