import { router } from "expo-router";
import { Alert } from "react-native";
import CustomButton from "./CustomButton";


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

        <CustomButton
            bgVariant="outline"
            textVariant="primary"
        >
            Sign Updfgdf
        </CustomButton>
    );
};

export default OAuth;
