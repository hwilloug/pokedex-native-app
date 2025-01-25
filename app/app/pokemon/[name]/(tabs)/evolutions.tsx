import BackButton from "@/app/components/BackButton";
import BaseView from "@/app/components/BaseView";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import useEvolutions, { useGetEvolutionDetail } from "@/app/server/hooks/useEvolutions";
import { useGlobalSearchParams } from "expo-router";
import usePokemonSpecies from "@/app/server/hooks/usePokemonSpecies";
import { capitalize } from "@/app/utils/capitalize";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Evolutions() {
    const { name } = useGlobalSearchParams();
    const { data: pokemonData } = usePokemonSpecies(name as string);

    const evolutionChainId = pokemonData?.evolution_chain.url.split('/').slice(-2)[0];
    const { data } = useEvolutions(evolutionChainId);

    return <BaseView>
        <BackButton className="mx-4 mb-4" />
        <ScrollView className="px-8 mb-12 h-screen">
            <Text className="text-primary text-2xl font-bold">Evolutions</Text>
            <EvolutionChain chain={data?.chain} />
        </ScrollView>
    </BaseView>
}

const EvolutionChain = ({ chain }: { chain: any }) => {
    const evolutionDetail = useGetEvolutionDetail(chain?.evolves_to[0]);
    return <View className="flex-row items-center gap-2 flex-wrap">
        <Text className="text-primary text-xl font-bold">{capitalize(chain?.species.name || "")}</Text>
        {chain?.evolves_to.length > 0 && (
            <View className="flex-col items-center">
                <FontAwesome name="long-arrow-right" size={24} color={"#84A59D"} />
                <EvolutionDetail detail={evolutionDetail} />
            </View>
        )}
        {chain?.evolves_to.map((evolution: any) => (
            <EvolutionChain key={evolution.species.name} chain={evolution} />
        ))}
    </View>
}

const EvolutionDetail = ({ detail }: { detail: any }) => {
    return <View>
        <Text>{detail}</Text>
    </View>
}