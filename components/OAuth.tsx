import { router } from "expo-router";
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "./CustomButton";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { Text } from "react-native-paper";
import AuthButton from "./AuthButtton";
import AppleIcon from "@/assets/icons/AppleIcon";

const OAuth = () => {
  const { width: screenWidth } = Dimensions.get("window"); // Get screen width
  //   const handleGoogleSignIn = async () => {
  //     // const result = await googleOAuth(startOAuthFlow);

  //     if (result.code === "session_exists") {
  //       Alert.alert("Success", "Session exists. Redirecting to home screen.");
  //       router.replace("/(root)/(tabs)/home");
  //     }

  //     Alert.alert(result.success ? "Success" : "Error", result.message);
  //   };

  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 16 }}>
      <AuthButton
        IconLeft={GoogleIcon}
        style={{
          width: screenWidth * 0.5 - 24,
        }}
      >
        Google
      </AuthButton>
      <AuthButton
        IconLeft={AppleIcon}
        style={{
          width: screenWidth * 0.5 - 24,
        }}
      >
        Apple
      </AuthButton>
    </View>
  );
};

export default OAuth;
