import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "../color";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto, Feather } from "@expo/vector-icons";

const STORGE_KEY = "@toDos";
const WORKING = "@working";

export default function WorkHardTravelHardApp() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setTodos] = useState({});
  const [editKey, setEditKey] = useState(null);
  const [editText, setEditText] = useState("");

  const toggleWorking = () => {
    const worked = !working;
    setWorking(!working);
    AsyncStorage.setItem(WORKING, JSON.stringify(worked));
  };

  const onChangeText = (payload) => setText(payload);
  const onChangeEditText = (payload) => setEditText(payload);

  const loadTodos = async () => {
    const work = await AsyncStorage.getItem(WORKING);

    if (work) {
      setWorking(JSON.parse(work));
    }

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

  const addTodo = async () => {
    if (text === "") {
      return;
    }

    const newTodo = {
      ...toDos,
      [Date.now()]: { text, work: working, confirm: false },
    };
    setTodos(newTodo);
    await saveTodos(newTodo);
    setText("");
  };

  const confirmToDo = (key) => {
    const newTodo = { ...toDos };
    newTodo[key].confirm = !newTodo[key].confirm;
    setTodos(newTodo);
    saveTodos(newTodo);
  };

  const deleteToDo = (key) => {
    Alert.alert("삭제하기", "정말 삭제 하시겠습니까?", [
      { text: "취소" },
      {
        text: "삭제",
        onPress: () => {
          const newTodo = { ...toDos };
          delete newTodo[key];
          setTodos(newTodo);
          saveTodos(newTodo);
        },
      },
    ]);
  };

  const changeEditKey = (key) => {
    setEditKey(key);
    setEditText(toDos[key].text);
  };

  const EditToDo = () => {
    const newTodo = { ...toDos };
    newTodo[editKey].text = editText;
    setTodos(newTodo);
    saveTodos(newTodo);
    setEditKey(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleWorking}>
          <Text
            style={{
              ...styles.buttonText,
              color: working ? "white" : theme.gray,
            }}
          >
            work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleWorking}>
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
            <TouchableOpacity key={key} onPress={() => confirmToDo(key)}>
              <View style={styles.toDo}>
                {editKey !== key ? (
                  <Text
                    style={{
                      ...styles.toDoText,
                      textDecorationLine: toDos[key].confirm
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {toDos[key].text}
                  </Text>
                ) : (
                  <TextInput
                    onSubmitEditing={EditToDo}
                    returnKeyType="done"
                    value={editText}
                    onChangeText={onChangeEditText}
                    placeholder={working ? "add Todo" : "add Travel"}
                    style={styles.editInput}
                  />
                )}

                <View style={styles.buttonView}>
                  <TouchableOpacity
                    onPress={() => {
                      changeEditKey(key);
                    }}
                  >
                    <Feather name="edit" size={18} color={theme.gray} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      deleteToDo(key);
                    }}
                  >
                    <Fontisto name="trash" size={18} color={theme.gray} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 20,
  },
  editInput: {
    flex: 2,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 16,
  },
});
