import React, { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View, TextInput } from "react-native";
import { Link, router } from "expo-router";
import { storeData, useGetStorage } from "../server/storage/useStorage";
import { StorageKeys } from "../utils/storage-enums";
import { versions } from "../utils/versions";
import usePokedex from "../server/api/usePokedex";
import PokemonListItem from "../components/PokemonListItem";
import BaseView from "../components/BaseView";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { capitalize } from "../utils/capitalize";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import VersionSelection from "../components/VersionSelection";

export default function Index() {
  const queryClient = useQueryClient();

  const selectedVersion = useGetStorage(StorageKeys.VERSION) ?? "1";
  const filters = JSON.parse(useGetStorage(StorageKeys.FILTERS) ?? "{}");

  const version = versions.find((version) => version.id === Number(selectedVersion)) ?? versions[0];
  
  const [searchText, setSearchText] = useState("");
  const [isVersionSelectionOpen, setIsVersionSelectionOpen] = useState(false);

  const { data: pokedexes } = usePokedex(version.pokedex);

  const hasFilter = useMemo(() => {
    return Object.keys(filters).length > 0 && filters.type1 !== 'undefined' && filters.type2 !== 'undefined' && filters.generation !== 'undefined' && filters.eggGroup !== 'undefined';
  }, [filters]);

  const filteredPokemon = useMemo(() => {
    return pokedexes?.pokemon_entries.filter((entry: any) => {
      const matchesSearch = entry.pokemon_species.name.toLowerCase().includes(searchText.toLowerCase());
      return matchesSearch;
    });
  }, [pokedexes, searchText]);

  const handleVersionPress = async (id: number) => {
    await storeData(StorageKeys.VERSION, id.toString());
    queryClient.invalidateQueries({ queryKey: ["storage", StorageKeys.VERSION] });
    setIsVersionSelectionOpen(false);
  }
  
  return (
    <BaseView>
      <View className="flex flex-row justify-between items-center mb-4 mx-4">
        <Text className="text-primary text-2xl font-bold">Pokédex</Text>
        <Pressable onPress={() => setIsVersionSelectionOpen(true)}>
          <View className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center">
            <Text className="text-primary text-2xl font-bold">{version?.name}</Text>
          </View>
        </Pressable>
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
            <MaterialCommunityIcons name={hasFilter ? "filter" : "filter-outline"} size={24} color="#f28482" />
          </Pressable>
        </View>
        {hasFilter && <View className="flex flex-row items-center gap-2 mt-4">
          <Text className="text-primary">Filters:</Text>
          <View className="flex-row flex-wrap gap-2">
            {filters.type1 && filters.type1 !== 'undefined' && (
              <View className="flex-row items-center bg-secondary rounded-full px-3 py-1">
                <Text className="text-white mr-2">{capitalize(filters.type1)}</Text>
                <Pressable onPress={() => {
                  filters.type1 = 'undefined';
                  storeData(StorageKeys.FILTERS, JSON.stringify(filters));
                  queryClient.invalidateQueries({ queryKey: ["storage", StorageKeys.FILTERS] });
                }}>
                  <Text className="text-white font-bold">×</Text>
                </Pressable>
              </View>
            )}
            {filters.type2 && filters.type2 !== 'undefined' && (
              <View className="flex-row items-center bg-secondary rounded-full px-3 py-1">
                <Text className="text-white mr-2">{capitalize(filters.type2)}</Text>
                <Pressable onPress={() => {
                  filters.type2 = 'undefined';
                  storeData(StorageKeys.FILTERS, JSON.stringify(filters));
                  queryClient.invalidateQueries({ queryKey: ["storage", StorageKeys.FILTERS] });
                }}>
                  <Text className="text-white font-bold">×</Text>
                </Pressable>
              </View>
            )}
            {filters.generation && filters.generation !== 'undefined' && (
              <View className="flex-row items-center bg-secondary rounded-full px-3 py-1">
                <Text className="text-white mr-2">{capitalize(filters.generation)}</Text>
                <Pressable onPress={() => {
                  filters.generation = 'undefined';
                  storeData(StorageKeys.FILTERS, JSON.stringify(filters));
                  queryClient.invalidateQueries({ queryKey: ["storage", StorageKeys.FILTERS] });
                }}>
                  <Text className="text-white font-bold">×</Text>
                </Pressable>
              </View>
            )}
            {filters.eggGroup && filters.eggGroup !== 'undefined' && (
              <View className="flex-row items-center bg-secondary rounded-full px-3 py-1">
                <Text className="text-white mr-2">{capitalize(filters.eggGroup)}</Text>
                <Pressable onPress={() => {
                  filters.eggGroup = 'undefined';
                  storeData(StorageKeys.FILTERS, JSON.stringify(filters));
                  queryClient.invalidateQueries({ queryKey: ["storage", StorageKeys.FILTERS] });
                }}>
                  <Text className="text-white font-bold">×</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>}
      </View>

      <FlatList
        data={filteredPokemon}
        renderItem={({ item }) => <PokemonListItem pokemon={item} />}
        keyExtractor={(item) => item.entry_number.toString()}
      />

      <VersionSelection isVisible={isVersionSelectionOpen} handleVersionPress={handleVersionPress} onClose={() => setIsVersionSelectionOpen(false)} />
    </BaseView>
  );
}