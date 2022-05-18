import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email,
            password,
          }
        );
        console.log(response.data);
        const userToken = "secret-token";
        setToken(response.data.token);
        alert("Connexion réussie");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Vous devez remplir tous les champs");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Sign in</Text>
      </View>
      <View>
        <Text style={styles.email}>email </Text>
        <TextInput
          style={styles.placeholderEmail}
          placeholder="nono@airbnb-api.com"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Text style={styles.password}>password </Text>
        <TextInput
          style={styles.placeholderPassword}
          placeholder="password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />

        <Button title="Sign in" onPress={handleSubmit} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.register}>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //Toute la taille de l'écran
    backgroundColor: "white",
  },

  top: {
    alignItems: "center",
  },

  logo: {
    height: 200,
    width: 200,
  },

  title: {
    fontSize: 25,
    color: "#717171",
    fontWeight: "bold",
    marginBottom: 130,
  },

  email: {
    color: "#717171",
    marginBottom: 5,
    marginLeft: 15,
  },

  placeholderEmail: {
    marginBottom: 20,
    marginLeft: 15,
    borderBottomWidth: 1,
    width: 330,
    borderColor: "#FFBAC0",
  },

  password: {
    color: "#717171",
    marginBottom: 5,
    marginLeft: 15,
  },

  placeholderPassword: {
    marginBottom: 20,
    marginLeft: 15,
    borderBottomWidth: 1,
    width: 330,
    borderColor: "#FFBAC0",
  },

  register: {
    textAlign: "center",
    marginTop: 20,
    color: "#717171",
  },
});
