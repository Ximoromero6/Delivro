import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async (keyValue) => {
  try {
    const value = await AsyncStorage.getItem(keyValue);
    return value !== null ? value : null;
  } catch (e) {
    console.error(e);
  }
};

export const storeData = async (keyValue, value) => {
  try {
    await AsyncStorage.setItem(keyValue, value);
  } catch (e) {
    console.error(e);
  }
};
