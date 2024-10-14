import React from "react";
import {
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    StyleSheet,
    useColorScheme,
} from "react-native";
import { InputFieldProps } from "@/types/type";
import { Theme } from "@/assets/theme/theme";

const TextField = ({
    label,
    icon,
    secureTextEntry = false,
    labelStyle,
    containerStyle,
    inputStyle,
    iconStyle,
    ...props
}: InputFieldProps) => {
    const colorScheme = useColorScheme() || "light"; // Default to 'light' if undefined

    const styles = getStyles(colorScheme); // Pass the resolved color scheme

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, containerStyle]}>
                    <View style={[styles.inputContainer, containerStyle]}>
                        {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
                        <TextInput
                            style={[styles.input, inputStyle]}
                            placeholderTextColor={Theme.schemes.dark.outline}
                            secureTextEntry={secureTextEntry}
                            {...props}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

// Dynamically create styles based on color scheme
const getStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
        container: {
            width: "100%",
        },
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colorScheme === "dark" ? "#1D1A21" : "#f5f5f5", // Dynamic background
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colorScheme === "dark" ? "#1D1A21" : "#f5f5f5", // Dynamic border
            paddingHorizontal: 16,
        },
        icon: {
            width: 24,
            height: 24,
            marginRight: 8,
        },
        input: {
            flex: 1,
            borderRadius: 12,
            paddingVertical: 12,
            fontFamily: "Outfit",
            fontSize: 16,
            textAlign: "left",
            color: colorScheme === "dark" ? Theme.schemes.dark.secondary : Theme.schemes.light.primaryContainer, // Dynamic text color
        },
    });

export default TextField;
