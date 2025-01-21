import React from "react";
import { View, Text, FlatList, Pressable, Modal } from "react-native";
import BackButton from "./BackButton";
import { versions } from "../utils/versions";
import AntDesign from "@expo/vector-icons/AntDesign";


export default function VersionSelection({ handleVersionPress, isVisible, onClose }: { handleVersionPress: (id: number) => void, isVisible: boolean, onClose: () => void }) {
  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View className="bg-primaryLight h-screen pt-24 px-8">
        <View className="flex flex-row gap-4 items-center mb-4">
          <Pressable onPress={onClose}><View className={'bg-secondary rounded-full w-10 h-10 flex items-center justify-center'}>
            <AntDesign name="back" size={18} color="black" />
        </View></Pressable>
          <Text className="text-primary text-2xl font-bold">Version Selection</Text>
        </View>
        <FlatList
          data={versions}
          renderItem={({ item }) => <Pressable className="bg-secondaryLight rounded-lg flex items-center justify-center p-4" onPress={() => handleVersionPress(item.id ?? 0)}><Text className="text-lg font-bold">{item.name}</Text></Pressable> }
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
      </View>
    </Modal>
  )
}