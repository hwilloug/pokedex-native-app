import React from "react";
import { Pressable, Text, Image, View } from "react-native"
import { capitalize } from "../utils/capitalize";
import usePokemon from "../server/api/usePokemon";
import { router } from "expo-router";
import TypePill from "./TypePill";


const PokemonListItem = ({ pokemon, onPress }: { pokemon: any, onPress: () => void }) => {
    const pokemonName: string = pokemon?.pokemon_species?.name || pokemon;
    const { data } = usePokemon(pokemonName);

    return (
        <Pressable className="bg-secondaryLight flex flex-row items-center gap-4 px-4 border-b-2 border-primaryLight" onPress={onPress}>
          <Image source={{ uri: data?.sprites.front_default }} className="w-16 h-16" />
          <Text className="text-lg">{capitalize(pokemonName)}</Text>  
          <View className="grow flex flex-row justify-end gap-2">
            {data?.types.map((type: any) => (
              <TypePill key={type.type.name} type={type.type.name} />
            ))}
          </View>
        </Pressable>
    )
}

export default PokemonListItem;