import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import { categories } from "../assets/data/home";
import Colors from "../constants/Colors";

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
        gap: 15,
      }}
      overScrollMode="never"
    >
      {categories.map((category, index) => (
        <View key={index}>
          <View style={{ ...styles.categoryCard }}>
            <Image source={category.img} style={{ ...styles.categoryImage }} />
          </View>
          <Text style={{ ...styles.categoryTitle }}>{category.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categoryCard: {
    width: 65,
    height: 65,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryImage: {
    width: 35,
    height: 35,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    objectFit: "contain",
  },
  categoryTitle: {
    fontFamily: "Roboto_700Bold",
    marginTop: 10,
    textAlign: "center",
    color: Colors.green,
    fontSize: 12,
  },
});
