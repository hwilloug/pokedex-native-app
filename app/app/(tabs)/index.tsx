import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { useGetStorage } from "../server/storage/useStorage";
import { StorageKeys } from "../utils/storage-enums";
import { versions } from "../utils/versions";
import usePokedex from "../server/api/usePokedex";
import { capitalize } from "../utils/capitalize";
import PokemonListItem from "../components/PokemonListItem";
import BaseView from "../components/BaseView";

export default function Index() {
  const selectedVersion = useGetStorage(StorageKeys.VERSION) ?? "1";
  const version = versions.find((version) => version.id === Number(selectedVersion)) ?? versions[0];

  const { data: pokedexes } = usePokedex(version.pokedex);
  
  return (
    <BaseView>
      <View className="flex flex-row justify-between items-center mb-4">
        <Text className="text-primary text-2xl font-bold">Pokédex</Text>
        <Link href="/version-selection">
          <View className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center">
            <Text className="text-primary text-2xl font-bold">{version?.name}</Text>
          </View>
        </Link>
      </View>
      <FlatList
        data={pokedexes?.pokemon_entries}
        renderItem={({ item }) => <PokemonListItem pokemon={item} />}
        keyExtractor={(item) => item.entry_number.toString()}
      />
    </BaseView>
  );
}