import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import usePokemon from "../server/api/usePokemon";
import { router, useLocalSearchParams } from "expo-router";
import { capitalize } from "../utils/capitalize";
import useAbility from "../server/api/useAbility";
import BaseView from "../components/BaseView";
import BackButton from "../components/BackButton";


export default function PokemonNamePage() {
    const { name } = useLocalSearchParams();
    const { data } = usePokemon(name as string);

    const abilities = data?.abilities.map((ability: any) => {
        const { data: abilityData } = useAbility(ability.ability.name);
        const effect = abilityData?.effect_entries.find((effect: any) => effect.language.name === "en");
        const flavor_text = abilityData?.flavor_text_entries.find((text: any) => text.language.name === "en")
        return {
            name: ability.ability.name,
            flavor_text: flavor_text?.flavor_text,
            effect: effect?.effect,
            is_hidden: ability.is_hidden
        }
    })

    return (
        <BaseView>
            <BackButton />

            <View className="flex flex-row justify-between">
                <Image source={{ uri: data?.sprites.front_default }} className="w-48 h-48" />
                <Image source={{ uri: data?.sprites.front_shiny }} className="w-48 h-48" />
            </View>

            {/* Name */}
            <Text className="text-primary text-2xl font-bold">{capitalize(data?.name)}</Text>
            <View className="mt-4">
                {data?.types.map((type: any) => (
                    <Text className="text-black">{capitalize(type.type.name)}</Text>
                ))}
            </View>
            <Text className="text-black mt-4">#{data?.order}</Text>

            {/* Abilities */}
            <Text className="text-primary font-bold mt-8">Abilities</Text>
            <View className="mt-4">
                {abilities?.map((ability: any) => {
                    let content = null;
                    if (ability.is_hidden) {
                        content =  <View key={ability.name}>
                            <Text className="text-primary mt-4">Hidden</Text>
                            <View className="flex flex-row gap-4 items-center">
                                <Text className="text-black mt-2 font-bold">{capitalize(ability.name)}</Text>
                                <Text className="text-black mt-2 italic">{ability.flavor_text}</Text>
                            </View>
                        </View>
                    } else {
                        content = <View className="flex flex-row gap-4 items-center" key={ability.name}>
                            <Text className="text-black font-bold">{capitalize(ability.name)}</Text>
                            <Text className="text-black mt-2 italic">{ability.flavor_text}</Text>
                        </View>
                    }
                    return <Pressable onPress={() => router.push(`/abilities/${ability.name}`)}>{content}</Pressable>;
                })}
            </View>

            {/* Stats */}
            <Text className="text-primary font-bold mt-8">Base Stats</Text>
            <View className="mt-4">
                <Text className="text-black">HP: {data?.stats[0].base_stat}</Text>
                <Text className="text-black">Attack: {data?.stats[1].base_stat}</Text>
                <Text className="text-black">Defense: {data?.stats[2].base_stat}</Text>
                <Text className="text-black">Special Attack: {data?.stats[3].base_stat}</Text>
                <Text className="text-black">Special Defense: {data?.stats[4].base_stat}</Text>
                <Text className="text-black">Speed: {data?.stats[5].base_stat}</Text>
            </View>
        </BaseView>
    )
}