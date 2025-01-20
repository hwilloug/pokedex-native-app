import React from "react";
import { View, Text, FlatList, Button, Pressable } from "react-native";
import { Link, router } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { storeData } from "./server/storage/useStorage";
import { StorageKeys } from "./utils/storage-enums";
import { versions } from "./utils/versions";
import { useQueryClient } from "@tanstack/react-query";


export default function VersionSelection() {
    const queryClient = useQueryClient();

    const handleVersionPress = async (id: number) => {
        await storeData(StorageKeys.VERSION, id.toString());
        queryClient.invalidateQueries({ queryKey: ["storage", StorageKeys.VERSION] });
        router.push("..");
    }

    return (
        <View className="bg-primaryLight h-screen pt-24 px-8">
            <View className="flex flex-row gap-4 items-center mb-4">
                <Link href=".." >
                    <View className="bg-secondary rounded-full w-10 h-10 flex items-center justify-center">
                        <AntDesign name="back" size={18} color="black" />
                    </View>
                </Link>
                <Text className="text-primary text-2xl font-bold">Version Selection</Text>
            </View>
            <FlatList
                data={versions.reverse()}
                renderItem={({ item }) => <Pressable className="bg-secondaryLight rounded-lg flex items-center justify-center p-4" onPress={() => handleVersionPress(item.id)}><Text className="text-lg font-bold">{item.name}</Text></Pressable> }
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View className="h-4" />}
            />

        </View>
    )
}