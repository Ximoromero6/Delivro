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

const ItemBox = () => (
  <>
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
  const scale = useSharedValue(0);

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;

    if (hasSelected !== newSelected) {
      flexWith.value = withTiming(newSelected ? 150 : 0);
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
        <View style={{ ...styles.btnContainer }}>
          <Animated.View style={[animatedStyles, styles.buttonOutline]}>
            <TouchableOpacity
              onPress={handleClearAll}
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.Text style={[animatedText, styles.buttonOutlineText]}>
                Clear all
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={{ ...styles.button, flex: 1, height: 56 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={{ ...styles.buttonText }}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#FFFFFF",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    marginVertical: 16,
    marginRight: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    height: 56,
    borderRadius: 4,
    justifyContent: "center",
    margin: 16,
    marginRight: 0,
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
  btnContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
});
