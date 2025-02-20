import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { URL } from '../constants/url' // changed to named import

export default function Details({ route, navigation }) { // updated to receive navigation params
  const { id } = route.params;
  const [article, setArticle] = useState(null);

const deleteUser=()=>{
    axios.delete(`${URL.DELETE_ARTICLE_URL}/${id}`)
    .then((res)=>{
        console.log("Article deleted successfully")
    })
    .catch((err)=>{
        console.log(err)
    })
}
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, status } = await axios.get(`${URL.FETCH_AERICLE_URL}/${id}`);
        if (status === 200) {
          console.log("SUCCES GET");
        }
        setArticle(data);
      } catch (error) {
        throw error.message;
      }
    }
    fetchArticle();
  }, [id]);

  if (!article) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail de l'article: {article.name} son id :{id}</Text>

      {article ? (
        <View style={styles.userInfo}>
          <Text style={styles.infoText}>Nom complet: {article.name}</Text>
          <Text style={styles.infoText}>categorie: {article.category}</Text>
          <Text style={styles.infoText}>marque: {article.brand}</Text>
          <Text style={styles.infoText}>contenu: {article.content}</Text>
          <Text style={styles.infoText}>stockage: {article.stock}</Text>
          <Text style={styles.infoText}>prix: {article.price}</Text>
          { article.picture && article.picture.img && (
            <Image 
              source={{  uri: `${URL.BASE_URL}${article.picture.img}`  }}
              style={styles.articleImage} 
            />
          )}
        </View>
      ) : (
        <Text style={styles.loading}>Chargement des infos utilisateur...</Text>
      )}
      <Button title="Supprimer" onPress={deleteUser} />
      <Button 
        title="Modifier l'article" 
        onPress={() => navigation.navigate("UpdateArticle", { id })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // new background
    padding: 30, // increased padding for better spacing
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a', // darker and bolder text color
    marginBottom: 20,
  },
})