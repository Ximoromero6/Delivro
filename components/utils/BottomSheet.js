import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomSheet = forwardRef((props, ref) => {
  const navigation = useNavigation();
  const snapPoints = useMemo(() => ["50%"], []);

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
      <View style={styles.contentContainer}>
        <View style={styles.toggle}>
          <TouchableOpacity style={styles.toggleActive}>
            <Text style={styles.activeText}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleInactive}>
            <Text style={styles.inactiveText}>Pickup</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subheader}>Your Location</Text>

        <TouchableOpacity
          onPress={() => {
            dismiss();
            navigation.navigate("LocationSeach");
          }}
        >
          <View style={styles.item}>
            <Ionicons name="location-outline" size={20} color={Colors.medium} />
            <Text style={{ flex: 1 }}>Current location</Text>
            <Ionicons name="chevron-forward" size={24} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        <Text style={styles.subheader}>Arrival time</Text>
        <TouchableOpacity>
          <View style={styles.item}>
            <Ionicons
              name="stopwatch-outline"
              size={20}
              color={Colors.medium}
            />
            <Text style={{ flex: 1 }}>Now</Text>
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
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },
  toggleInactive: {
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
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
    fontWeight: "600",
    margin: 16,
    fontFamily: "Roboto_700Bold",
  },
  item: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    paddingVertical: 14,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
});

export default BottomSheet;
