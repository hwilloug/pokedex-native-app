import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import BaseView from "../components/BaseView";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useGetParties } from "../server/storage/useParties";
import { router } from "expo-router";


export default function PartiesScreen() {
  const { parties } = useGetParties();

  const handleCreateParty = () => {
    router.push("/create-edit-party/new");
  }

  return (
    <BaseView>
      <View className="m-8 flex-row justify-between items-center">
        <View>
          <Text className="text-2xl font-bold text-primary">Team Builder</Text>
          <Text className="text-lg text-primary">Create teams of 6 Pokemon</Text>
        </View>
        <Pressable onPress={handleCreateParty}>
          <AntDesign name="pluscircle" size={24} color="#84A59D" />
        </Pressable>
      </View>
      <ScrollView>
        {parties.length > 0 && parties.map((party: string) => (
          <View key={party}>
            <Text>{party}</Text>
          </View>
        ))}
        {
          parties.length === 0 || parties.length === undefined && (
            <View className="flex-col justify-center items-center mt-10">
              <View className="flex-row justify-center items-center">
                <Text className="text-lg text-primary">No parties found</Text>
              </View>
              <Pressable className="flex-row justify-center items-center gap-2 bg-secondary rounded-full p-2 m-3 border border-primary" onPress={handleCreateParty}>
                <AntDesign name="pluscircle" size={24} color="#f28482" />
                <Text className="text-lg text-primary font-bold">Create a party</Text>
              </Pressable>
            </View>
          )
        }
      </ScrollView>
    </BaseView>
  )
}