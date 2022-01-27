import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as SplashScreen from "expo-splash-screen";

import { Home } from "./Pages";
import Info from "./Pages/Info";
import Favoris from "./Pages/Favoris";

const Stack = createNativeStackNavigator();

const config = {
  screens: {
    detail: "info/:ville",
  },
};

const linking = {
  prefixes: ["http://localhost:19006/"],
  config,
};

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => SplashScreen.hideAsync(), 2000);
  }, []);

  return (
    <NavigationContainer  linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} initialParams={{}} />
        <Stack.Screen name="info" component={Info} />
        <Stack.Screen name="favoris" component={Favoris} />
      </Stack.Navigator>
      <StatusBar style="light" backgroundColor="red" />
    </NavigationContainer>
  );
}
