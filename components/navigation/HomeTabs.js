import TabBar from "./TabBar";
import Header from "../utils/Header";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../../screens/home";
import Cart from "../../screens/cart";
import Search from "../../screens/search";
import Profile from "../../screens/profile";

import { Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

function HomeTabs({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName={"home"}
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: true, //Puede tener dos headers, aquí lo desactivas,
        //el otro está en Navigate.js esta es la opción para el Stack.screen: options={{ headerShown: false }}
        header: ({ navigation, route }) => {
          return <Header navigation={navigation} />;
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen
        name="cart"
        component={Cart}
        options={{
          header: ({ navigation, route }) => {
            return (
              <SafeAreaView>
                <View style={{ ...styles.header }}>
                  <Text style={{ ...styles.title }}>Cart</Text>
                </View>
              </SafeAreaView>
            );
          },
        }}
      />
      <Tab.Screen
        name="search"
        component={Search}
        options={{
          header: ({ navigation, route }) => {
            return (
              <SafeAreaView>
                <View style={{ ...styles.header }}>
                  <Text style={{ ...styles.title }}>Search</Text>
                </View>
              </SafeAreaView>
            );
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          header: ({ navigation, route }) => {
            return (
              <SafeAreaView>
                <View style={{ ...styles.header }}>
                  <Text style={{ ...styles.title }}>Profile</Text>
                </View>
              </SafeAreaView>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeTabs;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto_700Bold",
    fontSize: 16,
  },
});
