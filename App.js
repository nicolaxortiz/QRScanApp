import { StatusBar } from "expo-status-bar";
import { collection, addDoc } from "firebase/firestore";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Constants from "expo-constants";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "./src/themes/Metrics";
import React from "react";
import Read from "./src/Components/Read";
import States from "./src/Hooks/States";
import { UseContext } from "./src/Context/UseContext";
import UseFireBase from "./src/FireBase/Config";

export default function App() {
  const initial = States();
  const { db } = UseFireBase();

  const handleBarCodeScanned = async ({ data }) => {
    initial.setScanned(true);
    let splitData = data.split(",");
    let Data = {
      nombre: splitData[0],
      cedula: splitData[1],
      fecha: `${splitData[2]} ${splitData[3]}`,
    };

    const docRef = await addDoc(collection(db, "Asistencia"), Data);
  };

  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);

  console.log(hoy.toLocaleString("es-ES", { timeZone: "UTC" }));

  // const hoyFix = formatoFecha(hoy);
  // console.log(hoyFix);

  // function formatoFecha(fecha) {
  //   const map = {
  //     dd: fecha.getDate(),
  //     mm: fecha.getMonth() + 1,
  //     yyyy: fecha.getFullYear(),
  //   };

  //   return `${map.dd}/${map.mm}/${map.yyyy}`;
  // }

  return (
    <UseContext.Provider value={initial}>
      <View style={{ width: "100%", height: "105%" }}>
        <View style={styles.container}>
          <Text style={styles.Titulo}>Gestor de asistencia de docentes</Text>
          <BarCodeScanner
            onBarCodeScanned={
              initial.scanned ? undefined : handleBarCodeScanned
            }
            style={styles.scanner}
            type={"front"}
          />

          {initial.scanned && <Read />}
          {initial.scanned && <View style={styles.tapadera} />}
        </View>
      </View>
    </UseContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
    flexDirection: "column",
    alignItems: "center",
  },
  Titulo: {
    fontSize: moderateScale(35),
    textAlign: "center",
    marginTop: verticalScale(50),
  },

  scanner: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: "column",
    width: horizontalScale(500),
    height: verticalScale(500),
    marginTop: verticalScale(15),
  },

  tapadera: {
    backgroundColor: "rgba(0, 0, 0, 0.36)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
});
