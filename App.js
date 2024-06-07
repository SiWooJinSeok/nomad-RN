import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import WorkHardTravelHardApp from "./assets/components/WorkHardTravelHardApp";

export default function App() {
  return (
    <View style={styles.container}>
      <WorkHardTravelHardApp />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
  },
});
