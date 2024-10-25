import CallIcon from "@/assets/icons/CallIcon";
import CallIconFilled from "@/assets/icons/CallIconFilled";
import MessageIcon from "@/assets/icons/MessageIcon";
import MessageOutlineIcon from "@/assets/icons/MessageOutlineIcon";
import OnBoarding1 from "@/assets/icons/onboarding1";
import OnBoarding2 from "@/assets/icons/onboarding2";
import OnBoarding3 from "@/assets/icons/onboarding3";
import SettingIcon from "@/assets/icons/Setting";
import SettingOutline from "@/assets/icons/SettingOutline";
import StatusIcon from "@/assets/icons/StatusIcon";
import StatusOutlineIcon from "@/assets/icons/StatusOutlineIcon";
import { OnboardingData } from "@/types/type";

export const ScreenIcons = {
  OnBoarding1,
  OnBoarding2,
  OnBoarding3,
};

export const NavIcons = {
  chatOutline: MessageOutlineIcon,
  chatFilled: MessageIcon,
  statusOutline: StatusOutlineIcon,
  statusFilled: StatusIcon,
  callOutline: CallIcon,
  callFilled: CallIconFilled,
  settingOutline: SettingOutline,
  settingFilled: SettingIcon,
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
