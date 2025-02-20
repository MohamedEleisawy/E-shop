import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../constants/url";

export default function Home({ navigation }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get(URL.FETCH_URL);
        setArticles(data || []);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des articles :",
          error.message
        );
      }
    };
    fetchArticles();
  }, []);

  const renderArticleItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("Details", { id: item._id })} // added onPress event for navigation
    >
      {item?.picture?.img && (
        <Image
          source={{ uri: `${URL.BASE_URL}${item.picture.img}` }}
          style={styles.articleImage}
        />
      )}
      <Text style={styles.articleTitle}>{item?.name || "Sans nom"}</Text>
      <Text style={styles.articleCategory}>
        {item?.category || "Non spécifié"}
      </Text>
      <Text style={styles.articlePrice}>
        {item?.price ? `${item.price} €` : "Prix inconnu"}
      </Text>
      <Text style={styles.articlePrice}>
        {item?.stock ? `${item.stock} en stocks` : "stock inconnu"}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Articles</Text>
      <Button title="Ajouter Article" onPress={() => navigation.navigate("AddArticle")} />
      <FlatList
        data={articles}
        keyExtractor={(item) => item?._id || Math.random().toString()}
        renderItem={renderArticleItem}
        numColumns={3} // changed to three columns
        contentContainerStyle={styles.articlesGrid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 20,
    backgroundColor: "#E5E5E5", // updated background for a softer look
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#444", // darker grey for improved contrast
  },
  articlesGrid: {
    alignItems: "center",
    paddingBottom: 50, // Évite que le dernier élément soit coupé
  },
  card: {
    width: "28%", // adjusted width for three columns
    backgroundColor: "#fff",
    borderRadius: 25, // increased border radius for smoother edges
    padding: 20, // slightly increased padding
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2, // refined shadow for a subtle depth
    shadowRadius: 10,
    elevation: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee", // subtle border for card definition
  },
  articleImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
  },
  articleTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  articleCategory: {
    fontSize: 18,
    color: "#777",
    marginBottom: 8,
    textAlign: "center",
  },
  articlePrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007BFF",
    textAlign: "center",
  },
  userInfo: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  loading: {
    fontSize: 18,
    color: '#666',
  },
});
