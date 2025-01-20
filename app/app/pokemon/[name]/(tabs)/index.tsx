import React, { useMemo, useState } from "react";
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import usePokemon from "../../../server/api/usePokemon";
import { router, useLocalSearchParams } from "expo-router";
import { capitalize } from "../../../utils/capitalize";
import useAbility from "../../../server/api/useAbility";
import BaseView from "../../../components/BaseView";
import BackButton from "../../../components/BackButton";
import TypePill from "../../../components/TypePill";
import StatBar from "../../../components/StatBar";
import usePokemonSpecies from "../../../server/api/usePokemonSpecies";


export default function PokemonNamePage() {
    const { name } = useLocalSearchParams();
    const { data } = usePokemon(name as string);
    const { data: speciesData } = usePokemonSpecies(name as string);

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

    const information = useMemo(() => {
        return {
            height: data?.height,
            weight: data?.weight,
            "capture-rate": speciesData?.capture_rate,
            "base-happiness": speciesData?.base_happiness,
            "gender-rate": speciesData?.gender_rate,
            "hatch-counter": speciesData?.hatch_counter,
            "growth-rate": speciesData?.growth_rate.name,
            "egg-groups": (speciesData?.egg_groups.map((group: any) => capitalize(group.name)))?.join(", "),
        }
    }, [speciesData])

    return (
        <BaseView>
            <BackButton className="mx-4" />

            <ScrollView className="px-8 mb-12">

                <View className="flex flex-row justify-between">
                    <Image source={{ uri: data?.sprites.front_default }} className="w-48 h-48" />
                <Image source={{ uri: data?.sprites.front_shiny }} className="w-48 h-48" />
            </View>

            {/* Name */}
            <Text className="text-primary text-2xl font-bold">{capitalize(data?.name)}</Text>
            <Text className="text-black mt-4">#{data?.order}</Text>
            <View className="mt-4 flex flex-row gap-2">
                {data?.types.map((type: any) => (
                    <TypePill key={type.type.name} type={type.type.name} />
                ))}
            </View>
            <Text className="text-black mt-4">The {speciesData?.genera.find((gen: any) => gen.language.name === "en")?.genus}</Text>
            <Text className="text-black mt-4">{speciesData?.flavor_text_entries.find((text: any) => text.language.name === "en")?.flavor_text}</Text>

            {/* Pokemon Information */}
            <View className="mt-8 bg-secondaryLight rounded-lg p-4">
                <Text className="text-primary font-bold">Information</Text>
                {Object.entries(information).map(([key, value]) => (
                    <View key={key} className="flex flex-row justify-between mt-2">
                        <Text className="text-black font-bold">{capitalize(key)}</Text>
                        <Text className="text-black mt-1">{value}</Text>
                    </View>
                ))}
            </View>


            {/* Abilities */}
            <View className="mt-8 bg-secondaryLight rounded-lg p-4">
                <Text className="text-primary font-bold">Abilities</Text>
                <View className="mt-4">
                    {abilities?.map((ability: any) => {
                        let content = null;
                        if (ability.is_hidden) {
                            content =  <View>
                                <Text className="text-primary mt-4">Hidden Ability</Text>
                                <View>
                                    <Text className="text-black mt-2 font-bold">{capitalize(ability.name)}</Text>
                                    <Text className="text-black mt-1">{ability.flavor_text}</Text>
                                </View>
                            </View>
                        } else {
                            content = <View>
                                <Text className="text-black font-bold">{capitalize(ability.name)}</Text>
                                <Text className="text-black mt-1">{ability.flavor_text}</Text>
                            </View>
                        }
                        return <Pressable key={ability.name} onPress={() => router.push(`/abilities/${ability.name}`)}>{content}</Pressable>;
                    })}
                </View>
            </View>

            {/* Stats */}
            <View className="mt-8 bg-secondaryLight rounded-lg p-4">
                <Text className="text-primary font-bold">Base Stats</Text>
                <View className="mt-4">
                    <StatBar name="HP" value={data?.stats[0].base_stat} max={255} />
                    <StatBar name="Atk" value={data?.stats[1].base_stat} max={255} />
                    <StatBar name="Def" value={data?.stats[2].base_stat} max={255} />
                    <StatBar name="SpA" value={data?.stats[3].base_stat} max={255} />
                    <StatBar name="SpD" value={data?.stats[4].base_stat} max={255} />
                    <StatBar name="Spe" value={data?.stats[5].base_stat} max={255} />
                    <StatBar name="Total" value={data?.stats.reduce((acc: number, stat: any) => acc + stat.base_stat, 0)} max={780} />
                </View>
            </View>
            </ScrollView>
        </BaseView>
    )
}