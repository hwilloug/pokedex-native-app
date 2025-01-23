import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Modal, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import BaseView from "../components/BaseView";
import { useCreateParties, useGetParty, useUpdateParties } from "../server/storage-hooks/useParties";
import { router, useLocalSearchParams } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import BackButton from "../components/BackButton";
import { StorageKeys } from "../utils/storage-enums";
import { useGetStorage } from "../server/storage-hooks/useStorage";
import VersionSelection from "../components/VersionSelection";
import usePokedex from "../server/hooks/usePokedex";
import { versions } from "../utils/versions";
import PokemonListItem from "../components/PokemonListItem";
import PokemonSpriteIcon from "../components/PokemonSpriteIcon";
import PartyPokemonSprites from "../components/PartyPokemonSprites";
import PartyPokemonView from "../components/PartyPokemonView";


export default function CreateEditParty() {
  const { id } = useLocalSearchParams();
  const { party } = useGetParty(id as string);
  const { mutate: updateParty } = useUpdateParties(id as string);
  const savedVersion = useGetStorage(StorageKeys.VERSION);

  const [selectedVersion, setSelectedVersion] = useState<string | null>(party?.version || savedVersion);
  const [isVersionSelectionOpen, setIsVersionSelectionOpen] = useState(false);

  useEffect(() => {
    setSelectedVersion(party?.version || savedVersion);
  }, [savedVersion, party?.version]);

  const selectedVersionName = useMemo(() => {
    return versions.find((version) => version.id === parseInt(selectedVersion ?? ""))?.pokedex;
  }, [selectedVersion]);

  const handleVersionPress = async (id: number) => {
    updateParty({ version: id.toString() });
    setSelectedVersion(id.toString());
    setIsVersionSelectionOpen(false);
  }

  return (
    <BaseView>
      <ScrollView>
        <View className="mt-8 ml-8 flex-row items-center gap-4">
          <BackButton />
          <Text className="text-2xl font-bold text-primary">{id === "new" ? "Create Party" : ""}</Text>
          <View className="flex-1 flex-row justify-end mr-8">
            <Pressable onPress={() => setIsVersionSelectionOpen(true)}>
              <View className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center">
                <Text className="text-primary text-2xl font-bold">{selectedVersion}</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View className="m-8">
          <PartyForm party={party} version={selectedVersionName ?? "national"} />
        </View>
      </ScrollView>
      <VersionSelection isVisible={isVersionSelectionOpen} handleVersionPress={handleVersionPress} onClose={() => setIsVersionSelectionOpen(false)} />
    </BaseView>
  )
}

const PartyForm = ({ party, version }: { party: any, version: string }) => {
  const { mutate: createParty } = useCreateParties();
  const { mutate: updateParty } = useUpdateParties(party?.id);
  const [isNewPokemonFormOpen, setIsNewPokemonFormOpen] = useState(false);
  
  const versionId = useMemo(() => {
    return versions.find((v) => v.pokedex === version)?.id;
  }, [version]);

  const handleNewPokemon = (pokemon: any) => {
    setIsNewPokemonFormOpen(false);
    if (party?.id) {
      updateParty({ ...party, pokemon: [...party.pokemon, { name: pokemon }] });
    } else {
      const id = createParty({ ...party, pokemon: [...(party?.pokemon ?? []), { name: pokemon }], version: versionId });
      router.replace(`/create-edit-party/${id}`);
    }
  }

  return (
    <View>
      <Text className="text-4xl font-bold text-accent mb-4">{party?.name || "Unnamed"}</Text>
      <Text className="text-lg text-primary">{party?.description}</Text>

      <PartyPokemonSprites pokemonTeam={party?.pokemon} />

      <View className="flex-row items-center justify-between mt-4">
        {[...Array(6)].map((_, i) => {
          if (party?.pokemon.length > i) {
            return <PokemonSpriteIcon key={i} pokemon={party.pokemon[i].name} />
          }
          return <AntDesign key={i} name="pluscircleo" size={42} color="gray" onPress={() => setIsNewPokemonFormOpen(true)} />
        })}
      </View>

      <View className="mt-8">
        {party?.pokemon.map((pokemon: any) => (
          <View key={pokemon.name}>
            <PartyPokemonView pokemon={pokemon} />
          </View>
        ))}
      </View>


      <Modal visible={isNewPokemonFormOpen} onRequestClose={() => setIsNewPokemonFormOpen(false)} animationType="slide">
        <SafeAreaView className="bg-primaryLight rounded-lg p-4 h-full">
          <View className="flex-row justify-between mb-4">
            <Text className="text-2xl font-bold text-primary ml-8">Add Pokemon</Text>
            <Pressable onPress={() => setIsNewPokemonFormOpen(false)} className="w-fit mr-8">
              <AntDesign name="closesquare" size={24} color="#f28482" />
            </Pressable>
          </View>
          <NewPokemonForm version={version} handleNewPokemon={handleNewPokemon} />
        </SafeAreaView>
      </Modal>
    </View>
  )
}

const NewPokemonForm = ({ version, handleNewPokemon }: { version: string, handleNewPokemon: (pokemon: any) => void }) => {
  const { data: pokedex } = usePokedex(version);

  const pokemon = useMemo(() => {
    return pokedex?.pokemon_entries.map((entry: any) => entry.pokemon_species.name);
  }, [pokedex]);

  return (
    <View>
      <FlatList
        data={pokemon}
        renderItem={({ item }) => <PokemonListItem key={item.name} pokemon={item} onPress={() => handleNewPokemon(item)} />}
        keyExtractor={(item) => item.name}
      />
    </View>
  )
}