import React, { useEffect, useMemo } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import BaseView from "./components/BaseView";
import useTypes from "./server/hooks/useTypes";
import TypePill from "./components/TypePill";
import useGenerations from "./server/hooks/useGenerations";
import { capitalize } from "./utils/capitalize";
import useEggGroups from "./server/hooks/useEggGroups";
import BackButton from "./components/BackButton";
import { deleteData, storeData, useGetStorage } from "./server/storage-hooks/useStorage";
import { StorageKeys } from "./utils/storage-enums";
import { useQueryClient } from "@tanstack/react-query";

const eggGroupColors = {
    "monster": "bg-red-500",
    "water1": "bg-blue-500", 
    "bug": "bg-emerald-500",
    "flying": "bg-purple-500",
    "ground": "bg-yellow-500",
    "fairy": "bg-pink-500",
    "field": "bg-lime-500",
    "humanshape": "bg-indigo-500",
    "water3": "bg-cyan-500",
    "mineral": "bg-stone-500",
    "amorphous": "bg-zinc-500",
    "water2": "bg-sky-500",
    "ditto": "bg-fuchsia-500",
    "dragon": "bg-violet-500",
    "plant": "bg-green-500",
    "no-eggs": "bg-gray-500",
}

const generationColors = {
    "generation-i": "bg-red-500",
    "generation-ii": "bg-blue-500",
    "generation-iii": "bg-green-500",
    "generation-iv": "bg-yellow-500",
    "generation-v": "bg-purple-500",
    "generation-vi": "bg-pink-500",
    "generation-vii": "bg-orange-500",
    "generation-viii": "bg-gray-500",
}


export default function Filter() {
    const queryClient = useQueryClient();
    
    const { data, isLoading, error } = useTypes();
    const { data: generationsData, isLoading: generationsLoading, error: generationsError } = useGenerations();
    const { data: eggGroupsData, isLoading: eggGroupsLoading, error: eggGroupsError } = useEggGroups();
    const filters = JSON.parse(useGetStorage(StorageKeys.FILTERS) ?? "{}");

    useEffect(() => {
        if (filters.type1 === 'undefined' && filters.type2 === 'undefined' && filters.generation === 'undefined' && filters.eggGroup === 'undefined') {
            deleteData(StorageKeys.FILTERS);
        }
    }, [filters])

    const { type1, type2, generation, eggGroup } = filters;
    
    const types = useMemo(() => data?.results.filter((type: any) => type.name !== "unknown" && type.name !== "stellar"), [data]);
    const generations = useMemo(() => generationsData?.results.map((generation: any) => generation.name), [generationsData]);
    const eggGroups = useMemo(() => eggGroupsData?.results.map((eggGroup: any) => eggGroup.name), [eggGroupsData]);

    const handleSetFilter = (key: string, value: string) => {
        filters[key] = value;
        storeData(StorageKeys.FILTERS, JSON.stringify(filters));
        queryClient.invalidateQueries({ queryKey: ["storage", StorageKeys.FILTERS] });
    }

    return (
        <BaseView>
            <BackButton className="mx-4 mb-4" />
        
            <View className="px-8">
                <Text className="text-2xl font-bold text-primary">Filters</Text>
            </View>
            <ScrollView className="px-8 mt-4">
                <View className="bg-secondaryLight p-4 rounded-md">
                    <Text className="text-lg font-bold text-primary mb-2">Type 1</Text>
                    <View className="flex-row items-center justify-between">
                        {type1 && type1 !== 'undefined' && (
                            <Pressable onPress={() => handleSetFilter("type1", 'undefined')} className="flex-row items-center bg-secondary rounded-full px-3 py-1 mb-2">
                                <Text className="text-white mr-2">{capitalize(type1 as string)}</Text>
                                <Text className="text-white font-bold">×</Text>
                            </Pressable>
                        )}
                    </View>
                    <View className="h-px bg-primary w-full mt-2 mb-4" />
                    <View className="flex-row flex-wrap gap-2">
                        {types?.map((type: any) => (
                            <Pressable key={type.name} onPress={() => {
                                handleSetFilter("type1", type.name);
                            }}>
                                <TypePill key={type.name} type={type.name} />
                            </Pressable>
                        ))}
                    </View>
                </View>
                <View className="mt-4 bg-secondaryLight p-4 rounded-md">
                    <Text className="text-lg font-bold text-primary mb-2">Type 2</Text>
                    <View className="flex-row items-center justify-between">
                        {type2 && type2 !== 'undefined' && (
                            <View className="flex-row items-center bg-secondary rounded-full px-3 py-1 mb-2">
                                <Text className="text-white mr-2">{capitalize(type2 as string)}</Text>
                                <Pressable onPress={() => handleSetFilter("type2", 'undefined')}>
                                    <Text className="text-white font-bold">×</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                    <View className="h-px bg-primary w-full mt-2 mb-4" />
                    <View className="flex-row flex-wrap gap-2">
                        {types?.map((type: any) => (
                            <Pressable key={type.name} onPress={() => {
                                handleSetFilter("type2", type.name);
                            }}>
                                <TypePill key={type.name} type={type.name} />
                            </Pressable>
                        ))}
                    </View>
                </View>
                <View className="mt-4 bg-secondaryLight p-4 rounded-md">
                    <Text className="text-lg font-bold text-primary mb-2">Generation of Appearance</Text>
                    <View className="flex-row items-center justify-between">
                        {generation && generation !== 'undefined' && (
                            <View className="flex-row items-center bg-secondary rounded-full px-3 py-1 mb-2">
                                <Text className="text-white mr-2">{capitalize(generation as string)}</Text>
                                <Pressable onPress={() => handleSetFilter("generation", 'undefined')}>
                                    <Text className="text-white font-bold">×</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                    <View className="h-px bg-primary w-full mt-2 mb-4" />
                    <View className="flex-row flex-wrap gap-2">
                        {generations?.map((generation: any) => (
                            <Pressable key={generation} onPress={() => {
                                handleSetFilter("generation", generation);
                            }}>
                                <Text className={`bg-primary text-white px-2 py-1 rounded-md ${generationColors[generation as keyof typeof generationColors]}`}>{capitalize(generation.split("-")[0])} {`${generation.split("-")[1].toUpperCase()}`}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
                <View className="mt-4 bg-secondaryLight p-4 rounded-md">
                    <Text className="text-lg font-bold text-primary mb-2">Egg Group</Text>
                    <View className="flex-row items-center justify-between">
                        {eggGroup && eggGroup !== 'undefined' && (
                            <View className="flex-row items-center bg-secondary rounded-full px-3 py-1 mb-2">
                                <Text className="text-white mr-2">{capitalize(eggGroup as string)}</Text>
                                <Pressable onPress={() => handleSetFilter("eggGroup", 'undefined')}>
                                    <Text className="text-white font-bold">×</Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                    <View className="h-px bg-primary w-full mt-2 mb-4" />
                    <View className="flex-row flex-wrap gap-2">
                        {eggGroups?.map((eggGroup: any) => (
                            <Pressable key={eggGroup} onPress={() => {
                                handleSetFilter("eggGroup", eggGroup);
                            }}>
                                <Text className={`bg-primary text-white px-2 py-1 rounded-md ${eggGroupColors[eggGroup as keyof typeof eggGroupColors]}`}>{capitalize(eggGroup)}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </BaseView>
    )
}