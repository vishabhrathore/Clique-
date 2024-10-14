import {
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from "react-native";
import { InputFieldProps } from "@/types/type";
import { Text, TextInput, useTheme } from "react-native-paper";

const InputField = ({
    label,
    leftIcon,
    rightIcon,
    secureTextEntry = false,
    labelStyle,
    containerStyle,
    inputStyle,
    iconStyle,
    ...props
}: InputFieldProps) => {
    const theme = useTheme();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flexDirection: 'column', width: '100%' }}>
                    <Text style={[{ marginBottom: 4, color: "#9676dd" }, labelStyle]}>
                        {label}
                    </Text>
                    <View style={[{ width: '100%' }, containerStyle]}>
                        <TextInput
                            outlineStyle={{
                                borderRadius: 8,
                                borderColor: "#9676dd",
                            }}
                            mode="outlined"
                            secureTextEntry={secureTextEntry}
                            contentStyle={[{ color: theme.colors.primary }, inputStyle]}
                            left={
                                leftIcon ? (
                                    <TextInput.Icon
                                        icon={typeof leftIcon === 'string' ? leftIcon : () => leftIcon}
                                        style={iconStyle || {}}
                                    />
                                ) : null
                            }
                            right={
                                rightIcon ? (
                                    <TextInput.Icon
                                        icon={typeof rightIcon === 'string' ? rightIcon : () => rightIcon}
                                        style={iconStyle || {}}
                                    />
                                ) : null
                            }
                            {...props}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default InputField;
