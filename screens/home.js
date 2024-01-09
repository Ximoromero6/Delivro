import { Text, StyleSheet, ScrollView } from "react-native";
import Categories from "../components/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import Restaurants from "../components/Restaurants";
import { StatusBar } from "expo-status-bar";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={{ ...styles.container }}>
      <StatusBar backgroundColor="#FFFFFF" style="dark"></StatusBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
        overScrollMode="never"
      >
        <Categories />
        <Text style={{ ...styles.headerText }}>
          Top picks in your neighbourhood
        </Text>
        <Restaurants />
        <Text style={{ ...styles.headerText }}>Offers near you</Text>
        <Restaurants />
        <Text style={{ ...styles.headerText }}>Most favourited places</Text>
        <Restaurants />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 80,
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    fontSize: 16,
    fontFamily: "Roboto_700Bold",
    paddingHorizontal: 15,
    marginTop: 10,
  },
});
