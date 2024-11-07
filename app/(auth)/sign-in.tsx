import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Checkbox, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import OAuth from "@/components/OAuth";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import TextField from "@/components/TextField";
import SignUpIcon from "@/assets/icons/SignUp";
import LoginIcon from "@/assets/icons/LoginIcon";
import { router } from "expo-router";

// Define a type for the form fields
type FormFieldNames = "userName" | "password";

// Validation logic
const validateSignUpForm = (values: { userName: string; password: string }) => {
  const errors: { userName?: string; password?: string } = {};

  if (!values.userName) {
    errors.userName = "Name is required";
  }

  // if (!values.email) {
  //   errors.email = "Email is required";
  // } else if (!/\S+@\S+\.\S+/.test(values.email)) {
  //   errors.email = "Email is invalid";
  // }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

const SignIn = () => {
  const theme = useTheme();

  // Form state
  const [values, setValues] = useState({ userName: "", password: "" });
  const [errors, setErrors] = useState<{
    userName?: string;
    password?: string;
  }>({});
  const [checked, setChecked] = useState(false);

  const [secureEntry, setSecureEntry] = useState(true);

  // Handle input changes
  const handleChange = (name: FormFieldNames, value: string) => {
    setValues({ ...values, [name]: value });
  };

  // Validate on blur
  const handleBlur = (name: FormFieldNames) => {
    const validationErrors = validateSignUpForm(values);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const validationErrors = validateSignUpForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // No errors, proceed with sign-up
      console.log("Form submitted successfully!", values);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          display: "flex",
          backgroundColor: theme.colors.background,
          flex: 1,
          padding: 16,
        }}
      >
        <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <SignUpIcon />
        </View>
        <Text
          style={{ fontFamily: "Outfit500", fontSize: 24, marginBottom: 16 }}
        >
          Login to Your Account{" "}
        </Text>
        <OAuth />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: theme.colors.outline,
            }}
          />
          <Text
            style={{
              marginHorizontal: 12,
              fontSize: 12,
              color: theme.colors.outline,
            }}
          >
            or login with
          </Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: theme.colors.outline,
            }}
          />
        </View>
        <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <TextField
            label="User Name"
            value={values.userName}
            placeholder="User Name"
            onChangeText={(text) => handleChange("userName", text)}
            onBlur={() => handleBlur("userName")} // Validate on blur
            helperText={errors.userName}
            error={!!errors?.userName}
          />
          <TextField
            label="Password"
            placeholder="Password"
            value={values.password}
            onPressRightIcon={() => setSecureEntry(!secureEntry)}
            secureTextEntry={secureEntry}
            rightIcon="eye"
            onChangeText={(text) => handleChange("password", text)}
            onBlur={() => handleBlur("password")} // Validate on blur
            error={!!errors.password} // Display error if present
            helperText={errors.password}
          />
          <View style={{ flexDirection: "row", marginVertical: 4 }}>
            <TouchableOpacity onPress={() => router.replace("/(auth)/sign-up")}>
              <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>

          <CustomButton onPress={handleSubmit} textVariant="white">
            Login
          </CustomButton>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginTop: 16,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Text>Do not have an Account ? </Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/sign-up")}>
            <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignIn;
