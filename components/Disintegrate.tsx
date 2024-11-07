import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Text } from "react-native-paper";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// Particle props interface
interface ParticleProps {
  delay: number;
  trigger: boolean; // Control whether the animation should start
}

// Particle component for disintegration effect
const Particle: React.FC<ParticleProps> = ({ delay, trigger }) => {
  const opacity = useSharedValue(1); // Shared value for opacity
  const translateY = useSharedValue(0); // Shared value for Y translation
  const translateX = useSharedValue(0); // Shared value for X translation

  // Define the animated style
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
  }));

  // Trigger the animation when the "trigger" flag changes
  React.useEffect(() => {
    if (trigger) {
      setTimeout(() => {
        opacity.value = withTiming(0, { duration: 2000 }); // Fade out
        translateY.value = withTiming(-100 + Math.random() * 200, {
          duration: 2000,
        }); // Random Y movement
        translateX.value = withTiming(-100 + Math.random() * 200, {
          duration: 2000,
        }); // Random X movement
      }, delay);
    }
  }, [trigger, delay, opacity, translateX, translateY]);

  return <Animated.View style={[styles.particle, animatedStyle]} />;
};

// Main component with button to trigger snap effect
const ThanosSnapButtonEffect: React.FC = () => {
  const [triggerSnap, setTriggerSnap] = useState(false); // State to control when the snap effect happens
  const particles = Array.from({ length: 50 }); // Array to create particles

  const handleSnap = () => {
    setTriggerSnap(true); // Start the disintegration effect
  };

  return (
    <View style={styles.container}>
      <Text>sjdjifhuisdfhis</Text>
      {!triggerSnap ? (
        <Button title="Snap!" onPress={handleSnap} /> // Button to trigger the snap effect
      ) : (
        // Render particles when the button is pressed
        particles.map((_, i) => (
          <Particle key={i} delay={i * 100} trigger={triggerSnap} />
        ))
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  particle: {
    width: 10,
    height: 10,
    backgroundColor: "white",
    borderRadius: 5,
    position: "absolute", // Absolute position to allow free movement
  },
});

export default ThanosSnapButtonEffect;
