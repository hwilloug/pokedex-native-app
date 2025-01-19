import { Stack } from "expo-router";
import React from "react";
import { Link } from "expo-router";
import { View, Text } from "react-native";


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View>
        <Link href="/">
          <Text>Go to home</Text>
        </Link>
      </View>
    </>
  )
}