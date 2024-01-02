import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

const LocationSeach = () => {
  const navigation = useNavigation();

  const goBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const [location, setLocation] = useState({
    latitude: -33.864689,
    longitude: 151.043625,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Search or move the map"
        fetchDetails={true}
        autoFocus={true}
        enablePoweredByContainer={false}
        keyboardShouldPersistTaps="handled"
        onPress={(data, details) => {
          const point = details?.geometry?.location;
          if (!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
          console.log(location);
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
      <MapView
        style={{ ...styles.map }}
        region={location}
        showsUserLocation={true}
      />

      <View style={{ ...styles.confirmButtonContainer }}>
        <TouchableOpacity style={{ ...styles.confirmButton }} onPress={goBack}>
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
    elevation: 10,
    shadowColor: "#000000",
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
});
