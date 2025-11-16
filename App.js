import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Keyboard} from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTask = {
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setText("");
    Keyboard.dismiss();
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const renderTask = ({ item }) => (
    <TouchableOpacity
      onPress={() => toggleTask(item.id)}
      style={[
        styles.taskContainer,
        item.completed && styles.taskCompletedContainer,
      ]}
      activeOpacity={0.7}
    >
      <Text
        style={[styles.taskText, item.completed && styles.taskTextCompleted]}
      >
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Todo List</Text>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Add a task..."
            value={text}
            onChangeText={setText}
            style={styles.input}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <TouchableOpacity
            onPress={addTask}
            style={styles.addButton}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Incomplete Tasks ({incompleteTasks.length})
          </Text>
          {incompleteTasks.length === 0 ? (
            <Text style={styles.emptyText}>No incomplete tasks — add one!</Text>
          ) : (
            <FlatList
              data={incompleteTasks}
              keyExtractor={(i) => i.id}
              renderItem={renderTask}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Completed Tasks ({completedTasks.length})
          </Text>
          {completedTasks.length === 0 ? (
            <Text style={styles.emptyText}>No completed tasks yet.</Text>
          ) : (
            <FlatList
              data={completedTasks}
              keyExtractor={(i) => i.id}
              renderItem={renderTask}
            />
          )}
        </View>

        <View style={{ height: 24 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f7f7f8"
  },
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
  addButton: {
    marginLeft: 10,
    paddingHorizontal: 14,
    height: 44,
    backgroundColor: "#2e86de",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "600"
  },
  section: {
    marginTop: 8,
    flex: 1
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8
  },
  emptyText: {
    color: "#666",
    fontStyle: "italic"
  },
  taskContainer: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  taskCompletedContainer: {
    opacity: 0.5,
    backgroundColor: "#f2f4f8",
  },
  taskText: {
    fontSize: 16
  },
  taskTextCompleted: {
    textDecorationLine: "line-through"
  },
});
