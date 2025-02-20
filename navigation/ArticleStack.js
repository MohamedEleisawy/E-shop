import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screen/home'
import Details from '../screen/details'
import AddArticle from '../screen/addArticle'
import UpdateArticle from '../screen/updateArticle'
// Import de la fonction de création de stack de navigation
// à partir de la bibliothèque React Navigation.
const Stack = createNativeStackNavigator();
// Cette fonction déclare le composant "ArticleStack"
// qui est un composant de navigation.
export default function ArticleStack() {
    return (
    // Utilisation de la composante de navigation Stack.Navigator
    // pour gérer la navigation entre les écrans.
    <Stack.Navigator>
    {/*
    Écran nommé "Home" qui affiche le composant "Home"
    lorsque la navigation atteint cet écran.
    */}
    <Stack.Screen name='List' component={Home} />
    {/*
    Écran nommé "Detail" qui affiche le composant "Detail"
    lorsque la navigation atteint cet écran.
    */}
    <Stack.Screen name='Details' component={Details} />
    <Stack.Screen name='AddArticle' component={AddArticle} />
    <Stack.Screen name='UpdateArticle' component={UpdateArticle} />
    </Stack.Navigator>
);
}