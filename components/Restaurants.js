import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { restaurants } from "../assets/data/home";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Restaurants = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}
      overScrollMode="never"
    >
      {restaurants.map((restaurant, index) => (
        <Pressable
          key={index}
          onPress={() => {
            navigation.navigate("Details", { restaurant: restaurant });
          }}
        >
          <View style={{ ...styles.categoryCard }}>
            <Image
              source={restaurant.img}
              style={{ ...styles.categoryImage }}
            />
            <View style={{ ...styles.categoryBox }}>
              <Text style={{ fontFamily: "Roboto_700Bold" }}>
                {restaurant.name}
              </Text>
              <View style={{ ...styles.containerRatings }}>
                <Ionicons
                  name="star"
                  size={16}
                  color={Colors.green}
                  style={{
                    marginRight: 2,
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.green,
                    fontFamily: "Roboto_400Regular",
                    marginRight: 4,
                  }}
                >
                  {restaurant.rating}
                </Text>
                <Text
                  style={{ fontSize: 11, color: Colors.medium, fontFamily: "" }}
                >
                  {restaurant.ratings}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 13,
                  color: Colors.medium,
                }}
              >
                {restaurant.distance} · Free delivery
              </Text>
            </View>
            <View style={{ ...styles.timerContainer }}>
              <Ionicons
                name="time-outline"
                size={16}
                color={Colors.green}
                style={{
                  marginRight: 2,
                }}
              />
              <Text style={{ ...styles.timerText }}>
                {restaurant.duration} min
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 250,
    borderRadius: 6,
    marginEnd: 10,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 2,
  },
  categoryImage: {
    flex: 5,
    width: "auto",
    height: "auto",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: Colors.grey,
  },
  categoryTitle: {
    fontFamily: "Roboto_700Bold",
    marginTop: 5,
    textAlign: "left",
    color: Colors.green,
    fontSize: 12,
  },
  categoryBox: {
    flex: 2,
    padding: 10,
  },
  containerRatings: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  timerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    position: "absolute",
    paddingVertical: 6,
    paddingHorizontal: 10,
    elevation: 4,
    right: 10,
    bottom: 80,
  },
  timerText: {
    fontFamily: "Roboto_700Bold",
    color: "#111111",
    fontSize: 12,
  },
});
