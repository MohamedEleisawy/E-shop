import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ArticleStack from './ArticleStack' // updated import path
// Création d'une instance de tab navigation (navigation par onglets)
const Tabs = createBottomTabNavigator()
// Cette fonction déclare le composant de navigation principal "AppNavigation"
export default function AppNavigation() {
    return (
        // Le composant de navigation global est enveloppé dans
        // "NavigationContainer".
        <NavigationContainer>
            {/* Configuration des onglets de navigation */}
            <Tabs.Navigator>
                {/*
Onglet "Home"  Utilise le composant "ArticleStack"
pour la navigation et cache la barre de navigation (header).
*/}
                <Tabs.Screen name='home' component={ArticleStack} options={{ headerShown: false }} />
            </Tabs.Navigator>
        </NavigationContainer>
    );
}