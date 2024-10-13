import OnBoarding1 from "@/assets/icons/onboarding1";
import OnBoarding2 from "@/assets/icons/onboarding2";
import OnBoarding3 from "@/assets/icons/onboarding3";
import { OnboardingData } from "@/types/type";

export const ScreenIcons = {
  OnBoarding1,
  OnBoarding2,
  OnBoarding3,
};

export const onboarding: OnboardingData[] = [
  {
    key: 1,
    title: "Enjoy Seamless and expressive",
    subtitle1: "Messaging",
    subtitle2: "Connect with ease",
    buttonText: "Get Started",
    image: ScreenIcons.OnBoarding1,
  },
  {
    key: 2,
    title: "Experience clear and instant",
    subtitle1: "Voice Calls",
    subtitle2: "Stay connected effortlessly",
    buttonText: "Next",
    image: ScreenIcons.OnBoarding2,
  },
  {
    key: 3,
    title: "Engage in high-qualtiy",
    subtitle1: "Video calls",
    subtitle2: "See and be Seen anytime and anywhere",
    buttonText: "Chat Now",
    image: ScreenIcons.OnBoarding3,
  },
];

export const data = {
  onboarding,
};
