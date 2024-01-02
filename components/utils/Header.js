import React, { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  NativeModules,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
const { StatusBarManager } = NativeModules;
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

import BottomSheet from "./BottomSheet";

const SearchBar = () => {
  const navigation = useNavigation();

  return (
    <View style={{ ...styles.searchBarContainer }}>
      <View style={{ ...styles.searchContainer }}>
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
            placeholderTextColor={Colors.medium}
          />
        </View>

        <TouchableOpacity
          style={{ ...styles.optionButton }}
          onPress={() => navigation.navigate("Filter")}
        >
          <Ionicons name="options" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Header = () => {
  const bottomSheetRef = useRef(null);
  const openModal = () => {
    bottomSheetRef.current?.present();
  };

  const [actualLocation, setActualLocation] = useState("Sydney");

  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
      }}
    >
      <BottomSheet ref={bottomSheetRef} />

      <View style={styles.header}>
        <TouchableOpacity style={{ ...styles.bikeButton }} onPress={openModal}>
          <Image
            style={{ ...styles.bikeImage }}
            source={require("../../assets/images/delivery-bike.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.titleContainer }}
          onPress={openModal}
        >
          <Text style={{ ...styles.title }}>Delivery · Now</Text>
          <View style={{ ...styles.locationContainer }}>
            <Text style={{ ...styles.titleCity }}>{actualLocation}</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.profileButton }}
          onPress={() => navigation.navigate("profile")}
        >
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    gap: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    color: Colors.medium,
    fontFamily: "Roboto_400Regular",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleCity: {
    fontSize: 14,
    color: Colors.dark,
    fontFamily: "Roboto_700Bold",
    marginRight: 5,
  },
  bikeButton: {
    width: 30,
    height: 30,
    backgroundColor: Colors.lightGrey,
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bikeImage: {
    width: 35,
    height: 35,
    objectFit: "cover",
  },
  profileButton: {
    width: 35,
    height: 35,
    backgroundColor: Colors.lightGrey,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    height: 60,
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    paddingHorizontal: 15,
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    borderRadius: 6,
  },
  optionButton: {
    width: 35,
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontFamily: "Roboto_400Regular",
    padding: 5,
    color: Colors.medium,
  },
  contentContainer: {
    flex: 1,
  },
  textContainer: {
    fontFamily: "Roboto_400Regular",
    fontSize: 15,
  },
});
