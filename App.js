import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "red", flex: 1 }}></View>
      <View style={{ backgroundColor: "blue", flex: 1 }}></View>
      <View style={{ backgroundColor: "green", flex: 1 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
