

import React from "react";
import { Image } from "react-native";
import usePokemon from "../server/hooks/usePokemon";

export default function PokemonSprite({ pokemon, className }: { pokemon: any, className?: string }) {
    const { data } = usePokemon(pokemon);
    return <Image source={{ uri: data?.sprites.front_default }} className={className} />
}