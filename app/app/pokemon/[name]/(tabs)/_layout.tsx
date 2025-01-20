import React from "react";
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function TabLayout() {
  const routes = [
    {
      name: "index",
      title: "Overview",
      icon: ({ color, size, focused }: { color: string, size: number, focused: boolean }) => (
        <Ionicons name={focused ? "information-circle" : "information-circle-outline"} color={color} size={size} />
      )
    },
    {
      name: "evolutions",
      title: "Evolutions",
      icon: ({ color, size, focused }: { color: string, size: number, focused: boolean }) => (
        <Octicons name={focused ? "person-fill" : "person"} size={size} color={color} />
      )
    },
    {
      name: "moves",
      title: "Moves",
      icon: ({ color, size, focused }: { color: string, size: number, focused: boolean }) => (
        <FontAwesome6 name={focused ? "hand-fist" : "hand-back-fist"} size={size} color={color} />
      )
    },
    {
      name: "catch",
      title: "Catch",
      icon: ({ color, size, focused }: { color: string, size: number, focused: boolean }) => (
        <FontAwesome name={focused ? "map" : "map-o"} size={size} color={color} />
      )
    }
  ]
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#f28482",
        tabBarInactiveTintColor: "#84a59d",
        tabBarStyle: {
          backgroundColor: "#F7EDE2",
        },
        headerShown: false,
      }}
    >
      {routes.map((route) => (
        <Tabs.Screen key={route.name} name={route.name} options={{ 
          title: route.title,
          tabBarIcon: route.icon
        }} />
      ))}
    </Tabs>
  );
}
