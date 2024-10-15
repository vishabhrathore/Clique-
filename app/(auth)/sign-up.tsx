import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Alert, TouchableOpacity, View } from "react-native";
import { Checkbox, Modal, Portal, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import OAuth from "@/components/OAuth";
import GoogleIcon from "@/assets/icons/GoogleIcon";
import TextField from "@/components/TextField";
import SignUpIcon from "@/assets/icons/SignUp";
import { router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import SuccessModal from "@/components/Modal";
import { Theme } from "@/assets/theme/theme";

// Define a type for the values fields
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

  // values state
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [checked, setChecked] = useState(false)
  const { isLoaded, signUp, setActive } = useSignUp()
  const [secureEntry, setSecureEntry] = useState(true)


  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });


  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };
  // const onPressVerify = async () => {
  //   if (!isLoaded) return;
  //   try {
  //     const completeSignUp = await signUp.attemptEmailAddressVerification({
  //       code: verification.code,
  //     });
  //     if (completeSignUp.status === "complete") {
  //       await fetchAPI("/(api)/user", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           name: values.name,
  //           email: values.email,
  //           clerkId: completeSignUp.createdUserId,
  //         }),
  //       });
  //       await setActive({ session: completeSignUp.createdSessionId });
  //       setVerification({
  //         ...verification,
  //         state: "success",
  //       });
  //     } else {
  //       setVerification({
  //         ...verification,
  //         error: "Verification failed. Please try again.",
  //         state: "failed",
  //       });
  //     }
  //   } catch (err: any) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     setVerification({
  //       ...verification,
  //       error: err.errors[0].longMessage,
  //       state: "failed",
  //     });
  //   }
  // };





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

  // Handle values submission
  const handleSubmit = () => {
    const validationErrors = validateSignUpForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // No errors, proceed with sign-up
      console.log("values submitted successfully!", values);
      router.replace("/(auth)/otp")
    }
  };

  return (
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
      <Text style={{ fontFamily: "Outfit500", fontSize: 24, marginBottom: 16 }}>Create an Account </Text>
      <OAuth />

      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
        <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.outline }} />
        <Text style={{ marginHorizontal: 12, fontSize: 12, color: theme.colors.outline }}>or register with</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.outline }} />
      </View>
      <View style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <TextField
          label="Name"
          value={values.name}
          placeholder="User Name"
          onChangeText={(text) => handleChange("name", text)}
          onBlur={() => handleBlur("name")} // Validate on blur
          helperText={errors.name}
          error={!!errors?.name}
        />

        <TextField
          label="Email"
          value={values.email}
          placeholder="Email"
          onChangeText={(text) => handleChange("email", text)}
          onBlur={() => handleBlur("email")} // Validate on blur
          error={!!errors.email} // Display error if present
          helperText={errors.email}
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={{ marginLeft: 8 }}>I Agree to the Terms & Conditions</Text>
        </View>

        <CustomButton onPress={handleSubmit} textVariant="white">
          Create Account
        </CustomButton>
        <CustomButton onPress={() =>router.replace("/(auth)/otp")} textVariant="white">
          open modal
        </CustomButton>
      </View>

      <View style={{ width: "100%", flexDirection: "row", marginTop: 16, display: "flex", justifyContent: "center" }}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("/(auth)/sign-in")}>
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>
      </View>
      {/* <SuccessModal showSuccessModal={showSuccessModal} onClose={ /> */}
      <Portal>
        <Modal visible={showSuccessModal} onDismiss={() => setShowSuccessModal(false)} contentContainerStyle={{backgroundColor: Theme.schemes.dark.surfaceContainer, padding: 20, margin:20, borderRadius:12}} >
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>


    </SafeAreaView >
  );
};

export default SignUp;
