import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
  Share
} from 'react-native';
import { CivicIcon } from '../components/CivicIcon';
import { mockData } from '../mockData';
import apiService from '../services/api';

export const DetalleEconomiaLocalScreen = ({ route, navigation }) => {
  // Mapeo directo de variables a través de route.params
  const item = route.params?.item || mockData.economia_local[0];

  const [vistosBuenos, setVistosBuenos] = useState(item.vistos_buenos || 12);
  const [recomendo, setRecomendo] = useState(item.visto_bueno_activo || false);
  const [siguiendo, setSiguiendo] = useState(false);

  const toggleRecomendacion = async () => {
    const res = await apiService.toggleVistoBueno(item.id);
    if (res.success) {
      setVistosBuenos(res.vistos_buenos);
      setRecomendo(res.activo);
    } else {
      setRecomendo(!recomendo);
      setVistosBuenos(recomendo ? vistosBuenos - 1 : vistosBuenos + 1);
    }
  };

  const handleWhatsApp = () => {
    const tel = item.vendedor?.telefono || '987654321';
    const mensaje = encodeURIComponent(
      `¡Hola ${item.vendedor.nombre_publico}! Vi tu publicación en BarrioConecta sobre "${item.titulo}" y me gustaría consultar disponibilidad.`
    );
    const url = `whatsapp://send?phone=51${tel}&text=${mensaje}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(
            'Contacto Directo',
            `Número de WhatsApp: +51 ${tel}\n\nMensaje precargado: "¡Hola ${item.vendedor.nombre_publico}! Vi tu publicación sobre ${item.titulo} en BarrioConecta..."`,
            [{ text: 'Entendido' }]
          );
        }
      })
      .catch(() => {
        Alert.alert('Contacto Directo', `Teléfono: +51 ${tel}`);
      });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Te recomiendo este servicio de nuestro barrio en BarrioConecta: "${item.titulo}" por ${item.vendedor.nombre_publico}. Avalado por ${item.vendedor.sello_avalador}.`
      });
    } catch (e) {
      // Ignorar si el usuario cancela
    }
  };

  const handleReport = () => {
    Alert.alert(
      'Reportar Incidencia',
      '¿Deseas reportar esta publicación al moderador barrial? Se revisará para mantener la seguridad comunitaria.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reportar',
          style: 'destructive',
          onPress: () =>
            Alert.alert(
              'Reporte Recibido',
              'El comité vecinal revisará el contenido en menos de 24 horas.'
            )
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header Fijo */}
      <View className="h-14 px-4 bg-white/90 border-b border-gray-200 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row items-center gap-1.5 py-1"
        >
          <CivicIcon name="arrow-back" size={20} color="#141b2b" />
          <Text className="text-sm font-semibold text-gray-900">Volver</Text>
        </TouchableOpacity>
        <Text className="text-sm font-bold text-gray-900">Detalle De Publicación</Text>
        <View className="flex-row items-center gap-1">
          <TouchableOpacity onPress={handleShare} className="p-2">
            <CivicIcon name="share" size={20} color="#3e4a3d" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReport} className="p-2">
            <CivicIcon name="flag" size={20} color="#b61722" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-3" showsVerticalScrollIndicator={false}>
        {/* Categoría y Metadata */}
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-1.5">
            <View className="w-2 h-2 rounded-full bg-green-700" />
            <Text className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {item.categoria_label || item.categoria} • Publicado hace 2 días
            </Text>
          </View>
          <View className="flex-row items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
            <CivicIcon name="verified" size={13} color="#006b2c" />
            <Text className="text-xs font-bold text-green-700">Verificado</Text>
          </View>
        </View>

        {/* Título Principal */}
        <Text className="text-2xl font-bold text-gray-900 leading-tight mb-2.5">
          {item.titulo}
        </Text>

        {/* Cápsula de Precio y Estado */}
        <View className="flex-row items-center gap-2 mb-4">
          <View className="flex-row items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
            <CivicIcon name="payments" size={16} color="#006b2c" />
            <Text className="text-xs font-semibold text-gray-600">Precio:</Text>
            <Text className="text-xs font-bold text-gray-900">
              {item.precio_tipo === 'a_convenir'
                ? 'A convenir'
                : item.precio_monto ? `S/ ${item.precio_monto.toFixed(2)}` : 'Sin costo'}
            </Text>
          </View>
          <View className="flex-row items-center gap-1 bg-green-50 px-2.5 py-1.5 rounded-lg">
            <CivicIcon name="schedule" size={14} color="#006b2c" />
            <Text className="text-xs font-semibold text-green-800">
              {item.disponibilidad || 'Atención hoy'}
            </Text>
          </View>
        </View>

        {/* Foto de Muestra con Etiqueta del Barrio */}
        <View className="relative w-full h-52 rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-200">
          <Image
            source={{
              uri:
                item.imagen ||
                'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80'
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute bottom-3 left-3 right-3 flex-row justify-between items-center bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg">
            <View className="flex-row items-center gap-1.5">
              <CivicIcon name="photo-camera" size={14} color="#ffffff" />
              <Text className="text-xs text-white font-medium">
                Trabajo reciente en Calle Los Naranjos
              </Text>
            </View>
            <Text className="text-xs text-white/80 font-bold">1 / 3</Text>
          </View>
        </View>

        {/* Detalle del Servicio */}
        <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm">
          <View className="flex-row items-center gap-2 mb-2">
            <CivicIcon name="build-circle" size={20} color="#006b2c" />
            <Text className="text-sm font-bold text-gray-900">Detalle del servicio</Text>
          </View>
          <Text className="text-sm text-gray-700 leading-relaxed mb-3">
            {item.descripcion}
          </Text>

          {/* Micro Perks */}
          <View className="flex-row gap-2">
            <View className="flex-1 flex-row items-center gap-1.5 bg-gray-50 border border-gray-200 px-2.5 py-2 rounded-xl">
              <CivicIcon name="check-circle" size={15} color="#006b2c" />
              <Text className="text-xs font-semibold text-gray-800">Sin cobro traslado</Text>
            </View>
            <View className="flex-1 flex-row items-center gap-1.5 bg-gray-50 border border-gray-200 px-2.5 py-2 rounded-xl">
              <CivicIcon name="handshake" size={15} color="#006b2c" />
              <Text className="text-xs font-semibold text-gray-800">Garantía 30 días</Text>
            </View>
          </View>
        </View>

        {/* Tarjeta del Vendedor y Respaldo Comunitario */}
        <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-200 shadow-sm">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-3">
              <View className="relative">
                <Image
                  source={{
                    uri:
                      item.vendedor?.avatar ||
                      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80'
                  }}
                  className="w-12 h-12 rounded-full bg-gray-100"
                />
                <View className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-700 items-center justify-center">
                  <CivicIcon name="check" size={11} color="#ffffff" />
                </View>
              </View>
              <View>
                <Text className="text-base font-bold text-gray-900">
                  {item.vendedor.nombre_publico}
                </Text>
                <View className="flex-row items-center gap-1">
                  <CivicIcon name="near-me" size={13} color="#006194" />
                  <Text className="text-xs text-gray-500 font-medium">
                    {item.vendedor.zona_aproximada} (a {item.distancia_km} km)
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setSiguiendo(!siguiendo)}
              className={`px-3 py-1.5 rounded-lg border ${
                siguiendo ? 'bg-green-100 border-green-600' : 'bg-gray-100 border-gray-200'
              }`}
            >
              <Text className="text-xs font-bold text-gray-800">
                {siguiendo ? 'Siguiendo' : 'Seguir'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sello de Avalador */}
          <View className="bg-green-50/70 border border-green-200/50 rounded-xl p-3 flex-row items-start gap-2.5 mb-3">
            <View className="w-8 h-8 rounded-full bg-green-100 items-center justify-center shrink-0">
              <CivicIcon name="verified-user" size={16} color="#006b2c" />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-bold text-green-900">
                Avalado por: {item.vendedor.sello_avalador}
              </Text>
              <Text className="text-[11px] text-gray-600 mt-0.5 leading-tight">
                {item.vendedor.descripcion_avalador ||
                  'Comercio verificado en la zona que certifica la idoneidad del vecino.'}
              </Text>
            </View>
          </View>

          {/* Contador de Vistos Buenos y Acción de Recomendar */}
          <View className="flex-row items-center justify-between pt-2 border-t border-gray-100">
            <View className="flex-row items-center gap-1.5">
              <CivicIcon name="thumb-up" size={16} color="#006b2c" />
              <Text className="text-xs font-bold text-gray-700">
                {vistosBuenos} vecinos recomiendan esto
              </Text>
            </View>
            <TouchableOpacity
              onPress={toggleRecomendacion}
              className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
                recomendo ? 'bg-green-100 border-green-700' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <CivicIcon
                name="thumb-up"
                size={14}
                color={recomendo ? '#006b2c' : '#6e7b6c'}
              />
              <Text className="text-xs font-bold text-gray-800">
                {recomendo ? 'Recomendado' : 'Recomendar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ubicación Aproximada con Protección de Privacidad */}
        <View className="bg-white rounded-2xl p-4 mb-24 border border-gray-200 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-sm font-bold text-gray-900">Ubicación aproximada</Text>
            <Text className="text-xs font-semibold text-sky-700">Privacidad vecinal activa</Text>
          </View>
          <View className="relative w-full h-36 rounded-xl overflow-hidden bg-sky-50 border border-sky-100 items-center justify-center">
            {/* Círculo de Cobertura */}
            <View className="w-28 h-28 rounded-full bg-green-500/20 items-center justify-center">
              <View className="w-16 h-16 rounded-full bg-green-500/30 items-center justify-center">
                <View className="w-8 h-8 rounded-full bg-green-700 items-center justify-center shadow-md">
                  <CivicIcon name="handyman" size={16} color="#ffffff" />
                </View>
              </View>
            </View>
            <View className="absolute bottom-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-gray-200">
              <Text className="text-[11px] font-semibold text-gray-800">
                Sector 2, Piura • Radio estimado de 800m
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Barra de Contacto Fija Inferior */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-gray-200 px-4 py-3 flex-row gap-3">
        <TouchableOpacity
          onPress={handleWhatsApp}
          className="flex-1 bg-green-700 active:bg-green-800 py-3.5 rounded-xl flex-row items-center justify-center gap-2 shadow-sm"
        >
          <CivicIcon name="chat" size={18} color="#ffffff" />
          <Text className="text-white font-bold text-sm">Contactar por WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetalleEconomiaLocalScreen;
