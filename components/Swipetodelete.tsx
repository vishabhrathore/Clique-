import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import {
  PanGestureHandler,
  GestureHandlerRootView,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.25; // Slightly easier threshold for swipe to delete

interface Item {
  id: number;
  title: string;
}

interface SwipeToDeleteItemProps {
  item: Item;
  onDelete: (id: number) => void;
}

const SwipeToDeleteItem: React.FC<SwipeToDeleteItemProps> = ({
  item,
  onDelete,
}) => {
  const translateX = useSharedValue(0);

  return (
    <PanGestureHandler>
      <Animated.View style={[styles.itemContainer]}>
        <Text style={styles.itemText}>{item.title}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const SwipeToDelete: React.FC = () => {
  const [data, setData] = useState<Item[]>([
    { id: 1, title: "Swipe to delete 1" },
    { id: 2, title: "Swipe to delete 2" },
    { id: 3, title: "Swipe to delete 3" },
  ]);

  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {data.map((item) => (
        <SwipeToDeleteItem key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  itemContainer: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 18,
    color: "#333",
  },
});

export default SwipeToDelete;
