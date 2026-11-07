import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CivicIcon } from '../components/CivicIcon';

// Pantallas
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EconomiaLocalScreen from '../screens/EconomiaLocalScreen';
import DetalleEconomiaLocalScreen from '../screens/DetalleEconomiaLocalScreen';
import EconomiaSolidariaScreen from '../screens/EconomiaSolidariaScreen';
import DetalleSolidariaScreen from '../screens/DetalleSolidariaScreen';
import TableroEmergenciasScreen from '../screens/TableroEmergenciasScreen';
import DetalleEmergenciaScreen from '../screens/DetalleEmergenciaScreen';
import PublicarPaso1Screen from '../screens/PublicarPaso1Screen';
import PublicarPaso2Screen from '../screens/PublicarPaso2Screen';
import PublicarComercioScreen from '../screens/PublicarComercioScreen';
import PublicarSolidariaScreen from '../screens/PublicarSolidariaScreen';
import PublicarEmergenciaScreen from '../screens/PublicarEmergenciaScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Botón Central Personalizado de Publicación (+)
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    onPress={onPress}
    style={styles.customButtonContainer}
  >
    <View style={styles.customButton}>
      <CivicIcon name="add" size={28} color="#ffffff" />
    </View>
  </TouchableOpacity>
);

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#006b2c',
        tabBarInactiveTintColor: '#6e7b6c',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
          height: 64,
          paddingBottom: 8,
          paddingTop: 8
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600'
        }
      }}
    >
      <Tab.Screen
        name="EconomiaLocalTab"
        component={EconomiaLocalScreen}
        options={{
          tabBarLabel: 'Comercio',
          tabBarIcon: ({ color, size }) => (
            <CivicIcon name="storefront" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="EconomiaSolidariaTab"
        component={EconomiaSolidariaScreen}
        options={{
          tabBarLabel: 'Solidaridad',
          tabBarIcon: ({ color, size }) => (
            <CivicIcon name="volunteer-activism" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="PublicarTab"
        component={PublicarPaso1Screen}
        options={{
          tabBarLabel: '',
          tabBarButton: (props) => <CustomTabBarButton {...props} />
        }}
      />

      <Tab.Screen
        name="EmergenciasTab"
        component={TableroEmergenciasScreen}
        options={{
          tabBarLabel: 'Emergencia',
          tabBarActiveTintColor: '#b61722',
          tabBarIcon: ({ color, size }) => (
            <CivicIcon name="warning" size={size} color="#b61722" />
          )
        }}
      />

      <Tab.Screen
        name="PerfilTab"
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <CivicIcon name="account-circle" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="DetalleEconomiaLocal" component={DetalleEconomiaLocalScreen} />
        <Stack.Screen name="DetalleSolidaria" component={DetalleSolidariaScreen} />
        <Stack.Screen name="DetalleEmergencia" component={DetalleEmergenciaScreen} />
        <Stack.Screen name="PublicarPaso1" component={PublicarPaso1Screen} />
        <Stack.Screen name="PublicarPaso2" component={PublicarPaso2Screen} />
        <Stack.Screen name="PublicarComercio" component={PublicarComercioScreen} />
        <Stack.Screen name="PublicarSolidaria" component={PublicarSolidariaScreen} />
        <Stack.Screen name="PublicarEmergencia" component={PublicarEmergenciaScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  customButtonContainer: {
    top: -16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  customButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#006b2c',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#006b2c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6
  }
});
