import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import useBasketStore from "../../store/basketStore";

const _renderIcon = (routeName, selectedTab, focus) => {
  let icon = "";
  let colorIcon = focus ? Colors.primary : Colors.medium;

  switch (routeName) {
    case "home":
      icon = focus ? "home" : "home-outline";
      break;
    case "cart":
      icon = focus ? "cart" : "cart-outline";
      break;
    case "search":
      icon = focus ? "search" : "search-outline";
      break;
    case "profile":
      icon = focus ? "person-circle-sharp" : "person-circle-outline";
      break;
  }

  return <Ionicons name={icon} size={25} color={colorIcon} />;
};

const TabBar = ({ state, descriptors, navigation }) => {
  const { items } = useBasketStore();
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index} style={styles.mainItemContainer}>
            <Pressable
              onPress={onPress}
              style={{
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  padding: 15,
                }}
              >
                {_renderIcon(route.name, state.name, isFocused)}
                <Text
                  style={[
                    { color: isFocused ? Colors.primary : Colors.medium },
                    styles.iconName,
                  ]}
                >
                  {route.name}
                </Text>
                {route.name === "cart" && items > 0 ? (
                  <View style={styles.badgeProducts}>
                    <Text
                      style={{
                        fontFamily: "Roboto_400Regular",
                        fontSize: 12,
                        color: "#FFFFFF",
                      }}
                    >
                      {items}
                    </Text>
                  </View>
                ) : (
                  ""
                )}
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    borderRadius: 0,
    maxHeight: 50,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconName: {
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "capitalize",
    fontFamily: "Roboto_400Regular",
    fontSize: 10,
  },
  badgeProducts: {
    width: 18,
    height: 18,
    borderRadius: 50,
    backgroundColor: "tomato",
    position: "absolute",
    top: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
