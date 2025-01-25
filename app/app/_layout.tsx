import React from "react";
import { Stack } from "expo-router";
import "../global.css";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDatabase } from "./migrations";


export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SQLiteProvider databaseName="pokemon.db" onInit={migrateDatabase}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="pokemon/[name]/(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="abilities/[ability]" options={{ headerShown: false }} />
          <Stack.Screen name="filter" options={{ headerShown: false }} />
          <Stack.Screen name="create-edit-party/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SQLiteProvider>
    </QueryClientProvider>
  )
}
