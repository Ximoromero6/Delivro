import {
  View,
  Text,
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import ConfettiCannon from "react-native-confetti-cannon";
import { useNavigation } from "@react-navigation/native";

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
        We have received your order and now we'll process to completed.
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
    borderRadius: 6,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 40,
  },
});
