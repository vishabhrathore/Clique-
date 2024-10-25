import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

// Generate random values for particles
const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

interface ParticleProps {
    onPress: () => void; // Add an onPress prop to handle presses
}

const Particle: React.FC<ParticleProps> = ({ onPress }) => {
    const opacity = useSharedValue(0);
    const translateX = useSharedValue(randomValue(-width, width));
    const translateY = useSharedValue(randomValue(-height / 2, height / 2));
    const scale = useSharedValue(randomValue(0.5, 1));
    const [pressed, setPressed] = useState(false); // Track if the particle is pressed

    // Animate particle movement and opacity
    const particleStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { translateX: withTiming(translateX.value, { duration: 10000, easing: Easing.linear }) },
            { translateY: withTiming(translateY.value, { duration: 10000, easing: Easing.linear }) },
            { scale: withTiming(pressed ? 1.5 : scale.value, { duration: 200 }) }, // Scale up when pressed
        ],
    }));

    // Loop opacity and randomize the movement for mist particles
    useEffect(() => {
        const animateParticle = () => {
            opacity.value = withTiming(1, { duration: 5000 }, () => {
                opacity.value = withTiming(0, { duration: 5000 });
            });

            translateX.value = randomValue(-width, width);
            translateY.value = randomValue(-height / 2, height / 2);
            scale.value = randomValue(0.5, 1);
        };

        const interval = setInterval(animateParticle, 10000);
        return () => clearInterval(interval);
    }, [opacity, translateX, translateY, scale]);

    return (
        <GestureHandlerRootView>
            <TapGestureHandler
                onActivated={() => {
                    onPress();
                    setPressed(true);
                    setTimeout(() => setPressed(false), 200); // Reset pressed state after 200ms
                }}
            >
                <Animated.View style={[styles.particle, particleStyle]} />
            </TapGestureHandler>

        </GestureHandlerRootView>
    );
};

// Main component to render particles and a button
const MistParticlesAnimation: React.FC = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const particleArray = new Array(20).fill(0); // Array of 20 particles

    const handleParticlePress = () => {
        console.log('Particle pressed!'); // You can handle the press action here
    };

    const startAnimation = () => {
        setIsAnimating(true);
    };

    return (
        <View style={styles.container}>
            {isAnimating &&
                particleArray.map((_, index) => (
                    <Particle key={index} onPress={handleParticlePress} />
                ))}
            <Button title="Start Animation" onPress={startAnimation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red', // Dark background for better contrast
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    particle: {
        position: 'absolute',
        width: 30,
        height: 30,
        backgroundColor: 'green', // Light, semi-transparent color
        borderRadius: 15, // Makes the particles circular
    },
});

export default MistParticlesAnimation;
