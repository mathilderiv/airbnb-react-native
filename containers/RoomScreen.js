import { useRoute } from "@react-navigation/core";
import axios from "axios";
import { Text, View, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

export default function RoomScreen({ route }) {
  //route contient dans un objet l'id de l'appartement
  const { params } = useRoute();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.roomId}`
        );
        // console.log(data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size="large" color="#FFBAC0" />
      <ActivityIndicator size="large" color="#FFBAC0" />
      <ActivityIndicator size="large" color="#FFBAC0" />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.map}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
});
