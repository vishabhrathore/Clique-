import OnBoardingF from "@/assets/icons/onboarding1";
import CustomButton from "@/components/CustomButton";
import CustomSwiper from "@/components/CustomSwiper";
import { data, onboarding } from "@/constants";
import { CustomSwiperRef, OnboardingData, SlideData } from "@/types/type";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const OnBoarding = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastSlide = data.onboarding.length - 1 === currentIndex;
  const swiperRef = useRef<CustomSwiperRef>(null);
  const count = useRef(0);

  console.log(count.current++);

  const handleNext = () => {
    if (isLastSlide) {
      router.replace("/(auth)/sign-up");
    }

    if (swiperRef.current) {
      swiperRef.current.goToNextSlide();
    }
  };

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Button
        style={{ marginLeft: "auto", marginRight: 16, marginTop: 8 }}
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
      >
        Skip
      </Button>
      <CustomSwiper ref={swiperRef} onIndexChange={handleIndexChange} />

      <View
        style={{
          marginTop: 16,
          marginBottom: 28,
          width: "75%",
          alignSelf: "center",
        }}
      >
        <CustomButton onPress={handleNext}>
          {data.onboarding[currentIndex].buttonText}
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  main: {
    padding: 8,
    flex: 1,
  },
  dot: {
    width: 32,
    height: 4,
    marginHorizontal: 5,
    backgroundColor: "#E2E8F0",
    borderRadius: 50,
  },
  activeDot: {
    width: 32,
    height: 4,
    marginHorizontal: 5,
    backgroundColor: "#0286FF",
    borderRadius: 50,
  },
});
