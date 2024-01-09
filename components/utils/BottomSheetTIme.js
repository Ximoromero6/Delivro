import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import RadioGroup from "react-native-radio-buttons-group";

const BottomSheetTime = forwardRef((props, ref) => {
  const navigation = useNavigation();
  const snapPoints = useMemo(() => ["40%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const { dismiss } = useBottomSheetModal();

  return (
    <BottomSheetModal
      handleIndicatorStyle={{ display: "none" }}
      backgroundStyle={{ borderRadius: 0, backgroundColor: Colors.lightGrey }}
      overDragResistanceFactor={0}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <StatusBar translucent style="dark"></StatusBar>
      <View style={styles.contentContainer}>
        <Text style={styles.subheader}>Arrival time</Text>
        <TouchableOpacity>
          <View style={styles.item}>
            <Ionicons
              name="stopwatch-outline"
              size={20}
              color={Colors.medium}
            />
            <Text style={{ flex: 1 }}>ASAP</Text>
            <Ionicons name="chevron-forward" size={24} color={Colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.item}>
            <Ionicons
              name="stopwatch-outline"
              size={20}
              color={Colors.medium}
            />
            <Text style={{ flex: 1 }}>Schedule for later</Text>
            <Ionicons name="chevron-forward" size={24} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: 10
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },

  inactiveText: {
    color: Colors.primary,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Roboto_700Bold",
  },
  subheader: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: "600",
    fontFamily: "Roboto_700Bold",
    margin: 16
  },
  item: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    paddingVertical: 14,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
  },
});

export default BottomSheetTime;
