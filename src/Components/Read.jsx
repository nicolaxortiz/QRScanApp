import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../themes/Metrics";
import { UseContext } from "../Context/UseContext";

export default function Read() {
  const { setScanned } = React.useContext(UseContext);
  return (
    <View style={styles.container}>
      <Text style={styles.Titulo}>Bienvenido</Text>
      <Text style={styles.Texto}>Profesor Nicolas Ortiz</Text>
      <Pressable
        onPress={() => {
          setScanned(false);
        }}
        style={styles.btn}
      >
        <Text style={styles.btnTxt}>Cerrar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#fff",
    top: "45%",
    width: horizontalScale(300),
    zIndex: 2,
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: verticalScale(25),
  },

  Titulo: {
    fontSize: moderateScale(30),
    fontWeight: "bold",
  },

  Texto: {
    fontSize: moderateScale(27),
  },

  btn: {
    backgroundColor: "#C05A8B",
    alignSelf: "center",
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
    borderRadius: 5,
    marginTop: verticalScale(15),
  },

  btnTxt: {
    color: "#fff",
    fontSize: moderateScale(17),
  },
});
