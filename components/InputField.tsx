import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { InputFieldProps } from "@/types/type";
import { HelperText, Text, TextInput, useTheme } from "react-native-paper";

const InputField = ({
  label,
  leftIcon,
  rightIcon,
  onPressRightIcon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  helperText = "",
  ...props
}: InputFieldProps) => {
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{ flexDirection: "column", width: "100%", borderRadius: 8 }}
        >
          {/* <Text style={[{ marginBottom: 4, color: "#9676dd" }, labelStyle]}>
            {label}
          </Text> */}
          <View style={[{ width: "100%" }, containerStyle]}>
            <TextInput
              mode="flat"
              underlineStyle={{
                borderRadius: 12,
              }}
              secureTextEntry={secureTextEntry}
              // activeUnderlineColor="transparent"

              outlineStyle={{
                borderColor: "#9676dd", // Custom border color
                borderWidth: 1, // Add border to create a flat, bordered input
              }}
              contentStyle={[
                {
                  color: theme.colors.primary,
                  backgroundColor: theme.colors.surfaceContainerLow,
                  borderRadius: 12,
                },
                inputStyle,
              ]}
              left={
                leftIcon ? (
                  <TextInput.Icon
                    icon={
                      typeof leftIcon === "string" ? leftIcon : () => leftIcon
                    }
                    style={iconStyle || {}}
                  />
                ) : null
              }
              right={
                rightIcon ? (
                  <TextInput.Icon
                    onPress={onPressRightIcon ? onPressRightIcon : () => {}}
                    icon={
                      typeof rightIcon === "string"
                        ? rightIcon
                        : () => rightIcon
                    }
                    style={iconStyle || {}}
                  />
                ) : null
              }
              {...props}
            />
          </View>
          {props.error && (
            <HelperText type="error" visible={props.error}>
              {helperText}
            </HelperText>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
