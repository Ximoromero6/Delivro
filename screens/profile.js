import { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { globalStyles } from "../styles/global";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Constants from "expo-constants";

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "Roboto_400Regular",
          marginTop: "auto",
          textAlign: "center",
          fontSize: 13,
          color: Colors.medium,
        }}
      >
        App version: {Constants.expoConfig.version}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 65,
    backgroundColor: "#FFFFFF",
  },
});
