import { useRoute } from "@react-navigation/core";
import axios from "axios";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";

export default function RoomScreen() {
  const { params } = useRoute();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.roomId}`
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
    <View>
      <Text>test</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
