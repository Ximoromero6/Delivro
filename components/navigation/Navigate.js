/*
 * Navigation imports
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./HomeTabs";
import IntroSlider from "../utils/IntroSlider";

import Filter from "../../(modal)/filter";
import LocationSeach from "../../(modal)/locationSeach";
import Details from "../../screens/details";
import Dish from "../../(modal)/dish";
import OrderCompleted from "../../(modal)/orderCompleted";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function Navigate() {
  const [viewedOnboarding, setViewedOnboarding] = useState(false);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");

      if (value !== null) {
        setViewedOnboarding(true);
      }
    } catch (error) {
      console.log("checkOnboarding function error: ", error);
    }
  };

  useEffect(() => {
    checkOnboarding();
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {viewedOnboarding ?
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeTabs}
                  options={{ headerShown: false, animation: "fade" }}
                />
                <Stack.Screen
                  name="Filter"
                  component={Filter}
                  options={({ navigation }) => ({
                    title: "Filter",
                    presentation: "modal",
                    headerShadowVisible: false,
                    animation: "slide_from_bottom",

                    header: ({ navigation, route, options, back }) => {
                      return (
                        <SafeAreaView>
                          <View style={{ ...styles.header }}>
                            <TouchableOpacity
                              onPress={() => {
                                navigation.goBack();
                              }}
                            >
                              <Ionicons
                                name="close"
                                size={28}
                                color={Colors.primary}
                              />
                            </TouchableOpacity>
                            <Text style={{ ...styles.title }}>Filters</Text>
                          </View>
                        </SafeAreaView>
                      );
                    },
                  })}
                />
                <Stack.Screen
                  name="LocationSeach"
                  component={LocationSeach}
                  options={({ navigation }) => ({
                    presentation: "fullScreenModal",
                    headerShadowVisible: false,
                    animation: "slide_from_bottom",

                    header: ({ navigation, route, options, back }) => {
                      return (
                        <SafeAreaView>
                          <View
                            style={{
                              ...styles.header,
                              backgroundColor: "#FFFFFF",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                navigation.goBack();
                              }}
                            >
                              <Ionicons
                                name="close"
                                size={28}
                                color={Colors.primary}
                              />
                            </TouchableOpacity>
                            <Text style={{ ...styles.title }}>Select location</Text>
                          </View>
                        </SafeAreaView>
                      );
                    },
                  })}
                />

                <Stack.Screen
                  name="Details"
                  component={Details}
                  options={({ navigation }) => ({
                    presentation: "fullScreenModal",
                    headerShadowVisible: false,
                    animation: "fade",
                    headerShown: false,
                  })}
                />

                <Stack.Screen
                  name="Dish"
                  component={Dish}
                  options={({ navigation }) => ({
                    presentation: "fullScreenModal",
                    headerShadowVisible: false,
                    animation: "fade",
                    headerTransparent: true,
                    header: ({ navigation, route, options, back }) => {
                      return (
                        <SafeAreaView>
                          <View
                            style={{
                              ...styles.header,
                              backgroundColor: "transparent",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                navigation.goBack();
                              }}
                              style={styles.roundedButton}
                            >
                              <Ionicons
                                name="close"
                                size={26}
                                color={Colors.primary}
                              />
                            </TouchableOpacity>
                          </View>
                        </SafeAreaView>
                      );
                    },
                  })}
                />

                <Stack.Screen
                  name="OrderCompleted"
                  component={OrderCompleted}
                  options={({ navigation }) => ({
                    presentation: "fullScreenModal",
                    headerShadowVisible: false,
                    animation: "fade",
                    headerTransparent: true,
                    header: ({ navigation, route, options, back }) => {
                      return (
                        <SafeAreaView>
                          <View
                            style={{
                              ...styles.header,
                              backgroundColor: "transparent",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                navigation.goBack();
                              }}
                              style={{
                                ...styles.roundedButton,
                                backgroundColor: Colors.lightGrey,
                              }}
                            >
                              <Ionicons
                                name="close"
                                size={26}
                                color={Colors.primary}
                              />
                            </TouchableOpacity>
                          </View>
                        </SafeAreaView>
                      );
                    },
                  })}
                />

              </>
              :
              <Stack.Screen
                name="IntroSlider"
                component={IntroSlider}
                options={{ headerShown: false }}
              />
            }


          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Roboto_700Bold",
    fontSize: 16,
    marginRight: 40,
  },
  roundedButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
