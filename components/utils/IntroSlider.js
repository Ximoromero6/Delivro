import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import Colors from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { slides } from "../../assets/data/Slides";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IntroSlider = () => {
  const navigation = useNavigation();
  const sliderReference = useRef(null);

  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn();
  });

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const _handleNext = () => {
    sliderReference.current.goToSlide(
      sliderReference.current.state.activeIndex + 1
    );
  };

  const _renderItem = ({ item }) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View
          style={[
            styles.slide,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
          <View style={styles.containerText}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </Animated.View>
      </SafeAreaView>
    );
  };

  const _renderNextButton = () => {
    return (
      <TouchableOpacity style={styles.buttonNext} onPress={_handleNext}>
        <Text style={styles.buttonNextText}>Next</Text>
      </TouchableOpacity>
    );
  };

  const _renderSkipButton = () => {
    return (
      <TouchableOpacity
        style={[styles.buttonNext, { backgroundColor: "transparent" }]}
        onPress={_onDone}
      >
        <Text style={[styles.buttonNextText, { color: "#111111" }]}>Skip</Text>
      </TouchableOpacity>
    );
  };

  const _renderDoneButton = () => {
    return (
      <>
        <TouchableOpacity style={[styles.buttonNext]} onPress={_onDone}>
          <Text style={[styles.buttonNextText]}>Done!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonNext, { opacity: 0 }]}>
          <Text style={[styles.buttonNextText]}></Text>
        </TouchableOpacity>
      </>
    );
  };

  const _onDone = () => {
    try {
      AsyncStorage.setItem("@viewedOnboarding", "true");
      /*   navigation.navigate("Home"); */
    } catch (error) {
      console.log("_onDone function error: ", error);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.primary} style="light"></StatusBar>
      <AppIntroSlider
        ref={sliderReference}
        renderItem={_renderItem}
        data={slides}
        bottomButton
        showSkipButton
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        renderPagination={(index) => {
          return (
            <View style={styles.containerButtons}>
              <View style={styles.containerDots}>
                {slides.map((_, i) => {
                  const inputRange = [
                    (i - 1) * width,
                    i * width,
                    (i + 1) * width,
                  ];

                  const dotWith = scrollX.interpolate({
                    inputRange,
                    outputRange: [8, 16, 8],
                    extrapolate: "clamp",
                  });

                  const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp",
                  });

                  return (
                    <Animated.View
                      style={[styles.dotStyle, { width: dotWith, opacity }]}
                      key={i.toString()}
                    />
                  );
                })}
              </View>
              {index !== slides.length - 1 && _renderNextButton()}
              {index !== slides.length - 1 && _renderSkipButton()}
              {index === slides.length - 1 && _renderDoneButton()}
            </View>
          );
        }}
      />
    </>
  );
};

export default IntroSlider;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontFamily: "Roboto_700Bold",
    fontSize: 30,
    color: "#111111",
    textAlign: "left",
    marginBottom: 10,
  },
  text: {
    fontFamily: "Roboto_400Regular",
    fontSize: 15,
    color: Colors.medium,
    textAlign: "left",
  },
  buttonNext: {
    borderRadius: 4,
    backgroundColor: Colors.primary,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonNextText: {
    fontFamily: "Roboto_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    height: 400,
    backgroundColor: Colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: { width: "50%", height: "100%", position: "absolute", bottom: -130 },
  containerText: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    marginTop: 30,
  },
  containerDots: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginBottom: 15,
  },
  dotStyle: {
    height: 8,
    borderRadius: 5,
    backgroundColor: Colors.black,
  },
  containerButtons: {
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
});
