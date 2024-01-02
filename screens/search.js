import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";

const Search = ({ navigation }) => (
  <View style={{ ...styles.container }}>
    <Text style={globalStyles.headline}>Search page</Text>
  </View>
);

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#FFFFFF"
  },
});
