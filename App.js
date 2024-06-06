import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "a506b84cfc1527beb32cfbccb67ea40b";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [street, setStreet] = useState("");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ city: 5 });

    const locations = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setStreet(locations[0].street);
    setCity(locations[0].region + " " + locations[0].district);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();
      setDays(data.list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    ask();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityname}>{city}</Text>
        <Text style={styles.cityname}>{street}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        // indicatorStyle="white"
        // persistentScrollbar={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.time}>{day.dt_txt.slice(5, 13) + "시"}</Text>
              <Text style={styles.temp}>
                {parseFloat(day.main.temp).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityname: {
    fontSize: 50,
    fontWeight: "500",
    color: "#fff",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    color: "#fff",
  },
  temp: {
    marginTop: 50,
    fontSize: 150,
    color: "#fff",
  },
  description: {
    marginTop: -30,
    fontSize: 60,
    color: "#fff",
  },
  tinyText: {
    fontSize: 20,
    color: "#fff",
  },
  time: {
    fontSize: 60,
    color: "#fff",
  },
});
