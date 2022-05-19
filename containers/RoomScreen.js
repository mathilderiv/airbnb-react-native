import axios from "axios";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";

//Package pour les maps google
// import MapView from "react-native-maps";
// import * as Location from "expo-location";

export default function RoomScreen({ route, navigation }) {
  //route contient dans un objet l'id de l'appartement

  const { params } = route;
  //console.log(route);
  // console.log("ici ==>", params);

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
  //STATE
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showText, setShowText] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  // const [coords, setCoords] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.roomId}`
        );
        console.log(response.data);
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
      <View style={styles.map}>
        <View style={styles.scrollView}>
          <FlatList
            horizontal={true}
            data={data.photos}
            keyExtractor={(elem) => elem._id}
            renderItem={({ item }) => {
              return (
                <View>
                  <View style={styles.scrollViewImage}>
                    <Image
                      style={styles.roomPicture}
                      source={{ uri: item.url }}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.adBottom}>
          <Text numberOfLines={1} style={styles.title}>
            {data.title}
          </Text>
          <Image style={styles.userPicture} source={data.user.account.photo} />
        </View>

        <View style={styles.rating}>
          <Text style={styles.stars}>{stars(data.ratingValue)}</Text>
          <Text style={styles.ratingValue}>{data.reviews} reviews</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              setShowText(!showText);
            }}
          >
            <Text numberOfLines={showText ? null : 3}>{data.description}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>{data.price}€</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },

  container: {
    flex: 1,

    backgroundColor: "white",
    height: "100%",
    padding: 10,
  },

  userPicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  roomPicture: {
    width: 350,
    height: 300,
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
    top: 240,
  },

  title: {
    marginTop: 10,

    marginRight: 10,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
    width: 310,
  },

  rating: {
    flexDirection: "row",
    marginBottom: 15,
  },

  stars: {
    marginRight: 10,
  },
  adBottom: {
    flexDirection: "row",
    marginTop: 10,
  },
});
