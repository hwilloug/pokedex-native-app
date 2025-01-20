import React, { useState } from "react";
import { FlatList, Pressable, Text, View, TextInput } from "react-native";
import { Link, router } from "expo-router";
import { useGetStorage } from "../server/storage/useStorage";
import { StorageKeys } from "../utils/storage-enums";
import { versions } from "../utils/versions";
import usePokedex from "../server/api/usePokedex";
import PokemonListItem from "../components/PokemonListItem";
import BaseView from "../components/BaseView";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Index() {
  const selectedVersion = useGetStorage(StorageKeys.VERSION) ?? "1";
  const version = versions.find((version) => version.id === Number(selectedVersion)) ?? versions[0];
  const [searchText, setSearchText] = useState("");

  const { data: pokedexes } = usePokedex(version.pokedex);

  const filteredPokemon = pokedexes?.pokemon_entries.filter((entry: any) => 
    entry.pokemon_species.name.toLowerCase().includes(searchText.toLowerCase())
  );
  
  return (
    <BaseView>
      <View className="flex flex-row justify-between items-center mb-4 mx-4">
        <Text className="text-primary text-2xl font-bold">Pokédex</Text>
        <Link href="/version-selection">
          <View className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center">
            <Text className="text-primary text-2xl font-bold">{version?.name}</Text>
          </View>
        </Link>
      </View>

      <View className="px-4 mb-4">
        <View className="bg-secondaryLight pl-4 py-2 rounded-lg flex flex-row items-center">
          <TextInput
            className="flex-1"
            value={searchText}
            onChangeText={setSearchText}
            spellCheck={false}
          />
          {searchText.length > 0 && (
            <Pressable onPress={() => setSearchText("")}>
              <Text className="text-primary">✕</Text>
            </Pressable>
          )}
          <Pressable className="px-4 py-2" onPress={() => router.push("/filter")}>
            <MaterialCommunityIcons name="filter-outline" size={24} color="#f28482" />
          </Pressable>
        </View>
      </View>

      <FlatList
        data={filteredPokemon}
        renderItem={({ item }) => <PokemonListItem pokemon={item} />}
        keyExtractor={(item) => item.entry_number.toString()}
      />
    </BaseView>
  );
}