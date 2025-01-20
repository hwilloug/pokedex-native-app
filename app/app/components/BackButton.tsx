import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import { View } from "react-native";

export default function BackButton({ className }: { className?: string }) {
    return <Link href=".." className={className}>
        <View className={'bg-secondary rounded-full w-10 h-10 flex items-center justify-center'}>
            <AntDesign name="back" size={18} color="black" />
        </View>
    </Link>
} 