import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { getUserLikes } from "../services/api";

export default function UpcomingClassesScreen() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const loadLiked = async () => {
      const result = await getUserLikes("user_1");
      setItems(result.data || []);
    };
    loadLiked();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Liked Classes</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <Text>{item.title}</Text>
            <Text>{item.category}</Text>
          </View>
        )}
      />
    </View>
  );
}