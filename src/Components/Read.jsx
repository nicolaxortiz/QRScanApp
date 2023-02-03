import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../themes/Metrics";
import { UseContext } from "../Context/UseContext";

export default function Read({ message, nombre }) {
  const { setScanned } = React.useContext(UseContext);
  return (
    <View style={styles.container}>
      <Text style={styles.Titulo}>Bienvenido</Text>
      <Text style={styles.Texto}>Profesor/a {nombre}</Text>
      <Text style={styles.Texto2}>{message}</Text>

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
    top: "30%",
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

  Texto2: {
    fontSize: moderateScale(17),
    marginTop: verticalScale(20),
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
