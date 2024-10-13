import React from 'react';
import { Button } from 'react-native-paper';
import { ButtonProps } from '@/types/type';
import { useTheme } from 'react-native-paper';

const getBgVariantStyle = (variant: ButtonProps["bgVariant"], theme: any) => {
    switch (variant) {
        case "secondary":
            return { backgroundColor: theme.colors.secondaryContainer };
        case "danger":
            return { backgroundColor: theme.colors.errorContainer };
        case "success":
            return { backgroundColor: theme.colors.tertiaryContainer };
        case "outline":
            return {
                backgroundColor: 'transparent',
                borderColor: theme.colors.outline,
                borderWidth: 1,
            };
        default:
            return { backgroundColor: theme.colors.primaryContainer };
    }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"], theme: any) => {
    switch (variant) {
        case "primary":
            return { color: theme.colors.onPrimaryContainer };
        case "secondary":
            return { color: theme.colors.onSecondaryContainer };
        case "danger":
            return { color: theme.colors.onErrorContainer };
        case "success":
            return { color: theme.colors.onTertiaryContainer };
        default:
            return { color: theme.colors.onPrimary };
    }
};

const CustomButton = ({
    onPress,
    children,
    bgVariant = "primary",
    textVariant = "default",
    IconLeft,
    IconRight,
    ...props
}: ButtonProps) => {
    const theme = useTheme();

    return (
        <Button
            onPress={onPress}
            mode={bgVariant === "outline" ? "outlined" : "contained"}
            style={[
                getBgVariantStyle(bgVariant, theme),
                { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
            ]}
            labelStyle={[
                getTextVariantStyle(textVariant, theme),
                { fontSize: 16 },
            ]}
            icon={IconLeft ? () => <IconLeft /> : undefined}
            {...props}
        >
            {children}
        </Button>
    );
};

export default CustomButton;