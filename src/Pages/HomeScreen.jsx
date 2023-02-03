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
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

const HomeScreen = () => {
  const { scanned, setScanned, userId } = React.useContext(UseContext);
  const [message, setMesagge] = React.useState("");
  const [nombre, setNombre] = React.useState("");

  const GetDateTime = async () => {
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

      let formatoLargo = `${map.dd}/${map.mm}/${map.yyyy}-${map.hour}:${
        map.minute
      } ${am ? "AM" : "PM"}`;

      return formatoLargo.split("-");
    }

    return hoyFix;
  };

  let dataUser = {
    nombre: "",
    documento: "",
    userId: userId,
  };

  const GetData = async (tipo) => {
    const { db } = UseFireBase();
    const userRef = collection(db, "Usuarios");
    const q = query(userRef, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    const getDateTime = await GetDateTime();

    querySnapshot.forEach((doc) => {
      dataUser = {
        ...dataUser,
        nombre: doc.data().Nombre,
        documento: doc.data().Documento,
        tipo: tipo,
        fecha: getDateTime[0],
        hora: getDateTime[1],
      };
    });

    setNombre(dataUser.nombre);
  };

  const VerifyRegister = async () => {
    const { db } = UseFireBase();
    const getDateTime = await GetDateTime();
    const q = query(
      collection(db, "Asistencia"),
      where("userId", "==", userId),
      where("fecha", "==", getDateTime[0])
    );

    const querySnapshot = await getDocs(q);
    let count = [];
    querySnapshot.forEach((doc) => {
      count = [...count, doc.id];
    });

    return count.length;
  };

  const handleBarCodeScanned = async ({ data }) => {
    if (data == "EPb!GKduSqc03&2SGiwu89II^VNQ0nH@U#dJU") {
      setScanned(true);

      const numberRegister = await VerifyRegister();
      const { db } = UseFireBase();

      if (numberRegister == 0) {
        await GetData("Entrada");
        setMesagge("Registrada tu hora de entrada");
        const docRef = await addDoc(collection(db, "Asistencia"), dataUser);
      } else if (numberRegister == 1) {
        await GetData("Salida");
        setMesagge("Registrada tu hora de Salida");
        const docRef = await addDoc(collection(db, "Asistencia"), dataUser);
      } else if (numberRegister >= 2) {
        await GetData("");
        setMesagge("Ya tienes todos los registros del dia");
      }
    }
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

        {scanned && <Read message={message} nombre={nombre} />}
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
