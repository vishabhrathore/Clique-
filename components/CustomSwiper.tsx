import { data } from "@/constants";
import { OnboardingData } from "@/types/type";
import React, {
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useTheme } from "react-native-paper";

const { width } = Dimensions.get("window");

interface CustomSwiperProps {
  onIndexChange: (index: number) => void; // Callback to notify parent of index change
}

const CustomSwiper = forwardRef(({ onIndexChange }: CustomSwiperProps, ref) => {
  const theme = useTheme();
  const scrollX = useRef(new Animated.Value(0)).current; // For tracking scroll position
  const flatListRef = useRef<FlatList>(null);
  const currentIndexRef = useRef(0); // To store the current index
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Function to scroll to the next slide
  const goToNextSlide = () => {
    if (flatListRef.current) {
      const nextIndex = currentIndexRef.current + 1;
      if (nextIndex < data.onboarding.length) {
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      }
    }
  };

  // Expose the `goToNextSlide` function to the parent via ref
  useImperativeHandle(ref, () => ({
    goToNextSlide,
  }));

  const debouncedIndexChange = useCallback(
    (index: number) => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Delay notifying the parent about the index change
      scrollTimeout.current = setTimeout(() => {
        if (currentIndexRef.current !== index) {
          onIndexChange(index); // Call parent only when index changes
          currentIndexRef.current = index;
        }
      }, 50);
    },
    [onIndexChange],
  );

  // Function to handle the scroll event and update the current index
  const onScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false, // Using false since FlatList scrolling is not in native animations
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        // currentIndexRef.current = currentIndex;
        debouncedIndexChange(currentIndex); // Notify parent of index change
      },
    }),
    [],
  );

  const renderItem = ({ item }: { item: OnboardingData }) => {
    return (
      <View
        key={item.key}
        style={{
          width,
          padding: 16,
          alignItems: "center",
          flex: 1,
          height: "100%",
          backgroundColor: "transparent",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            textAlign: "center",
            fontFamily: "Outfit500",
            color: "#9676dd",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 28,
            textAlign: "center",
            fontFamily: "Outfit500",
            color: theme.colors.tertiary,
          }}
        >
          {item.subtitle1}
        </Text>
        <View style={{ marginVertical: 8 }}>
          {item.image && <item.image />}
        </View>
        <Text
          style={{
            fontSize: 28,
            textAlign: "center",
            fontFamily: "Outfit500",
            color: theme.colors.tertiary,
          }}
        >
          {item.subtitle2}
        </Text>
      </View>
    );
  };

  const renderDots = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 16,
        }}
      >
        {data.onboarding.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          // Animating the current dot width to simulate a tube (expand)
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 40, 10], // Expanded width in the middle
            extrapolate: "clamp",
          });

          // Animating opacity for smooth transition
          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3], // Current dot will be more opaque
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={{
                width: dotWidth,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: "#9676dd",
                opacity: dotOpacity,
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <FlatList
        data={data.onboarding}
        ref={flatListRef}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key.toString()}
        onScroll={onScroll}
        scrollEventThrottle={16} // Event fires every 16ms for smooth animation
      />
      {renderDots()}
    </View>
  );
});

export default CustomSwiper;
