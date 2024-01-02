import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useNavigation } from "@react-navigation/native";
import useBasketStore from "../store/basketStore";

const Dish = ({ route }) => {
  const { item } = route.params;
  const { addProduct } = useBasketStore();
  const addToCart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.goBack();
    addProduct(item);
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent"></StatusBar>
        <Animated.Image
          source={item.img}
          style={styles.backgroundImage}
          entering={FadeIn.duration(500).delay(100)}
        />
        <View style={{ padding: 15 }}>
          <Animated.Text
            entering={FadeInLeft.duration(500).delay(200)}
            style={styles.title}
          >
            {item.name}
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(500).delay(400)}
            style={styles.desc}
          >
            {item.info}
          </Animated.Text>
          <View style={styles.separator}></View>
          <Text style={styles.questionsText}>
            Questions about allergens, ingredients or cooking methods?
            <Text
              style={{
                fontSize: 14,
                color: Colors.primary,
                fontFamily: "Roboto_400Regular",
              }}
            >
              Please contact with the restaurant
            </Text>
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.addToCartButtonText}>
              Add for ${item.price}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dish;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundImage: {
    width: "100%",
    height: 300,
    objectFit: "cover",
  },
  title: {
    fontFamily: "Roboto_700Bold",
    color: "#111111",
    fontSize: 24,
    marginBottom: 5,
  },
  desc: {
    fontFamily: "Roboto_400Regular",
    color: "#444",
    fontSize: 14,
    textAlign: "justify",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.grey,
    marginVertical: 20,
  },
  questionsText: {
    fontFamily: "Roboto_400Regular",
    color: Colors.medium,
    fontSize: 14,
  },
  footer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: "#111",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  addToCartButtonText: {
    fontFamily: "Roboto_700Bold",
    color: "#FFFFFF",
    fontSize: 15,
  },
});
