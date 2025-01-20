import React from "react";
import { Pressable, Text, Image } from "react-native"
import { capitalize } from "../utils/capitalize";
import usePokemon from "../server/api/usePokemon";
import { router } from "expo-router";


const PokemonListItem = ({ pokemon }: { pokemon: any }) => {
    const pokemonName: string = pokemon?.pokemon_species?.name || pokemon;
    const { data } = usePokemon(pokemonName);

    return (
        <Pressable className="bg-secondaryLight flex flex-row items-center gap-4 pl-4 border-b-2 border-primaryLight" onPress={() => router.push(`/pokemon/${pokemon.pokemon_species.name}`)}>
          <Image source={{ uri: data?.sprites.front_default }} className="w-16 h-16" />
          <Text className="text-lg">{capitalize(pokemonName)}</Text>  
        </Pressable>
    )
}

export default PokemonListItem;