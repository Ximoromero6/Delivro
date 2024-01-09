import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {

  const clearOnboarding = async () => {
    try {
      AsyncStorage.removeItem("@viewedOnboarding");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" style="dark"></StatusBar>
      <View
        style={{
          marginTop: "auto",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 4,
            padding: 16,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.primary,
            marginBottom: 10
          }}
          onPress={clearOnboarding}
        >
          <Text
            style={{
              fontFamily: "Roboto_700Bold",
              textAlign: "center",
              fontSize: 14,
              color: "#FFFFFF",
            }}
          >
            Clear Onboarding
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Roboto_700Bold",
            marginBottom: 10,
            textAlign: "center",
            fontSize: 13,
            color: "#111111",
          }}
        >
          Made with ❤️ by Ximo Romero
        </Text>
        <Text
          style={{
            fontFamily: "Roboto_400Regular",
            textAlign: "center",
            fontSize: 13,
            color: Colors.medium,
          }}
        >
          App version: {Constants.expoConfig.version}
        </Text>
      </View>
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
