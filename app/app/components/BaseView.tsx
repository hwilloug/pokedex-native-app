

import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function BaseView({ children }: { children: React.ReactNode }) {
    return (
        <SafeAreaProvider>
            <SafeAreaView className="bg-primaryLight h-screen">
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    )
}