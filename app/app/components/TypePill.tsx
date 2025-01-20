import React from "react";
import { Text } from "react-native";
import { capitalize } from "../utils/capitalize";

const typeColors = {
    normal: { bg: "#A8A77A", text: "#FFFFFF" },
    fire: { bg: "#FF9D55", text: "#000000" },
    water: { bg: "#6390F0", text: "#FFFFFF" },
    electric: { bg: "#F7D02C", text: "#000000" },
    grass: { bg: "#7AC74C", text: "#000000" },
    ice: { bg: "#96D9D6", text: "#000000" },
    fighting: { bg: "#C22E28", text: "#FFFFFF" },
    poison: { bg: "#A33EA1", text: "#FFFFFF" },
    ground: { bg: "#E2BF65", text: "#000000" },
    flying: { bg: "#A98FF3", text: "#000000" },
    psychic: { bg: "#F95587", text: "#FFFFFF" },
    bug: { bg: "#A6B91A", text: "#000000" },
    rock: { bg: "#B6A136", text: "#FFFFFF" },
    ghost: { bg: "#735797", text: "#FFFFFF" },
    dragon: { bg: "#6F35FC", text: "#FFFFFF" },
    dark: { bg: "#705746", text: "#FFFFFF" },
    steel: { bg: "#B7B7CE", text: "#000000" },
    fairy: { bg: "#D685AD", text: "#000000" },
}

export default function TypePill({ type }: { type: string }) {
    return <Text className="px-2 py-1 rounded-lg" key={type} style={{ backgroundColor: typeColors[type as keyof typeof typeColors].bg, color: typeColors[type as keyof typeof typeColors].text }}>{capitalize(type)}</Text>
}
