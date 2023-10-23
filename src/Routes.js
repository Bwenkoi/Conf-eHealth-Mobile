import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./Screens/HomeScreen";
import HealthScreen from "./Screens/HealthScreen";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "HomeScreen" }}
        />

        <Stack.Screen
          name="HealthScreen"
          component={HealthScreen}
          options={{ title: "HealthScreen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
