import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";

const Search = ({ navigation }) => (
  <View style={{ ...styles.container }}>
    <StatusBar backgroundColor="#FFFFFF" style="dark"></StatusBar>
    <View style={{ ...styles.searchSection }}>
      <Ionicons
        name="search-outline"
        size={20}
        color={Colors.medium}
        style={{ paddingLeft: 10 }}
      />
      <TextInput
        cursorColor={Colors.green}
        placeholder="Try pizza, pasta, etc."
        style={{ ...styles.textInput }}
        w
        placeholderTextColor={Colors.medium}
        onFocus={() => navigation.navigate("search")}
        autoFocus={true}
      />
    </View>
  </View>
);

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    borderRadius: 4,
  },
  textInput: {
    flex: 1,
    fontFamily: "Roboto_400Regular",
    padding: 6,
    color: "#111111",
  },
});
