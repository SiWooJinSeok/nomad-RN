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
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "a506b84cfc1527beb32cfbccb67ea40b";

const icons = {
  Clear: "day-sunny",
  Clouds: "cloudy",
  Rain: "rain",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

export default function WeatherApp() {
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
    <>
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
              <View style={styles.timeView}>
                <Text style={styles.time}>
                  {day.dt_txt.slice(5, 13) + "시"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(day.main.temp).toFixed(1)}
                </Text>
                <Fontisto
                  style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}
                  name={icons[day.weather[0].main]}
                  size={70}
                  color="white"
                />
              </View>

              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
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
    alignItems: "left",
  },
  temp: {
    marginTop: 50,
    marginLeft: 20,
    fontSize: 100,
    color: "#fff",
  },
  description: {
    marginTop: -30,
    marginLeft: 20,
    fontSize: 60,
    color: "#fff",
  },
  tinyText: {
    fontSize: 20,
    marginLeft: 20,
    color: "#fff",
  },
  time: {
    fontSize: 60,
    color: "#fff",
  },
  timeView: {
    alignItems: "center",
    justifyContent: "center",
  },
});
