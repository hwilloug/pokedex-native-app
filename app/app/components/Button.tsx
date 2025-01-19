import React from "react";
import { Pressable, Text } from "react-native";

export default function Button({ title, onPress }: { title: string, onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="bg-primary py-4 px-8 rounded-md mt-2">
      <Text className="text-white text-center">{title}</Text>
    </Pressable>
  )
}