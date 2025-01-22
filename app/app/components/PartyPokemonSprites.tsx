
import React from "react";
import { View } from "react-native";
import PokemonSprite from "./PokemonSprite";

export default function PartyPokemonSprites({ pokemonTeam }: { pokemonTeam: any }) {
  return <View className="flex-row">
    {pokemonTeam?.map((pokemon: any, index: number) => <PokemonSprite key={pokemon.name} pokemon={pokemon.name} className={`${index === 0 ? "-ml-6" : "-ml-20"} w-36 h-36 ${
      index === 1 ? "mt-8 z-10" :
      index === 2 ? "mt-12 z-20" :
      index === 3 ? "mt-12 z-20" :
      index === 4 ? "mt-8 z-10" : ""
    }`} />)}
  </View>
}