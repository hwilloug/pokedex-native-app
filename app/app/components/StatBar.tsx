import React from "react";
import { View, Text } from "react-native";
import * as Progress from 'react-native-progress';

const colors = {
    hp: "#FF5959",   // Red for HP
    atk: "#F5AC78",  // Orange for Attack
    def: "#FAE078",  // Yellow for Defense
    spa: "#9DB7F5",  // Blue for Special Attack
    spd: "#A7DB8D",  // Green for Special Defense
    spe: "#FA92B2",  // Pink for Speed
}

export default function StatBar({ name, value, max }: { name: string, value: number, max: number }) {
    return <View className="flex flex-row gap-2 items-center justify-between">
        <Text className="text-black text-center min-w-1/8">{name}</Text>
        <Progress.Bar progress={value / max} width={255} color={colors[name.toLowerCase() as keyof typeof colors]} />
        <Text className="text-black w-1/8 text-center min-w-1/8">{value}</Text>
    </View>
}