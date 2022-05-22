import axios from "axios";
import { useState, useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export default function ProfileScreen({
  setToken,
  userId,
  setUserId,
  userToken,
}) {
  console.log("token", userToken);
  console.log("userId", userId);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //STATE INFORMATIONS USER
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");

  //STATE UPDATE USER
  const [sendingUser, setSendingUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken} `,
            },
          }
        );
        console.log("response.data", response.data);
        setIsLoading(false);
        setEmail(response.data.email);
        setDescription(response.data.description);
        setUserName(response.data.username);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //Update user
  const updateUser = async () => {
    try {
      setSendingUser(true);
      const obj = {};
      obj.email = email;
      obj.description = description;
      obj.userName = userName;

      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/update",
        obj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setEmail(response.data.email);
      setDescription(response.data.description);
      setUserName(response.data.userName);
      setSendingUser(false);
      alert("Vos informations ont bien été prises en compte");
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size="large" color="#FFBAC0" />
      <ActivityIndicator size="large" color="#FFBAC0" />
      <ActivityIndicator size="large" color="#FFBAC0" />
    </View>
  ) : (
    <View style={styles.container}>
      <Text>Votre profile</Text>
      <KeyboardAwareScrollView>
        <View style={styles.form}>
          <TextInput
            style={styles.email}
            placeholder={email}
            value={data.email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            style={styles.username}
            placeholder="email"
            value={userName}
            onChangeText={(text) => {
              setUserName(text);
            }}
          />

          <TextInput
            style={styles.description}
            placeholder={description}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        </View>

        <TouchableOpacity style={StyleSheet.updateButton} onPress={updateUser}>
          <Text> Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={StyleSheet.logoutButton}
          onPress={() => {
            setToken(null);
            setUserId(null);
          }}
        >
          <Text> Log out</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  updateButton: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    width: "50%",
    height: 50,
    borderRadius: 25,
    borderColor: "#FFBAC0",
  },

  description: {
    height: 100,
    width: 290,
    borderWidth: 1,
    marginBottom: 15,
    borderColor: "#FFBAC0",
    marginTop: 20,
  },

  username: {
    marginBottom: 15,
    height: 30,
    borderBottomWidth: 1,
    borderColor: "#FFBAC0",
    width: "80%",
  },

  email: {
    marginBottom: 15,
    height: 30,
    borderBottomWidth: 1,
    borderColor: "#FFBAC0",
    width: "80%",
  },
});
