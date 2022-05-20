import axios from "axios";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
export default function ProfileScreen({ route }) {
  const { params } = route;
  // console.log("ici ==>", params);

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/user/${params._id}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.form}>
          <Text>email</Text>
          <TextInput
            style={styles.email}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <Text>userName</Text>
          <TextInput
            style={styles.username}
            value={userName}
            onChangeText={(text) => {
              setUserName(text);
            }}
          />

          <Text>description</Text>
          <TextInput
            style={styles.description}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        </View>

        <TouchableOpacity
          style={StyleSheet.updateButton}
          onPress={handleUpdate}
        >
          <Text> Update</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      {/* <Text>user id : {params.userId}</Text> */}
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
