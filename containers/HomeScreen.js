import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { Button, Text, View, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { Entypo } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation();

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
    <Text>En cours de chargement...</Text>
  ) : (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            return (
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
                <View>
                  <Text>{item.ratingValue}</Text>
                  <View>
                    {item.ratingValue > 4 && <Text>4 étoiles</Text>}
                    {/* {item.ratingValue > 3 && <Text>3 étoiles</Text>}
                    {item.ratingValue > 2 && <Text>2 étoiles</Text>}
                    {item.ratingValue > 1 && <Text>1 étoiles</Text>}
                    {item.ratingValue > 0 && <Text>pas d'étoiles</Text>} */}
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: 500,
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

    position: "absolute",
    textAlign: "center",

    fontSize: 20,
    left: 5,
    top: 165,
  },

  userPicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
  },

  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    width: 320,
  },

  bottomAd: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
