import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Constants from "expo-constants";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../themes/Metrics";
import Read from "../Components/Read";
import { UseContext } from "../Context/UseContext";
import UseFireBase from "../FireBase/Config";

const HomeScreen = () => {
  const { scanned, setScanned } = React.useContext(UseContext);

  const handleBarCodeScanned = async ({ data }) => {
    const { db } = UseFireBase();
    setScanned(true);
    if (data == "codigosecreto") {
    }

    // const docRef = await addDoc(collection(db, "Asistencia"), Data);
  };

  return (
    <View style={{ width: "100%", height: "105%" }}>
      <View style={styles.container}>
        <Text style={styles.Titulo}>
          Por favor, escanee el codigo de asistencia para registrarse :)
        </Text>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
          type={"back"}
        />

        {scanned && <Read />}
        {scanned && <View style={styles.tapadera} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight,
    flexDirection: "column",
    alignItems: "center",
  },
  Titulo: {
    fontSize: moderateScale(20),
    textAlign: "center",
    marginTop: verticalScale(30),
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

export default HomeScreen;
