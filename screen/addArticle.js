import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { URL } from "../constants/url";

export default function AddArticle({ navigation }) {
    
  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    content: "",
    stock: "",
    price: "",
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = () => {
    axios.post(`${URL.ADD_ARTICLE_URL}`, form)
      .then((res) => {
        console.log("Article added", res.data);
        navigation.goBack();
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout :", err.response ? err.response.data : err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un article</Text>
      <TextInput placeholder="name" style={styles.input} value={form.name} onChangeText={(text) => handleChange("name", text)} />
      <TextInput placeholder="category" style={styles.input} value={form.category} onChangeText={(text) => handleChange("category", text)} />
      <TextInput placeholder="brand" style={styles.input} value={form.brand} onChangeText={(text) => handleChange("brand", text)} />
      <TextInput placeholder="content" style={styles.input} value={form.content} onChangeText={(text) => handleChange("content", text)} />
      <TextInput placeholder="stock" style={styles.input} value={form.stock} onChangeText={(text) => handleChange("stock", text)} />
      <TextInput placeholder="price" style={styles.input} value={form.price} onChangeText={(text) => handleChange("price", text)} />
      <Button title="Ajouter" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 10 },
});
