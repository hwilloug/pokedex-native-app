import React from "react";
import { View } from "react-native";
import PokemonSprite from "./PokemonSprite";

export default function PokemonSpriteIcon({ pokemon }: { pokemon: any }) {
    return <View className="w-16 h-16 bg-secondary rounded-full">
        <PokemonSprite pokemon={pokemon} className="w-full h-full" />
    </View>
}