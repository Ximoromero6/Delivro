import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import useBasketStore from "../store/basketStore";
import Colors from "../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const Cart = ({ navigation }) => {
  const { products, total, clearCart, addProduct, reduceProduct } =
    useBasketStore();
  const [order, setOrder] = useState(false);

  const FEES = {
    service: 2.99,
    delivery: 5.99,
  };

  const navigationExt = useNavigation();

  const completeOrder = () => {
    setOrder(true);
    navigationExt.navigate("OrderCompleted");
    clearCart();
    setTimeout(() => {
      setOrder(false);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {!order && total > 0 ? (
        <>
          <StatusBar backgroundColor="#FFFFFF" style="dark"></StatusBar>
          <FlatList
            data={products}
            contentContainerStyle={{ paddingBottom: 150 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <Text
                style={{
                  marginHorizontal: 15,
                  marginVertical: 20,
                  fontFamily: "Roboto_700Bold",
                  fontSize: 18,
                }}
              >
                Order summary
              </Text>
            }
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: Colors.lightGrey,
                }}
              ></View>
            )}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={styles.buttonIncreseProduct}
                    onPress={(e) => reduceProduct(item)}
                  >
                    <Ionicons name="remove" size={20} color={Colors.medium} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "Roboto_400Regular",
                      color: Colors.primary,
                      paddingHorizontal: 5,
                    }}
                  >
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    style={styles.buttonIncreseProduct}
                    onPress={(e) => addProduct(item)}
                  >
                    <Ionicons name="add" size={20} color={Colors.medium} />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontFamily: "Roboto_400Regular",
                    color: "#222222",
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto_700Bold",
                    color: Colors.primary,
                    marginLeft: "auto",
                  }}
                >
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            )}
            ListFooterComponent={
              <View>
                <View
                  style={{ height: 1, backgroundColor: Colors.grey }}
                ></View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Subtotal</Text>
                  <Text style={styles.totalNumber}>${total.toFixed(2)}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Service fee</Text>
                  <Text style={styles.totalNumber}>${FEES.service}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Delivery fee</Text>
                  <Text style={styles.totalNumber}>${FEES.delivery}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text
                    style={{
                      fontFamily: "Roboto_700Bold",
                      color: "#111111",
                      fontSize: 16,
                    }}
                  >
                    Total
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Roboto_700Bold",
                      color: "#111111",
                      fontSize: 18,
                    }}
                  >
                    ${(total + FEES.service + FEES.delivery).toFixed(2)}
                  </Text>
                </View>
              </View>
            }
          />
          <View style={styles.footer}>
            <SafeAreaView
              edges={["bottom"]}
              style={{ backgroundColor: "#fff" }}
            >
              <TouchableOpacity
                onPress={completeOrder}
                style={styles.orderButton}
              >
                <Text style={styles.orderButtonText}>Complete Order</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
            padding: 15,
          }}
        >
          <StatusBar backgroundColor="#FFFFFF" style="dark"></StatusBar>
          <Image
            source={require("../assets/images/emptyCart.png")}
            style={{ width: 110, height: 110, objectFit: "cover" }}
          />
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Roboto_700Bold",
              paddingTop: 20,
            }}
          >
            Your cart is empty!
          </Text>
          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              textAlign: "center",
              paddingHorizontal: 50,
            }}
          >
            You have not added any product in your shopping cart!
          </Text>
          <TouchableOpacity
            style={styles.emptyCartButton}
            onPress={() => navigationExt.navigate("home")}
          >
            <Text style={styles.orderButtonText}>Order now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    padding: 15,
  },
  orderButton: {
    padding: 16,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  orderButtonText: {
    fontFamily: "Roboto_700Bold",
    color: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    gap: 20,
    alignItems: "center",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  total: {
    fontFamily: "Roboto_400Regular",
    color: "#555",
  },
  totalNumber: {
    fontFamily: "Roboto_400Regular",
    color: "#555",
  },
  emptyCartButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 4,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 50,
  },
  buttonIncreseProduct: {
    width: 25,
    height: 25,
    backgroundColor: Colors.lightGrey,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
