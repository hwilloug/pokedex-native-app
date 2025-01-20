import React, { useState } from "react";
import { Modal, Pressable, SafeAreaView, Text, View } from "react-native";
import BaseView from "../components/BaseView";
import { useGetParty } from "../server/storage/useParties";
import { useLocalSearchParams } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import BackButton from "../components/BackButton";


export default function CreateEditParty() {
  const { id } = useLocalSearchParams();
  const { party } = useGetParty(id as string);

  return (
    <BaseView>
      <View className="mt-8 ml-8 flex-row items-center gap-4">
        <BackButton />
        <Text className="text-2xl font-bold text-primary">{id === "new" ? "Create Party" : "Edit Party"}</Text>
      </View>
      <View className="m-8">
        <PartyForm party={party} />
      </View>
    </BaseView>
  )
}

const PartyForm = ({ party }: { party: any }) => {
  const [isNewPokemonFormOpen, setIsNewPokemonFormOpen] = useState(false);

  return (
    <View>
      <Text className="text-4xl font-bold text-accent mb-4">{party?.name || "Unnamed"}</Text>
      <Text className="text-lg text-primary">{party?.description}</Text>
      <View className="flex-row items-center justify-between">
        {[...Array(6)].map((_, i) => (
          <AntDesign key={i} name="pluscircleo" size={42} color="gray" onPress={() => setIsNewPokemonFormOpen(true)} />
        ))}
      </View>
      <Modal visible={isNewPokemonFormOpen} onRequestClose={() => setIsNewPokemonFormOpen(false)}>
        <SafeAreaView className="bg-primaryLight rounded-lg p-4 h-full">
          <Pressable onPress={() => setIsNewPokemonFormOpen(false)} className="flex-row items-center justify-end mr-8 mt-8">
            <AntDesign name="closesquare" size={24} color="black" />
          </Pressable>
          <NewPokemonForm />
        </SafeAreaView>
      </Modal>
    </View>
  )
}

const NewPokemonForm = () => {
  return (
    <View>
      <Text>New Pokemon Form</Text>
    </View>
  )
}