import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { headerTitle } from "react-native";

//SCREENS
import HomeScreen from "./containers/HomeScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import ProfileScreen from "./containers/ProfileScreen";
import AroundMeScreen from "./containers/AroundMeScreen";
import RoomScreen from "./containers/RoomScreen";

//COMPONENTS
import LogoHeader from "./components/Headertitle";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn">
              {() => <SignInScreen setToken={setToken} setUserId={setUserId} />}
            </Stack.Screen>

            <Stack.Screen name="SignUp">
              {() => <SignUpScreen setToken={setToken} setUserId={setUserId} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          headerBackground: () => {},
                          headerStyle: { backgroundColor: "white" },
                          headerTitle: () => <LogoHeader setToken={setToken} />,
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{
                          headerBackground: () => {},
                          headerStyle: { backgroundColor: "white" },
                          headerTitle: () => <LogoHeader setToken={setToken} />,
                        }}
                      >
                        {(props) => <RoomScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="TabAroundMe"
                  options={{
                    tabBarLabel: "Around Me",
                    tabBarIcon: ({ color, size }) => (
                      <Feather name="map-pin" size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundMe"
                        options={{
                          headerBackground: () => {},
                          headerStyle: { backgroundColor: "white" },
                          headerTitle: () => <LogoHeader setToken={setToken} />,
                        }}
                      >
                        {() => <AroundMeScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="TabMyProfile"
                  options={{
                    tabBarLabel: "My profile",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons
                        name="account-circle-outline"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          headerBackground: () => {},
                          headerStyle: { backgroundColor: "white" },
                          headerTitle: () => <LogoHeader />,
                        }}
                      >
                        {() => (
                          <ProfileScreen
                            userToken={userToken}
                            userId={userId}
                            setToken={setToken}
                            setUserId={setUserId}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
