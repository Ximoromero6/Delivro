import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
/* import { PROVIDER_GOOGLE } from "react-native-maps"; */
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LocationSeach = () => {
  const navigation = useNavigation();
  const [tempCity, setTempCity] = useState("");

  const [location, setLocation] = useState({
    latitude: -33.864689,
    longitude: 151.043625,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("locationMap");
      if (jsonValue !== null) {
        setLocation(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const storeData = async (keyValue, value) => {
    try {
      await AsyncStorage.setItem(keyValue, value);
    } catch (e) {
      console.error(e);
    }
  };

  const storeObject = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("locationMap", jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#FFFFFF" style="dark"></StatusBar>
      {
        <GooglePlacesAutocomplete
          placeholder="Search or move the map"
          fetchDetails={true}
          enablePoweredByContainer={false}
          keyboardShouldPersistTaps="handled"
          onPress={(data, details) => {
            //Get the name of the searched city
            const city = data.structured_formatting.main_text;
            setTempCity(city);

            const point = details?.geometry?.location;
            if (!point) return;

            setLocation({
              ...location,
              latitude: point.lat,
              longitude: point.lng,
            });

            storeObject({
              ...location,
              latitude: point.lat,
              longitude: point.lng,
            });
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
            language: "en",
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInputContainer: {
              padding: 5,
              paddingHorizontal: 10,
              backgroundColor: "#FFFFFF",
              alignItems: "flex-start",
              justifyContent: "center",
            },
            textInput: {
              backgroundColor: Colors.lightGrey,
              borderRadius: 4,
              color: Colors.medium,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            },
          }}
          renderLeftButton={() => (
            <View style={{ ...styles.iconContainer }}>
              <Ionicons name="search-outline" size={20} color={Colors.medium} />
            </View>
          )}
        />
      }
      <MapView
        style={{ ...styles.map }}
        region={location}
        showsUserLocation={true}
      >
        <Marker coordinate={location}>
          <View style={styles.pinImageContainer}>
            <Image
              source={require("../assets/images/pin.png")}
              style={styles.pinImage}
            />
          </View>
        </Marker>
      </MapView>

      <View style={{ ...styles.confirmButtonContainer }}>
        <TouchableOpacity
          style={{ ...styles.confirmButton }}
          onPress={() => {
            storeData("location", tempCity);
            navigation.goBack();
          }}
        >
          <Text style={{ ...styles.confirmButtonText }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationSeach;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  confirmButtonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 20,
  },
  confirmButton: {
    padding: 16,
    margin: 16,
    backgroundColor: Colors.primary,
    borderRadius: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    alignItems: "center",
  },
  confirmButtonText: {
    fontFamily: "Roboto_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  iconContainer: {
    backgroundColor: Colors.lightGrey,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 10,
    paddingRight: 0,
  },
  pinImageContainer: {
    width: 50,
    height: 50,
  },
  pinImage: {
    width: 30,
    height: 30,
  },
});
