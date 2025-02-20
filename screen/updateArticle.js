import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../constants/url";

export default function UpdateArticle({ route, navigation }) {
  const { id } = route.params;
  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    content: "",
    stock: "",
    price: "",
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  useEffect(() => {
    axios.get(`${URL.FETCH_AERICLE_URL}/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = () => {
    axios.put(`${URL.BASE_URL}/api/article/update/${id}`, form)
      .then((res) => {
        console.log("Article updated", res.data);
        navigation.goBack();
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier l'article</Text>
      <TextInput placeholder="name" style={styles.input} value={form.name.toString()} onChangeText={(text) => handleChange("name", text)} />
      <TextInput placeholder="category" style={styles.input} value={form.category.toString()} onChangeText={(text) => handleChange("category", text)} />
      <TextInput placeholder="brand" style={styles.input} value={form.brand.toString()} onChangeText={(text) => handleChange("brand", text)} />
      <TextInput placeholder="content" style={styles.input} value={form.content.toString()} onChangeText={(text) => handleChange("content", text)} />
      <TextInput placeholder="stock" style={styles.input} value={form.stock.toString()} onChangeText={(text) => handleChange("stock", text)} />
      <TextInput placeholder="price" style={styles.input} value={form.price.toString()} onChangeText={(text) => handleChange("price", text)} />
      <Button title="Modifier" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 10 },
});
