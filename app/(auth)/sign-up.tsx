import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import OAuth from "@/components/OAuth";
import GoogleIcon from "@/assets/icons/GoogleIcon";

// Define a type for the form fields
type FormFieldNames = "name" | "email" | "password";

// Validation logic
const validateSignUpForm = (values: {
  name: string;
  email: string;
  password: string;
}) => {
  const errors: { name?: string; email?: string; password?: string } = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

const SignUp = () => {
  const theme = useTheme();

  // Form state
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const [ secureEntry, setSecureEntry]= useState(true)

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
    <SafeAreaView
      style={{
        display: "flex",
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        flex: 1,
        padding: 16,
      }}
    >
      <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <InputField
          label="Name"
          value={values.name}
          onChangeText={(text) => handleChange("name", text)}
          onBlur={() => handleBlur("name")} // Validate on blur
          helperText={errors.name}
          error={!!errors?.name}
        />

        <InputField
          label="Email"
          value={values.email}
          onChangeText={(text) => handleChange("email", text)}
          onBlur={() => handleBlur("email")} // Validate on blur
          error={!!errors.email} // Display error if present
          helperText={errors.email}
        />

        <InputField
          label="Password"
          value={values.password}
          onPressRightIcon={ ()=> setSecureEntry(!secureEntry)}
          secureTextEntry={secureEntry}
          rightIcon="eye"

          onChangeText={(text) => handleChange("password", text)}
          onBlur={() => handleBlur("password")} // Validate on blur
          error={!!errors.password} // Display error if present
          helperText={errors.password}
        />

        <CustomButton onPress={handleSubmit} textVariant="white">
          Sign Up
        </CustomButton>
      </View>
      <OAuth />
    </SafeAreaView>
  );
};

export default SignUp;
