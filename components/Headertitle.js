import { Image, View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/core";

function LogoHeader() {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Image
          style={{ width: 50, height: 50 }}
          source={require("../assets/logo.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

export default LogoHeader;
