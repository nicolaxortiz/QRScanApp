import React from "react";
import States from "./src/Hooks/States";
import { UseContext } from "./src/Context/UseContext";
import HomeScreen from "./src/Pages/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/Pages/Login";

const Stack = createNativeStackNavigator();

export default function App() {
  const initial = States();

  return (
    <UseContext.Provider value={initial}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#C05A8B",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "",
            }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Lector QR de asistencia",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UseContext.Provider>
  );
}
