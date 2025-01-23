import React from "react";
import { View, Text } from "react-native";
import PokemonSprite from "./PokemonSprite";
import { PartyPokemon, Stats } from "../utils/storage-enums";
import { capitalize } from "../utils/capitalize";

export default function PartyPokemonView({ pokemon }: { pokemon: PartyPokemon }) {
  return <View className="bg-secondaryLight rounded-lg p-4 mb-4">
      <View className="flex-row items-center gap-4">
        <PokemonSprite pokemon={pokemon.name} className="w-16 h-16" />
        <Text className="text-2xl font-bold text-accent">{pokemon.nickname || capitalize(pokemon.name)}</Text>
        <Text className="flex-1 text-right text-primary">{pokemon.gender || "Select Gender"}</Text>
      </View>
      <View className="flex-row items-center justify-between gap-2 my-4">
        <Text className="text-md text-primary">{pokemon.item || "Select Item"}</Text>
        <Text className="text-md text-primary">{pokemon.ability || "Select Ability"}</Text>
      </View>
      <View className="mt-2">
        <Text className="text-sm text-primary font-bold">Moves</Text>
        {pokemon.moves?.map((move) => <Move move={move} />)}
      </View>
      <View className="bg-primaryLight rounded-lg p-2 mt-2">
        <Text className="text-md font-bold text-primary bg-secondary rounded-lg p-2 text-center">{pokemon.nature || "Select Nature"}</Text>
        <View className="mt-2">
          <Text className="text-sm text-center text-primary font-bold">IVs</Text>
          <View className="flex-row items-center justify-between gap-2">
            <Stat stat="HP" value={pokemon.ivs?.hp || 0} />
            <Stat stat="Atk" value={pokemon.ivs?.atk || 0} />
            <Stat stat="Def" value={pokemon.ivs?.def || 0} />
            <Stat stat="SpA" value={pokemon.ivs?.spa || 0} />
            <Stat stat="SpD" value={pokemon.ivs?.spd || 0} />
            <Stat stat="Spe" value={pokemon.ivs?.spe || 0} />
          </View>
        </View>
        <View className="mt-2">
          <Text className="text-sm text-center text-primary font-bold">EVs</Text>
          <View className="flex-row items-center justify-between gap-2">
            <Stat stat="HP" value={pokemon.evs?.hp || 0} />
            <Stat stat="Atk" value={pokemon.evs?.atk || 0} />
            <Stat stat="Def" value={pokemon.evs?.def || 0} />
            <Stat stat="SpA" value={pokemon.evs?.spa || 0} />
            <Stat stat="SpD" value={pokemon.evs?.spd || 0} />
            <Stat stat="Spe" value={pokemon.evs?.spe || 0} />
          </View>
        </View>
        <View className="mt-2">
          <Text className="text-sm text-center text-primary font-bold">Stats at level 100</Text>
          <View className="flex-row items-center justify-between gap-2">
            <Stat stat="HP" value={calculateStat(pokemon.name, "hp", pokemon.ivs, pokemon.evs, 100)} />
            <Stat stat="Atk" value={calculateStat(pokemon.name, "atk", pokemon.ivs, pokemon.evs, 100)} />
            <Stat stat="Def" value={calculateStat(pokemon.name, "def", pokemon.ivs, pokemon.evs, 100)} />
            <Stat stat="SpA" value={calculateStat(pokemon.name, "spa", pokemon.ivs, pokemon.evs, 100)} />
            <Stat stat="SpD" value={calculateStat(pokemon.name, "spd", pokemon.ivs, pokemon.evs, 100)} />
            <Stat stat="Spe" value={calculateStat(pokemon.name, "spe", pokemon.ivs, pokemon.evs, 100)} />
          </View>
        </View>
      </View>
    </View>
}

const Stat = ({ stat, value }: { stat: string, value: number }) => {
  return <View>
    <Text className="text-sm text-primary text-center font-bold">{stat}</Text>
    <Text className="text-sm text-primary text-center">{value}</Text>
  </View>
}

const Move = ({ move }: { move: string }) => {
  return <Text className="text-sm text-primary">{move}</Text>
}

const calculateStat = (pokemon: string, stat: string, ivs?: Stats, evs?: Stats, level?: number) => {
  if (!pokemon || !level) {
    return 0;
  }


  const baseStat = getBaseStat(pokemon, stat);

  if (!ivs && !evs) {
    return baseStat;
  }

  if (!ivs) {
    ivs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
  }

  if (!evs) {
    evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
  }

  const iv = ivs[stat as keyof Stats];
  const ev = evs[stat as keyof Stats];
  return Math.floor((((2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100) + 5);
}

const getBaseStat = (pokemon: string, stat: string) => {
  return 0;
}