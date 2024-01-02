import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Login({ navigation }) {
  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <View>
        <Text>holaa</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFE",
    padding: 10,
  },
  buttonLogin: {
    borderRadius: 6,
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    marginBottom: 10,
  },
  buttonLoginText: {
    marginLeft: 5,
    color: "#eee",
    fontSize: 16,
    textAlign: "center",
    flex: 1,
  },
});
