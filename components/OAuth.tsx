import { router } from "expo-router";
import { Alert, View } from "react-native";
import CustomButton from "./CustomButton";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import { Text } from "react-native-paper";

const OAuth = () => {
  //   const handleGoogleSignIn = async () => {
  //     // const result = await googleOAuth(startOAuthFlow);

  //     if (result.code === "session_exists") {
  //       Alert.alert("Success", "Session exists. Redirecting to home screen.");
  //       router.replace("/(root)/(tabs)/home");
  //     }

  //     Alert.alert(result.success ? "Success" : "Error", result.message);
  //   };

  return (
    <View style={{ marginTop: 16 }}>
      <CustomButton
        IconLeft={GoogleIcon}
        bgVariant="outline"
        textVariant="white"
      >
        Continue with Google
      </CustomButton>
    </View>
  );
};

export default OAuth;
