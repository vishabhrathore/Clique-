import React, { useState } from "react";
import { IconButton, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Theme } from "@/assets/theme/theme";
import { OtpInput } from "react-native-otp-entry";
import OtpView from "@/assets/icons/OtpIcon";
import OtpIcon from "@/assets/icons/OtpIcon";
import { useSignUp } from "@clerk/clerk-expo";

const Otp = () => {
  const theme = useTheme();
  const colorScheme = useColorScheme() || "light"; // Default to 'light' if undefined
  const styles = getStyles(colorScheme); // Pass the resolved color scheme
  const { isLoaded, signUp, setActive } = useSignUp();

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onPressVerify = async (code: string) => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: code,
      });
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };
  console.log(verification);
  return (
    <SafeAreaView
      style={{
        display: "flex",
        backgroundColor: theme.colors.background,
        flex: 1,
        padding: 16,
      }}
    >
      <View style={{ display: "flex", flex: 1, alignItems: "center" }}>
        <OtpIcon />
      </View>
      <Text style={{ fontSize: 16, textAlign: "center" }}>
        {" "}
        We have sent the verification code to your email address
      </Text>
      <View style={{ display: "flex" }}>
        <Text style={{ fontSize: 18 }}> SumitVishabh@gmail.com</Text>
        <IconButton
          icon="email-edit-outline"
          size={30}
          onPress={() => console.log("Pressed")}
        />
      </View>
      <View style={{ flex: 1, marginTop: 16 }}>
        <OtpInput
          numberOfDigits={6}
          focusColor="#9676dd"
          focusStickBlinkingDuration={500}
          onTextChange={(text) =>
            setVerification({ ...verification, code: text })
          }
          onFilled={(text) => {
            setTimeout(() => {
              onPressVerify(text);
            }, 2000);
          }}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            containerStyle: styles.container,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Otp;

const getStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      width: "100%",
    },
    pinCodeContainer: {
      backgroundColor: colorScheme === "dark" ? "#1D1A21" : "#f5f5f5", // Dynamic background
      borderColor: colorScheme === "dark" ? "#1D1A21" : "#f5f5f5", // Dynamic border
    },
    pinCodeText: {
      color:
        colorScheme === "dark"
          ? Theme.schemes.dark.secondary
          : Theme.schemes.light.primaryContainer, // Dynamic text color
    },
    focusStick: {
      // color: colorScheme === "dark" ? Theme.schemes.dark.secondary : Theme.schemes.light.primaryContainer, // Dynamic text color
    },
    activePinCodeContainer: {},
    input: {
      flex: 1,
      borderRadius: 12,
      paddingVertical: 12,
      fontFamily: "Outfit",
      fontSize: 16,
      textAlign: "left",
      color:
        colorScheme === "dark"
          ? Theme.schemes.dark.secondary
          : Theme.schemes.light.primaryContainer, // Dynamic text color
    },
  });
