import React from "react";
import { FlatList, Text, View } from "react-native";
import usePokedex from "../server/hooks/usePokedex";
import useVersions from "../server/hooks/useVersions";

export default function Index() {
  const { data: pokedexData, isLoading: pokedexLoading, error: pokedexError } = usePokedex();
  const { data: versionsData, isLoading: versionsLoading, error: versionsError } = useVersions();

  return (
    <View className="bg-primaryLight h-screen pt-24 px-8">
        <Text className="text-primary text-2xl font-bold">Pokédex</Text>
        <FlatList
            data={versionsData?.results}
            renderItem={({ item }) => <Text>{item.name}</Text>}
        />
    </View>
  );
}