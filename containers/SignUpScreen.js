import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useState } from "react";
import axios from "axios";

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");

  const [description, setDescription] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              username,
              description,
              password,
            }
          );
          console.log(response.data);
          const userToken = "secret-token";
          setToken(userToken);
          alert("Inscription réussie");
        } catch (error) {
          console.log(error);
          console.log(error.response.data);
          if (error.response.data) {
            setError(error.response.data.error);
          }
        }
      } else {
        setError("Les 2 mots de passe ne sont pas identiques");
      }
    } else {
      setError("Veuillez remplir tous les champs");
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

        <Text style={styles.title}>Sign up</Text>
      </View>

      <KeyboardAwareScrollView>
        <View style={styles.form}>
          <Text>email </Text>
          <TextInput
            style={styles.placeholderEmail}
            placeholder="nono@gmail.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <Text>username </Text>
          <TextInput
            style={styles.placeholderUsername}
            placeholder="nono"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />

          <TextInput
            multiline={true}
            style={styles.description}
            placeholder="Describe yourself in a few words..."
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />

          <Text>password </Text>
          <TextInput
            style={styles.placeholderPassword}
            placeholder="Nono2203!"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />

          <Text>confirm password </Text>
          <TextInput
            style={styles.placeholderConfirm}
            placeholder="Nono2203!"
            value={confirmPassword}
            secureTextEntry={true}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
          />

          {error ? <Text style={{ color: "crimson" }}>{error}</Text> : null}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text>Sign up</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text>Retour vers Sign In</Text>
        </TouchableOpacity> */}
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

    marginBottom: 50,
  },

  form: {
    marginLeft: 30,
  },

  description: {
    height: 100,
    width: 290,
    borderWidth: 1,
    marginBottom: 15,
    borderColor: "#FFBAC0",
    marginTop: 20,
  },
  placeholderEmail: {
    marginBottom: 15,
    height: 30,
    borderBottomWidth: 1,
    borderColor: "#FFBAC0",
    width: "80%",
  },

  placeholderUsername: {
    marginBottom: 15,
    height: 30,
    borderBottomWidth: 1,
    borderColor: "#FFBAC0",
    width: "80%",
  },

  placeholderPassword: {
    marginBottom: 15,
    height: 30,
    borderBottomWidth: 1,
    borderColor: "#FFBAC0",
    width: "80%",
  },

  placeholderConfirm: {
    marginBottom: 15,
    height: 30,
    borderBottomWidth: 1,
    borderColor: "#FFBAC0",
    width: "80%",
  },

  button: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    width: "50%",
    height: 50,
    borderRadius: 25,
    borderColor: "#FFBAC0",
  },
});
