import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";

import { useEffect, useState } from "react";
import axios from "axios";

//Package pour map
import MapView from "react-native-maps";
import * as Location from "expo-location";

export default function AroundMe() {
  //STATE
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  // const [userCoords, setUserCoords] = useState(null);

  //Use effect appel à l'API
  useEffect(() => {
    const getPermissionLocationAndFetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync(); //Destructurer response.status

        let response; //Pour pouvoir utiliser plusieurs fois
        // console.log(status); //granted or declined
        if (status === "granted") {
          //Si l'utilisateur accepte la localisation on récupère donc ces coordonnées de localisation

          const location = await Location.getCurrentPositionAsync();
          // console.log(location); //renvoie les coordonnées GPS de l'utilisateur dans un objet (clé(coords) : latitude et longitude)
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);

          //On peut alors faire la requête avec les coordonnées

          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude${location.coords.longitude}`
          );
          console.log(response.data);
          //         //   console.log("Status", status);
          //         const location = await Location.getCurrentPositionAsync();

          // setData(response.data);
          // setIsLoading(false);
        } else {
          //Si l'utilisateur n'autorise pas la géolocalisation
          response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms/around"
          );
        }
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPermissionLocationAndFetchData();
  }, []);

  return isLoading ? (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size="large" color="#FFBAC0" />
      <ActivityIndicator size="large" color="#FFBAC0" />
      <ActivityIndicator size="large" color="#FFBAC0" />
    </View>
  ) : (
    <View style={styles.container}>
      <View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude ? latitude : 48.866667,
            longitude: longitude ? longitude : 2.333333,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
          }}
          showsUserLocation={true}
        >
          {data.map((appartements) => {
            return (
              <MapView.Marker
                key={appartements._id}
                coordinate={{
                  latitude: appartements.location[1],
                  longitude: appartements.location[0],
                }}
              />
            );
          })}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
    height: "100%",
    padding: 10,
  },

  map: {
    marginTop: 20,
    height: "100%",
    width: "100%",
  },
});
