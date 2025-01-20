import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import BaseView from "../components/BaseView";
import { router, useLocalSearchParams } from "expo-router";
import { capitalize } from "../utils/capitalize";
import useAbility from "../server/api/useAbility";
import PokemonListItem from "../components/PokemonListItem";
import BackButton from "../components/BackButton";

export default function Ability() {
  const { ability } = useLocalSearchParams();

  const abilityValue = ability as string;

  const { data: abilityData } = useAbility(abilityValue);

  const effect = abilityData?.effect_entries.find((effect: any) => effect.language.name === "en");
  const flavor_text = abilityData?.flavor_text_entries.find((text: any) => text.language.name === "en")

  const pokemon = abilityData?.pokemon.map((pokemon: any) => {
    return {
      name: pokemon.pokemon.name
    }
  })

  return <BaseView>
    <BackButton />
    
    <Text className="text-primary text-2xl font-bold">Ability</Text>
    <Text className="mt-4 text-2xl">{capitalize(abilityValue)}</Text>

    <Text className="text-primary font-bold mt-8">Flavor Text</Text>
    <Text className="mt-2">{flavor_text?.flavor_text}</Text>

    <Text className="text-primary font-bold mt-8">Effect</Text>
    <Text className="mt-2">{effect?.effect}</Text>

    <Text className="text-primary font-bold mt-8 mb-2">Pokémon</Text>
    <FlatList
      data={pokemon}
      renderItem={({ item }) => <Pressable onPress={() => router.push(`/pokemon/${item.name}`)}><PokemonListItem pokemon={item.name} /></Pressable>}
      keyExtractor={(item) => item.name}
    />
  </BaseView>
}