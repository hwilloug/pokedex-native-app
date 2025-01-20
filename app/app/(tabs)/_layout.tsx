import React from "react";
import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function TabLayout() {
  const routes = [
    {
      name: "index",
      title: "Pokédex",
      icon: ({ color, size, focused }: { color: string, size: number, focused: boolean }) => (
        <MaterialIcons name={focused ? "view-list" : "format-list-bulleted"} color={color} size={size} />
      )
    },
    {
      name: "parties",
      title: "Parties",
      icon: ({ color, size, focused }: { color: string, size: number, focused: boolean }) => (
        <MaterialCommunityIcons name={focused ? "account-group" : "account-group-outline"} size={size} color={color} />
      )
    },
    {
      name: "checklists",
      title: "Checklists",
      icon: ({ color, size, focused }: { color: string, size: number, focused: boolean }) => (
        focused ? <MaterialIcons name="catching-pokemon" size={size} color={color} /> : <MaterialCommunityIcons name="pokeball" size={size} color={color} />
      )
    },
    {
      name: "reference",
      title: "Reference",
      icon: ({ color, size, focused }: { color: string, size: number, focused: boolean }) => (
        <MaterialCommunityIcons name="book-open-page-variant" size={size} color={color} />
      )
    },
    {
      name: "about",
      title: "About",
      icon: ({ color, size, focused }: { color: string, size: number, focused: boolean }) => (
        <Ionicons name={focused ? "information-circle" : "information-circle-outline"} color={color} size={size} />
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
