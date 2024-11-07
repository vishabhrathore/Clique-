import React from "react";
import { View } from "react-native";
import { Dialog, Portal, Text, Button } from "react-native-paper";
import CustomButton from "./CustomButton";

interface SuccessModalProps {
  showSuccessModal: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  showSuccessModal,
  onClose,
}) => {
  return (
    <Portal>
      <Dialog
        visible={showSuccessModal}
        onDismiss={onClose}
        style={{ borderRadius: 20 }}
      >
        {/* <Dialog.Content>
                    <View style={{ alignItems: 'center', paddingVertical: 20 }}>

                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Verified
                        </Text>
                        <Text style={{ textAlign: 'center', color: '#9CA3AF', marginTop: 10 }}>
                            You have successfully verified your account.
                        </Text>
                    </View>
                </Dialog.Content>
                <Dialog.Actions style={{ justifyContent: 'center' }}>
                    <CustomButton
                        onPress={() => {
                            onClose();
                            // Navigate to home
                        }}
                    >
                        Browse Home
                    </CustomButton>
                </Dialog.Actions> */}
        <Text> portal works</Text>
      </Dialog>
    </Portal>
  );
};

export default SuccessModal;
