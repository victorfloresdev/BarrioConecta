import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import { CivicIcon } from '../components/CivicIcon';

export const PublicarPaso1Screen = ({ navigation }) => {
  const [seleccionado, setSeleccionado] = useState(null);

  const opciones = [
    {
      tipo: 'comercio',
      titulo: 'Ofrecer un producto o servicio',
      subtitulo: 'Gasfitería, postres, electricidad, clases y más',
      icono: 'storefront',
      color: '#006b2c',
      ruta: 'PublicarComercio'
    },
    {
      tipo: 'solidaria',
      titulo: 'Solicitar ayuda vecinal',
      subtitulo: 'Movilidad escolar, préstamo de herramientas o apoyo',
      icono: 'volunteer-activism',
      color: '#006194',
      ruta: 'PublicarSolidaria'
    },
    {
      tipo: 'emergencia',
      titulo: 'Solicitud de emergencia',
      subtitulo: 'Agua potable, víveres o auxilio frente a siniestros',
      icono: 'warning',
      color: '#b61722',
      ruta: 'PublicarEmergencia'
    }
  ];

  const handleSelect = (opcion) => {
    setSeleccionado(opcion.tipo);
    navigation.navigate(opcion.ruta);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header Fijo */}
      <View className="h-14 px-4 bg-white border-b border-gray-200 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
          <CivicIcon name="close" size={24} color="#141b2b" />
        </TouchableOpacity>
        <Text className="text-sm font-bold text-gray-900">Paso 1 de 2</Text>
        <View className="w-8 h-8 rounded-full bg-green-700 items-center justify-center">
          <CivicIcon name="person" size={18} color="#ffffff" />
        </View>
      </View>

      {/* Barra de progreso al 50% */}
      <View className="w-full h-1 bg-gray-200">
        <View className="w-1/2 h-full bg-green-700" />
      </View>

      <ScrollView className="flex-1 px-5 py-5" showsVerticalScrollIndicator={false}>
        {/* Encabezado */}
        <View className="mb-6">
          <View className="self-start flex-row items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 mb-2">
            <View className="w-1.5 h-1.5 rounded-full bg-green-700" />
            <Text className="text-xs font-bold text-green-800">
              Paso 1 de 2 • Categoría
            </Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
            ¿Qué deseas publicar?
          </Text>
          <Text className="text-xs text-gray-500">
            Elige el tipo de publicación para conectar con tu comunidad.
          </Text>
        </View>

        {/* Las 3 Opciones Unificadas */}
        <View className="space-y-3">
          {opciones.map(opt => (
            <TouchableOpacity
              key={opt.tipo}
              activeOpacity={0.8}
              onPress={() => handleSelect(opt)}
              className={`w-full bg-white border rounded-2xl p-4 flex-row items-center justify-between mb-3 shadow-sm ${
                seleccionado === opt.tipo ? 'border-green-600 bg-green-50/40' : 'border-gray-200'
              }`}
            >
              <View className="flex-row items-center flex-1 pr-3">
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mr-3.5 border border-gray-100"
                  style={{ backgroundColor: `${opt.color}15` }}
                >
                  <CivicIcon name={opt.icono} size={22} color={opt.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-gray-900 mb-0.5">
                    {opt.titulo}
                  </Text>
                  <Text className="text-xs text-gray-500" numberOfLines={1}>
                    {opt.subtitulo}
                  </Text>
                </View>
              </View>
              <CivicIcon name="chevron-right" size={20} color="#6e7b6c" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bloque de Confianza Vecinal */}
        <View className="mt-8 p-4 rounded-2xl bg-gray-50 border border-gray-200">
          <View className="flex-row items-center gap-1.5 mb-1.5">
            <CivicIcon name="verified-user" size={17} color="#006b2c" />
            <Text className="text-xs font-bold text-gray-900">
              Entorno Comunitario Seguro
            </Text>
          </View>
          <Text className="text-xs text-gray-600 leading-relaxed mb-3">
            Publicación verificada para residentes. Tu dirección exacta nunca será revelada de forma pública en el mapa vecinal.
          </Text>

          <View className="flex-row items-center justify-between pt-2 border-t border-gray-200">
            <View className="flex-row items-center -space-x-2">
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80' }}
                className="w-7 h-7 rounded-full border-2 border-white"
              />
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' }}
                className="w-7 h-7 rounded-full border-2 border-white"
              />
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' }}
                className="w-7 h-7 rounded-full border-2 border-white"
              />
              <View className="w-7 h-7 rounded-full bg-green-100 border-2 border-white items-center justify-center">
                <Text className="text-[10px] font-bold text-green-800">+42</Text>
              </View>
            </View>
            <Text className="text-xs font-semibold text-gray-500">
              Barrio Confiable
            </Text>
          </View>
        </View>

        <View className="mt-6 flex-row items-center justify-center gap-1.5">
          <CivicIcon name="lock" size={14} color="#6e7b6c" />
          <Text className="text-xs text-gray-400 font-medium">
            Cifrado vecinal de punto a punto
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PublicarPaso1Screen;
