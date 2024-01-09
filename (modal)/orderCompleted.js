import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import ConfettiCannon from "react-native-confetti-cannon";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const OrderCompleted = () => {
  const navigationExt = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar backgroundColor="#FFFFFF" style="dark"></StatusBar>
      <ConfettiCannon
        count={200}
        origin={{ x: -10, y: 0 }}
        fallSpeed={2500}
        fadeOut={true}
        autoStart={true}
      />
      <Image
        source={require("../assets/images/orderDone.png")}
        style={{ width: 80, height: 80 }}
      />
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Roboto_700Bold",
          paddingTop: 20,
          paddingBottom: 10,
        }}
      >
        Thanks for your order!
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: "Roboto_400Regular",
          textAlign: "center",
        }}
      >
        We have received your order and now we'll process to complete it.
      </Text>
      <TouchableOpacity
        onPress={() => navigationExt.navigate("home")}
        style={styles.doneButton}
      >
        <Text style={{ fontFamily: "Roboto_700Bold", color: "#FFFFFF" }}>
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderCompleted;

const styles = StyleSheet.create({
  doneButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 40,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
});
