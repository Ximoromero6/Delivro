import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headline: {
    fontFamily: "Roboto_700Bold",
    fontSize: 24,
    color: "#272343",
    textAlign: "center",
  },
  paragraph: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#2d334a",
  },
  button: {
    backgroundColor: "#F3AE46",
    width: "100%",
    borderRadius: 10,
    padding: 15,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "middle",
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    color: "#272343",
  },
});
