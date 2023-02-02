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

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  const hoyFix = formatoFecha(hoy);

  function formatoFecha(fecha) {
    const map = {
      dd: fecha.getDate(),
      mm: fecha.getMonth() + 1,
      yyyy: fecha.getFullYear(),
      hour: fecha.getHours(),
      minute: fecha.getMinutes(),
    };

    let am;

    if (map.hour > 12) {
      map.hour = map.hour - 12;
      am = false;
    } else {
      am = true;
    }

    return `${map.dd}/${map.mm}/${map.yyyy} - ${map.hour}:${map.minute} ${
      am ? "AM" : "PM"
    }`;
  }

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
