

import React from "react";
import { View } from "react-native";

export default function BaseView({ children }: { children: React.ReactNode }) {
    return <View className="bg-primaryLight h-screen pt-24 pb-8 px-8">
        {children}
    </View>
}