import { data } from '@/constants';
import { OnboardingData } from '@/types/type';
import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, FlatList, Animated, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
interface CustomSwiperProps {
    currentIndex: number; // Control the current index from outside
    onIndexChanged: (index: number) => void
}

const CustomSwiper = ({ currentIndex, onIndexChanged }: CustomSwiperProps) => {

    const isLastSlide = data.onboarding.length - 1 === currentIndex

    const theme = useTheme();
    const scrollX = useRef(new Animated.Value(0)).current; // For tracking scroll position
    const flatListRef = useRef<FlatList>(null);
    const currentScrollIndex = useRef<number | null>(null)



    useEffect(() => {
        if (flatListRef.current && currentScrollIndex.current !== currentIndex) {
            flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
        }
    }, [currentIndex]);



    const renderItem = ({ item }: { item: OnboardingData }) => {
        return (
            <View key={item.key} style={{ width, padding: 16, alignItems: 'center', flex: 1, height: "100%", backgroundColor: "transparent" }}>
                <Text
                    style={{
                        fontSize: 32,
                        textAlign: 'center',
                        fontFamily: 'Outfit500',
                        color: '#9676dd',
                    }}
                >
                    {item.title}
                </Text>
                <Text
                    style={{
                        fontSize: 28,
                        textAlign: 'center',
                        fontFamily: 'Outfit500',
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
                        textAlign: 'center',
                        fontFamily: 'Outfit500',
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
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 16 }}>
                {data.onboarding.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                    // Animating the current dot width to simulate a tube (expand)
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 40, 10], // Expanded width in the middle
                        extrapolate: 'clamp',
                    });

                    // Animating opacity for smooth transition
                    const dotOpacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3], // Current dot will be more opaque
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={i}
                            style={{
                                width: dotWidth,
                                height: 10,
                                borderRadius: 5,
                                marginHorizontal: 8,
                                backgroundColor: '#9676dd',
                                opacity: dotOpacity,
                            }}
                        />
                    );
                })}
            </View>
        );
    };


    //             {data.onboarding.map((_, i) => {
    //                 const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

    //                 // Animating the dots' scale and opacity based on scroll position
    //                 const dotScale = scrollX.interpolate({
    //                     inputRange,
    //                     outputRange: [1, 1.5, 1],
    //                     extrapolate: 'clamp',
    //                 });

    //                 const dotOpacity = scrollX.interpolate({
    //                     inputRange,
    //                     outputRange: [0.3, 1, 0.3],
    //                     extrapolate: 'clamp',
    //                 });

    //                 return (
    //                     <Animated.View
    //                         key={i}
    //                         style={{
    //                             width: 10,
    //                             height: 10,
    //                             borderRadius: 5,
    //                             marginHorizontal: 8,
    //                             backgroundColor: '#9676dd',
    //                             transform: [{ scale: dotScale }],
    //                             opacity: dotOpacity,
    //                         }}
    //                     />
    //                 );
    //             })}
    //         </View>
    //     );
    // };

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
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false } // Using false since FlatList scrolling is not in native animations
                )
                }
                scrollEventThrottle={16} // Event fires every 16ms for smooth animation
            />
            {renderDots()}

        </View>
    );
};

export default CustomSwiper;
