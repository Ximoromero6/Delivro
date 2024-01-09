import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SectionList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import Animated, {
  interpolate,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
  useAnimatedRef,
  FadeIn,
} from "react-native-reanimated";

import { restaurante } from "../assets/data/restaurant";
import useBasketStore from "../store/basketStore";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 250;

const Details = ({ route }) => {
  const { restaurant } = route.params;
  const navigation = useNavigation();

  const DATA = restaurante.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  const { items, total } = useBasketStore();

  const scrollRefHeader = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRefHeader);

  const scrollRef = useRef(null);
  const itemsRef = useRef([]);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedText = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1], [0, 1]),
    };
  });

  const bodyAnimatedText = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, 320 / 1], [1, 0]),
    };
  });

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.5}
      onPress={() => navigation.navigate("Dish", { item: item })}
    >
      <Animated.View
        style={{ flex: 1 }}
        entering={FadeIn.duration(200).delay(100)}
      >
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDesc}>{item.info}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </Animated.View>
      <Animated.Image
        source={item.img}
        style={styles.itemImage}
        entering={FadeIn.duration(200).delay(100)}
      />
    </TouchableOpacity>
  );

  const selectCategory = (index) => {
    const selected = itemsRef.current[index];
    setActiveItem(index);

    selected.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
  };

  const onScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;

    if (y > 350) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };

  const [activeItem, setActiveItem] = useState(0);

  const opacity = useSharedValue(0);

  const animatedStylesSticky = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ ...styles.roundedButton }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="arrow-back-outline"
              size={22}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <Animated.Text style={[styles.headerText, headerAnimatedText]}>
            {restaurant.name}
          </Animated.Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity style={{ ...styles.roundedButton }}>
              <Ionicons name="share-outline" size={22} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.roundedButton }}>
              <Ionicons
                name="search-outline"
                size={22}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <Animated.ScrollView
        ref={scrollRefHeader}
        scrollEventThrottle={16}
        overScrollMode="never"
        onScroll={onScroll}
      >
        <Animated.Image
          source={restaurant.img}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View style={styles.mainContainer}>
          <Animated.Text style={[styles.restaurantName, bodyAnimatedText]}>
            {restaurant.name}
          </Animated.Text>
          <Text style={styles.tagsText}>
            {restaurant.duration} min ·{" "}
            {restaurant.tags.map(
              (tag, index) =>
                `${tag}${index < restaurant.tags.length - 1 ? " · " : ""}`
            )}
          </Text>

          <Text style={styles.distanceText}>{restaurant.distance}</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={styles.buttonProduct}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={Colors.medium}
                style={{ marginBottom: "auto", marginRight: 10 }}
              />
              <View style={{ flex: 2, marginBottom: "auto" }}>
                <Text style={styles.buttonProductTitle}>Info</Text>
                <Text style={styles.buttonProductDesc}>
                  Map, allergens and hygiene rating
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Colors.primary}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonProduct}>
              <Ionicons
                name="star"
                size={20}
                color={Colors.green}
                style={{ marginBottom: "auto", marginRight: 10 }}
              />
              <View style={{ flex: 2, marginBottom: "auto" }}>
                <Text
                  style={[styles.buttonProductTitle, { color: Colors.green }]}
                >
                  {restaurant.rating}
                </Text>
                <Text style={styles.buttonProductDesc}>
                  See all {restaurant.ratings} reviews
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              paddingHorizontal: 15,
            }}
          >
            <TouchableOpacity style={{ ...styles.bikeButton }}>
              <Image
                style={{ ...styles.bikeImage }}
                source={require("../assets/images/delivery-bike.png")}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Roboto_400Regular",
                color: "#111",
              }}
            >
              Deliver in {restaurant.duration} min
            </Text>
            <TouchableOpacity style={{ marginLeft: "auto" }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Roboto_400Regular",
                  color: Colors.primary,
                }}
              >
                Change
              </Text>
            </TouchableOpacity>
          </View>

          <SectionList
            sections={DATA}
            scrollEnabled={false}
            keyExtractor={(item, index) => `${item.id + index}`}
            style={{ marginTop: 0 }}
            renderSectionHeader={({ section: { title, index } }) => (
              <Text style={styles.sectionHeaderText}>{title}</Text>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.grey,
                  marginHorizontal: 15,
                }}
              ></View>
            )}
            SectionSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: Colors.grey,
                }}
              ></View>
            )}
            renderItem={renderItem}
          />
        </View>
      </Animated.ScrollView>

      <Animated.View style={[styles.stickySegment, animatedStylesSticky]}>
        <View style={styles.stickySegmentShadow}>
          <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            {restaurante.food.map((item, index) => (
              <TouchableOpacity
                ref={(ref) => (itemsRef.current[index] = ref)}
                key={index}
                style={
                  activeItem === index
                    ? styles.stickySegmentButtonActive
                    : styles.stickySegmentButton
                }
                onPress={() => selectCategory(index)}
              >
                <Text
                  style={
                    activeItem === index
                      ? styles.stickySegmentButtonTextActive
                      : styles.stickySegmentButtonText
                  }
                >
                  {item.category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>

      {/* Footer Basket */}

      {items > 0 && (
        <View style={styles.footer}>
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.basketButton}
              onPress={() => navigation.navigate("cart")}
            >
              <Text style={styles.basket}>{items}</Text>
              <Text style={styles.footerText}>View Cart</Text>
              <Text style={styles.footerText}>${total.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: width,
    height: IMG_HEIGHT,
    backgroundColor: Colors.grey,
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  roundedButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    fontFamily: "Roboto_700Bold",
    color: "#111111",
    fontSize: 16,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  restaurantName: {
    fontFamily: "Roboto_700Bold",
    color: "#111111",
    fontSize: 25,
    margin: 15,
  },
  tagsText: {
    fontSize: 13,
    fontFamily: "Roboto_400Regular",
    color: Colors.green,
    marginBottom: 5,
    margin: 15,
    marginTop: 0,
  },
  distanceText: {
    fontSize: 13,
    fontFamily: "Roboto_400Regular",
    color: Colors.medium,
    marginBottom: 5,
    marginHorizontal: 15,
  },
  buttonProduct: {
    height: 60,
    marginTop: 10,
    backgroundColor: Colors.lightGrey,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
  },
  buttonProductTitle: {
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
    color: "#111",
  },
  buttonProductDesc: {
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
    color: Colors.medium,
  },
  bikeButton: {
    width: 25,
    height: 25,
    backgroundColor: Colors.lightGrey,
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  bikeImage: {
    width: 30,
    height: 30,
    objectFit: "cover",
  },
  sectionHeaderText: {
    fontFamily: "Roboto_700Bold",
    color: "#111111",
    fontSize: 22,
    marginTop: 35,
    margin: 16,
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    flexDirection: "row",
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 4,
    objectFit: "cover",
    backgroundColor: Colors.grey,
  },
  itemName: {
    fontFamily: "Roboto_700Bold",
    color: "#222",
    fontSize: 18,
    marginBottom: 5,
  },
  itemDesc: {
    fontSize: 14,
    fontFamily: "Roboto_400Regular",
    color: Colors.medium,
    marginBottom: 5,
    paddingRight: 15,
    height: 50,
    overflow: "hidden",
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
    color: Colors.medium,
  },
  stickySegment: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    top: 50 + StatusBar.currentHeight,
    height: 50,
    justifyContent: "center",
    gap: 10,
    overflow: "hidden",
  },
  stickySegmentShadow: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.0,
    elevation: 1,
  },
  stickySegmentButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  stickySegmentButtonActive: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: Colors.primary,
  },
  stickySegmentButtonText: {
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
    color: Colors.medium,
  },
  stickySegmentButtonTextActive: {
    fontSize: 14,
    fontFamily: "Roboto_700Bold",
    color: "#FFFFFF",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  basket: {
    backgroundColor: Colors.green,
    fontFamily: "Roboto_700Bold",
    color: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  footerText: {
    fontFamily: "Roboto_700Bold",
    color: "#FFFFFF",
  },
  basketButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
});
