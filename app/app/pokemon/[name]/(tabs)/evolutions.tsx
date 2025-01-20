import BackButton from "@/app/components/BackButton";
import BaseView from "@/app/components/BaseView";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import useEvolutions from "@/app/server/api/useEvolutions";
import { useGlobalSearchParams } from "expo-router";
import usePokemonSpecies from "@/app/server/api/usePokemonSpecies";
import { capitalize } from "@/app/utils/capitalize";

export default function Evolutions() {
    const { name } = useGlobalSearchParams();
    const { data: pokemonData } = usePokemonSpecies(name as string);

    const evolutionChainId = pokemonData?.evolution_chain.url.split('/').slice(-2)[0];
    const { data, isLoading, error } = useEvolutions(evolutionChainId);

    return <BaseView>
        <BackButton className="mx-4 mb-4" />
        <ScrollView className="px-8 mb-12 h-screen">
            <Text className="text-primary text-2xl font-bold">Evolutions</Text>
            <EvolutionChain chain={data?.chain} />
        </ScrollView>
    </BaseView>
}

const EvolutionChain = ({ chain }: { chain: any }) => {
    return <View>
        <Text className="text-primary text-xl font-bold">{capitalize(chain?.species.name || "")}</Text>
        {chain?.evolves_to.map((evolution: any) => (
            <EvolutionChain key={evolution.species.name} chain={evolution} />
        ))}
    </View>
}