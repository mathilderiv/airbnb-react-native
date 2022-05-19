import { useNavigation } from "@react-navigation/core";

import axios from "axios";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";
import { FlatList } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const stars = (number) => {
    if (number === 1) {
      return "⭐️";
    }
    if (number === 2) {
      return "⭐️⭐️";
    }

    if (number === 3) {
      return "⭐️⭐️⭐️";
    }
    if (number === 4) {
      return "⭐️⭐️⭐️⭐️";
    }
    if (number === 5) {
      return "⭐️⭐️⭐️⭐️⭐️";
    }
  };
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(data);

  useEffect(() => {
    const fectchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fectchData();
  }, []);

  return isLoading === true ? (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size="large" color="#FFBAC0" />
      <ActivityIndicator size="large" color="#FFBAC0" />
      <ActivityIndicator size="large" color="#FFBAC0" />
    </View>
  ) : (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          keyExtractor={(elem) => elem._id} //L'équivalent de l'index dans le map
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Room", { roomId: item._id });
                }}
              >
                <View style={styles.ad}>
                  <View style={styles.asolute}>
                    <Image style={styles.adPicture} source={item.photos[0]} />
                    <Text style={styles.price}>{item.price}€</Text>
                  </View>
                  <View style={styles.bottomAd}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.title}
                    >
                      {item.title}
                    </Text>

                    <Image
                      style={styles.userPicture}
                      source={item.user.account.photo}
                    />
                  </View>
                  <View style={styles.rating}>
                    <Text style={styles.stars}>{stars(item.ratingValue)}</Text>
                    <Text style={styles.ratingValue}>
                      {item.reviews} reviews
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
    height: 500,
    padding: 10,
  },

  activityIndicator: {
    flex: 1,

    flexDirection: "row",

    justifyContent: "space-around",
  },

  logoHeader: {
    height: 50,
    width: 50,
  },

  ad: {
    width: "100%",
    height: 300,
  },

  adPicture: {
    marginTop: 10,
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  price: {
    width: 80,
    height: 40,
    borderWidth: 1,
    color: "white",
    backgroundColor: "black",
    padding: 5,
    position: "absolute",
    textAlign: "center",

    fontSize: 20,
    left: 5,
    top: 165,
  },

  userPicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginTop: 10,
    marginRight: 10,
  },

  title: {
    marginTop: 10,

    marginRight: 10,
    fontSize: 20,
    fontWeight: "bold",
    width: 310,
  },

  bottomAd: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
  },

  rating: {
    flexDirection: "row",
  },

  stars: {
    marginRight: 10,
  },

  ratingValue: {
    color: "grey",
  },
});
