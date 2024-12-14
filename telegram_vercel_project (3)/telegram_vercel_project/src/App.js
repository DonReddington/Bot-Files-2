import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

const API_BASE_URL = "/api/telegram";

const App = () => {
    const [groups, setGroups] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        fetch(${API_BASE_URL})
            .then((response) => response.json())
            .then((data) => setGroups(data))
            .catch((error) => console.error("Error fetching groups:", error));
    }, []);

    const sendMessage = () => {
        if (!selectedGroup || !message) return;
        fetch(${API_BASE_URL}, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatId: selectedGroup.chatId, message }),
        })
            .then((response) => response.json())
            .then(() => {
                alert("Message sent successfully!");
                setMessage("");
            })
            .catch((error) => console.error("Error sending message:", error));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Telegram Dashboard</Text>
            <FlatList
                data={groups}
                keyExtractor={(item) => item.chatId.toString()}
                renderItem={({ item }) => (
                    <Text
                        style={[
                            styles.group,
                            item.chatId === selectedGroup?.chatId && styles.selectedGroup,
                        ]}
                        onPress={() => setSelectedGroup(item)}
                    >
                        {item.title}
                    </Text>
                )}
            />
            {selectedGroup && (
                <>
                    <Text style={styles.selectedTitle}>Selected Group: {selectedGroup.title}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your message"
                        value={message}
                        onChangeText={setMessage}
                    />
                    <Button title="Send Message" onPress={sendMessage} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    group: { padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
    selectedGroup: { backgroundColor: "#e0e0e0" },
    selectedTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
    input: { borderWidth: 1, borderColor: "#ddd", padding: 10, marginVertical: 10 },
});

export default App;