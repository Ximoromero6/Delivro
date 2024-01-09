import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import categories from "../assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Colors from "../constants/Colors";
import { StatusBar } from "expo-status-bar";

const ItemBox = () => (
  <>
    <StatusBar backgroundColor={Colors.lightGrey} style="dark"></StatusBar>
    <View style={{ ...styles.itemContainer }}>
      <TouchableOpacity style={{ ...styles.item }}>
        <Ionicons name="swap-vertical" size={22} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Sort</Text>
        <Ionicons name="chevron-forward" size={24} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={{ ...styles.item }}>
        <Ionicons name="fast-food-outline" size={22} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Hygiene rating</Text>
        <Ionicons name="chevron-forward" size={24} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={{ ...styles.item }}>
        <Ionicons name="pricetag-outline" size={22} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Offers</Text>
        <Ionicons name="chevron-forward" size={24} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={{ ...styles.item, borderBottomWidth: 0 }}>
        <Ionicons name="nutrition-outline" size={22} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Dietary</Text>
        <Ionicons name="chevron-forward" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
    <Text style={{ ...styles.header }}>Categories</Text>
  </>
);

const Filter = ({ navigation }) => {
  const [items, setItems] = useState(categories);
  const [selected, setSelected] = useState([]);
  const flexWith = useSharedValue(0);
  const displayButton = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;

    if (hasSelected !== newSelected) {
      flexWith.value = withTiming(newSelected ? 150 : 0);
      displayButton.value = withTiming(newSelected ? 1 : 0);
      scale.value = withTiming(newSelected ? 1 : 0);
    }

    setSelected(selectedItems);
  }, [items]);

  const handleClearAll = () => {
    const updatedItems = items.map((item) => {
      item.checked = false;

      return item;
    });

    setItems(updatedItems);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: flexWith.value,
      opacity: flexWith.value ? 1 : 0,
      display: displayButton.value == 1 ? "flex" : "none",
      marginRight: displayButton.value == 1 ? 10 : 0,
    };
  });

  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const renderItem = ({ item, index }) => (
    <View style={{ ...styles.row }}>
      <Text style={{ ...styles.itemText }}>
        {item.name}{" "}
        <Text style={{ color: Colors.medium, fontSize: 13 }}>
          ({item.count})
        </Text>
      </Text>
      <BouncyCheckbox
        size={22}
        fillColor={Colors.primary}
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
        innerIconStyle={{ borderWidth: 2, borderRadius: 4 }}
        onPress={() => {
          const isChecked = items[index].checked;

          const updatedItems = items.map((item) => {
            if (item.name === items[index].name) {
              item.checked = !isChecked;
            }
            return item;
          });

          setItems(updatedItems);
        }}
        disableBuiltInState
        isChecked={items[index].checked}
      />
    </View>
  );

  return (
    <View style={{ ...styles.container }}>
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={ItemBox}
      />
      <View style={{ height: 100 }} />
      <View style={{ ...styles.footer }}>
        <Animated.View style={[animatedStyles, styles.buttonOutline]}>
          <TouchableOpacity
            onPress={handleClearAll}
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Animated.Text style={[animatedText, styles.buttonOutlineText]}>
              Clear all
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={{ ...styles.buttonText }}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 16,
    gap: 0,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 55,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    height: 55,
    borderRadius: 4,
    justifyContent: "center",
  },
  buttonOutlineText: {
    color: Colors.primary,
    fontFamily: "Roboto_700Bold",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Roboto_700Bold",
  },
  itemContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
  },
  item: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
  },
  header: {
    fontSize: 16,
    fontFamily: "Roboto_700Bold",
    padding: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
});
