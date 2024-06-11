import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { theme } from "../color";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORGE_KEY = "@toDos";

export default function WorkHardTravelHardApp() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setTodos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);

  const loadTodos = async (todos) => {
    const s = await AsyncStorage.getItem(STORGE_KEY);
    if (s) {
      setTodos(JSON.parse(s));
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const saveTodos = async (todos) => {
    AsyncStorage.setItem(STORGE_KEY, JSON.stringify(todos));
  };

  const addTodo = () => {
    if (text === "") {
      return;
    }

    const newTodo = { ...toDos, [Date.now()]: { text, work: working } };
    setTodos(newTodo);
    saveTodos(newTodo);
    setText("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.buttonText,
              color: working ? "white" : theme.gray,
            }}
          >
            work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.buttonText,
              color: working ? theme.gray : "white",
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing={addTodo}
          returnKeyType="done"
          value={text}
          onChangeText={onChangeText}
          placeholder={working ? "add Todo" : "add Travel"}
          style={styles.input}
        />
      </View>
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].work === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 38,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
