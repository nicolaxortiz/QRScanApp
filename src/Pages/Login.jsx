import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
} from "react-native";
import React from "react";
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from "../themes/Metrics";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import UseFireBase from "../FireBase/Config";
import { UseContext } from "../Context/UseContext";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [login, setLogin] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");

  const { auth } = UseFireBase();
  const navigation = useNavigation();

  const { setUserId } = React.useContext(UseContext);

  const btnLogin = () => {
    const { email, password } = login;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Home");
      })
      .catch((error) => {
        setError("*Tus datos son incorrectos*");
      });
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        navigation.navigate("Home");
      } else {
      }
    });
  }, []);

  return (
    <View style={styles.view}>
      <View style={styles.box}>
        <Text style={styles.txtInput}>Correo Electronico:</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Ingresa tu Email"
          cursorColor="#C05A8B"
          onChangeText={(text) => {
            setLogin({ ...login, email: text });
          }}
        />

        <Text style={styles.txtInput}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="*********"
          cursorColor="#C05A8B"
          onChangeText={(text) => {
            setLogin({ ...login, password: text });
          }}
          secureTextEntry={true}
        />
        {!!error.length && <Text style={styles.txtError}>{error}</Text>}
        <TouchableHighlight
          activeOpacity={1}
          underlayColor="#D077A2"
          style={styles.press}
          onPress={() => {
            btnLogin(login);
          }}
        >
          <Text style={{ fontSize: moderateScale(15), color: "#fff" }}>
            Iniciar sesión
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignSelf: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },

  box: {
    alignSelf: "center",
    position: "absolute",
    top: "20%",
  },

  input: {
    height: verticalScale(40),
    width: horizontalScale(250),
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#000",
    borderRadius: 10,
    marginBottom: verticalScale(25),
    borderWidth: 1.5,
  },

  txtInput: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
  },

  press: {
    backgroundColor: "#C05A8B",
    paddingVertical: moderateScale(10),
    paddingHorizontal: horizontalScale(70),
    borderRadius: 10,
    marginHorizontal: horizontalScale(15),
    alignSelf: "center",
    marginTop: verticalScale(25),
  },

  txtError: {
    alignSelf: "center",
    marginTop: verticalScale(25),
    fontSize: moderateScale(16),
    color: "#7B1F4B",
    fontWeight: "bold",
  },

  imgLogo: {
    width: horizontalScale(230),
    height: verticalScale(230),
    resizeMode: "contain",
    alignSelf: "center",
  },
});
