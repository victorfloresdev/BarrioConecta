import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { CivicIcon } from '../components/CivicIcon';
import TutorialModal from '../components/TutorialModal';
import apiService from '../services/api';

export const PerfilScreen = ({ navigation }) => {
  const usuario = apiService.getUsuarioActual();
  const [tutorialVisible, setTutorialVisible] = useState(false);

  const handleCerrarSesion = () => {
    Alert.alert('Cerrar Sesión', '¿Deseas salir de tu cuenta vecinal?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', style: 'destructive', onPress: () => navigation.replace('Login') }
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header */}
      <View className="h-14 px-4 bg-white border-b border-gray-200 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center gap-1.5">
          <CivicIcon name="arrow-back" size={20} color="#141b2b" />
          <Text className="text-sm font-semibold text-gray-900">Volver</Text>
        </TouchableOpacity>
        <Text className="text-base font-bold text-gray-900">Mi Perfil Vecinal</Text>
        <View className="w-8" />
      </View>

      <ScrollView className="flex-1 px-5 py-4" showsVerticalScrollIndicator={false}>
        {/* Tarjeta de Identidad */}
        <View className="bg-white border border-gray-200 rounded-2xl p-5 mb-4 items-center shadow-sm">
          <View className="relative mb-3">
            <Image
              source={{
                uri: usuario.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80'
              }}
              className="w-20 h-20 rounded-full border-2 border-green-700 bg-gray-100"
            />
            <View className="absolute bottom-0 right-0 bg-green-700 w-6 h-6 rounded-full items-center justify-center border border-white">
              <CivicIcon name="check" size={14} color="#ffffff" />
            </View>
          </View>
          <Text className="text-xl font-bold text-gray-900 mb-0.5">
            {usuario.nombre}
          </Text>
          <Text className="text-xs font-semibold text-green-700 mb-1">
            {usuario.zona_residencia}
          </Text>
          <Text className="text-xs text-gray-500 mb-4">
            📞 +51 {usuario.telefono} • Miembro desde Nov 2026
          </Text>

          {/* Estadísticas Comunitarias */}
          <View className="flex-row w-full border-t border-gray-100 pt-3">
            <View className="flex-1 items-center border-r border-gray-100">
              <Text className="text-lg font-bold text-gray-900">
                {usuario.vistos_buenos_otorgados || 3}
              </Text>
              <Text className="text-[11px] text-gray-500">Vistos Buenos dados</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-lg font-bold text-green-700">100%</Text>
              <Text className="text-[11px] text-gray-500">Confianza Barrial</Text>
            </View>
          </View>
        </View>

        {/* Opciones y Configuración */}
        <View className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-4 shadow-sm">
          {/* Tutorial de la App */}
          <TouchableOpacity
            onPress={() => setTutorialVisible(true)}
            className="flex-row items-center justify-between p-4 border-b border-gray-100"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-xl bg-green-50 items-center justify-center">
                <CivicIcon name="play-circle-outline" size={20} color="#006b2c" />
              </View>
              <View>
                <Text className="text-sm font-bold text-gray-900">Tutorial de la Aplicación</Text>
                <Text className="text-xs text-gray-500">Guía interactiva y modo asistido</Text>
              </View>
            </View>
            <CivicIcon name="chevron-right" size={20} color="#6e7b6c" />
          </TouchableOpacity>

          {/* Red Sin Conexión / Offline */}
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Funcionamiento Offline',
                'BarrioConecta guarda en caché las publicaciones y encola las solicitudes cuando no tienes internet, sincronizándolas automáticamente al reconectarte.'
              )
            }
            className="flex-row items-center justify-between p-4 border-b border-gray-100"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-xl bg-sky-50 items-center justify-center">
                <CivicIcon name="wifi-off" size={18} color="#006194" />
              </View>
              <View>
                <Text className="text-sm font-bold text-gray-900">Modo Sin Internet</Text>
                <Text className="text-xs text-gray-500">Caché y cola de envío activa</Text>
              </View>
            </View>
            <CivicIcon name="chevron-right" size={20} color="#6e7b6c" />
          </TouchableOpacity>

          {/* Pacto de Confianza Barrial */}
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Pacto de Confianza Barrial',
                'Nuestra comunidad se basa en la honestidad vecinal, precios justos, favores sin dinero y auxilio solidario frente a desastres naturales.'
              )
            }
            className="flex-row items-center justify-between p-4"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-xl bg-amber-50 items-center justify-center">
                <CivicIcon name="handshake" size={18} color="#d97706" />
              </View>
              <View>
                <Text className="text-sm font-bold text-gray-900">Pacto de Confianza</Text>
                <Text className="text-xs text-gray-500">Normas y protección vecinal</Text>
              </View>
            </View>
            <CivicIcon name="chevron-right" size={20} color="#6e7b6c" />
          </TouchableOpacity>
        </View>

        {/* Cerrar Sesión */}
        <TouchableOpacity
          onPress={handleCerrarSesion}
          className="bg-white border border-red-200 py-3.5 rounded-xl items-center flex-row justify-center gap-2 mb-10"
        >
          <CivicIcon name="logout" size={18} color="#b61722" />
          <Text className="text-sm font-bold text-red-700">Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Tutorial */}
      <TutorialModal
        visible={tutorialVisible}
        onClose={() => setTutorialVisible(false)}
      />
    </SafeAreaView>
  );
};

export default PerfilScreen;
