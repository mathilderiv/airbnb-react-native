import { Image } from "react-native";

function LogoHeader() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("../assets/logo.png")}
    />
  );
}

export default LogoHeader;
