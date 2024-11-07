import {
  ImageStyle,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { TextInputProps } from "react-native-paper";

declare interface Driver {
  id: number;
  first_name: string;
  last_name: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
}

declare interface MarkerData {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  profile_image_url: string;
  car_image_url: string;
  car_seats: number;
  rating: number;
  first_name: string;
  last_name: string;
  time?: number;
  price?: string;
}

declare interface MapProps {
  destinationLatitude?: number;
  destinationLongitude?: number;
  onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
  selectedDriver?: number | null;
  onMapReady?: () => void;
}

declare interface Ride {
  origin_address: string;
  destination_address: string;
  origin_latitude: number;
  origin_longitude: number;
  destination_latitude: number;
  destination_longitude: number;
  ride_time: number;
  fare_price: number;
  payment_status: string;
  driver_id: number;
  user_id: string;
  created_at: string;
  driver: {
    first_name: string;
    last_name: string;
    car_seats: number;
  };
}

declare interface ButtonProps extends TouchableOpacityProps {
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?:
    | "primary"
    | "default"
    | "secondary"
    | "danger"
    | "success"
    | "white";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  onPressRightIcon?: ((event: GestureResponderEvent) => void) | null;
  secureTextEntry?: boolean;
  labelStyle?: StyleProp<TextStyle>; // Use StyleProp<TextStyle> for text styles
  containerStyle?: StyleProp<ViewStyle>; // Use StyleProp<ViewStyle> for view/container styles
  inputStyle?: StyleProp<TextStyle>; // Use StyleProp<TextStyle> for input field styles
  iconStyle?: StyleProp<ImageStyle>;
  className?: string;
  leftIcon?: string | React.ReactNode; // Left icon, can be a string (for built-in icons) or a custom component
  rightIcon?: string | React.ReactNode; // Right icon, can be a string (for built-in icons) or a custom component
  helperText?: string;
}

declare interface PaymentProps {
  fullName: string;
  email: string;
  amount: string;
  driverId: number;
  rideTime: number;
}

declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface DriverStore {
  drivers: MarkerData[];
  selectedDriver: number | null;
  setSelectedDriver: (driverId: number) => void;
  setDrivers: (drivers: MarkerData[]) => void;
  clearSelectedDriver: () => void;
}

declare interface DriverCardProps {
  item: MarkerData;
  selected: number;
  setSelected: () => void;
}

declare interface SlideData {
  key: string;
  title: string;
}

declare interface CustomSwiperProps {
  data: OnboardingData[]; // Array of onboarding data
  renderItem: ({ item }: { item: OnboardingData }) => JSX.Element; // Render item function passed from parent
  autoPlay?: boolean; // Optional autoplay feature
  autoPlayInterval?: number; // Optional interval for autoplay (in ms)
}

declare interface OnboardingData {
  key: number;
  title: string;
  subtitle1: string;
  subtitle2: string;
  buttonText: string;
  image: any;
}

interface CustomSwiperRef {
  goToNextSlide: () => void;
}

interface LastMessage {
  text: string;
  timestamp: string;
  isRead: boolean;
}

declare interface ChatItem {
  id: number;
  name: string;
  avatar: string;
  lastMessage: LastMessage;
  unreadCount: number;
}

interface ChatItemProps {
  item: ChatItem;
  onDelete: () => void;
}

declare interface CallData {
  id: number;
  name: string;
  phoneNumber: string;
  duration: number;
  time: string;
  type: "Incoming" | "Outgoing" | "Missed";
  callType: "Voice" | "Video";
  isGroup: boolean;
  avatar?: string;
  participants?: {
    name: string;
    avatar: string;
  }[];
}

declare interface CallItemProps {
  item: CallData;
  onDelete: () => void;
}
