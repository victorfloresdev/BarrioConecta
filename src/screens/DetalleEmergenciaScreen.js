import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert
} from 'react-native';
import { CivicIcon } from '../components/CivicIcon';
import { mockData } from '../mockData';
import apiService from '../services/api';

export const DetalleEmergenciaScreen = ({ route, navigation }) => {
  // Mapeo directo vía route.params
  const item = route.params?.item || mockData.emergencias[0];

  const [ayudaEnviada, setAyudaEnviada] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVolunteer = async () => {
    setLoading(true);
    const res = await apiService.responderEmergencia(item.id, 'Tengo este recurso y puedo apoyar.');
    setLoading(false);
    if (res.success) {
      setAyudaEnviada(true);
      Alert.alert(
        '¡Aviso Recibido!',
        'Tu disposición de ayuda ha sido comunicada a la cuadrilla de respuesta del Sector Bajo. El coordinador se pondrá en contacto contigo.',
        [{ text: 'Entendido' }]
      );
    }
  };

  const handleSMS = () => {
    const tel = item.coordinador?.telefono || '980112233';
    const body = encodeURIComponent(
      `[BarrioConecta - Emergencia ${item.codigo || 'VEC-048'}] Puedo abastecer: ${item.cantidad} en ${item.zona_aproximada}.`
    );
    const url = `sms:${tel}?body=${body}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Envío SMS', `Comunícate por SMS al número ${tel}`);
    });
  };

  const handleCallCoordinador = () => {
    const tel = item.coordinador?.telefono || '980112233';
    Linking.openURL(`tel:${tel}`);
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
        <Text className="text-sm font-bold text-gray-900">Detalle De Emergencia</Text>
        <TouchableOpacity
          onPress={handleSMS}
          className="bg-red-700 active:bg-red-800 px-3 py-1.5 rounded-lg flex-row items-center gap-1"
        >
          <CivicIcon name="sms" size={14} color="#ffffff" />
          <Text className="text-xs font-bold text-white">SMS</Text>
        </TouchableOpacity>
      </View>

      {/* Banner Institucional No Oficial de Emergencia (Ley SINAGERD) */}
      <View className="bg-gray-900 px-4 py-2">
        <Text className="text-[11px] text-gray-200 text-center leading-tight">
          <Text className="font-bold text-red-400">⚠️ Reporte vecinal no oficial. </Text>
          Emergencias reales: 105 (Policía) • 116 (Bomberos) • 115 (INDECI) • 106 (SAMU)
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-3" showsVerticalScrollIndicator={false}>
        {/* Banner de Estado Inmediato y Tags */}
        <View className="flex-row justify-between items-center mb-2 flex-wrap">
          <View className="flex-row items-center gap-1.5">
            <View className="bg-red-700 px-2.5 py-1 rounded-lg">
              <Text className="text-xs font-bold text-white tracking-wider uppercase">
                ALTA URGENCIA
              </Text>
            </View>
            <View className="bg-gray-200 px-2 py-1 rounded-lg">
              <Text className="text-xs font-bold text-gray-700 uppercase">
                CÓD: {item.codigo || 'VEC-048'}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-1">
            <CivicIcon name="schedule" size={13} color="#6e7b6c" />
            <Text className="text-xs text-gray-500 font-medium">
              {item.tiempo_relativo || 'HACE 2 HORAS'}
            </Text>
          </View>
        </View>

        {/* Título y Descripción */}
        <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center gap-2 mb-2">
            <CivicIcon name="water-drop" size={24} color="#b61722" />
            <Text className="text-xl font-bold text-gray-900 flex-1 leading-snug">
              {item.titulo}
            </Text>
          </View>
          <Text className="text-sm text-gray-700 leading-relaxed bg-gray-50 border border-gray-100 p-3 rounded-xl mb-3">
            {item.descripcion}
          </Text>

          {/* Datos Críticos en Pares */}
          <View className="flex-row gap-2">
            <View className="flex-1 bg-gray-50 border border-gray-100 p-3 rounded-xl">
              <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Personas en riesgo
              </Text>
              <Text className="text-xs font-bold text-gray-900 mt-0.5">
                {item.personas_en_riesgo || '11 personas (3 familias)'}
              </Text>
            </View>
            <View className="flex-1 bg-red-50/60 border border-red-100 p-3 rounded-xl">
              <Text className="text-[10px] font-bold text-red-700 uppercase tracking-wider">
                Prioridad
              </Text>
              <Text className="text-xs font-bold text-red-800 mt-0.5">
                {item.prioridad_motivo || 'Corte general'}
              </Text>
            </View>
          </View>
        </View>

        {/* Ubicación y Radio de Seguridad Ciudadana */}
        <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-1">
            <View className="flex-row items-center gap-1">
              <CivicIcon name="location-on" size={18} color="#b61722" />
              <Text className="text-base font-bold text-gray-900">
                {item.zona_aproximada}
              </Text>
            </View>
            <View className="bg-gray-100 px-2 py-0.5 rounded">
              <Text className="text-xs text-gray-600 font-semibold">
                a {item.distancia_km} km de ti
              </Text>
            </View>
          </View>
          <Text className="text-xs text-gray-600 mb-3">
            Punto de referencia: {item.referencia_ubicacion || 'Capilla San Pedro'}
          </Text>

          {/* Mapa Visual Simulado */}
          <View className="relative w-full h-40 rounded-xl overflow-hidden bg-red-50/80 border border-red-100 items-center justify-center">
            <View className="w-32 h-32 rounded-full bg-red-500/15 items-center justify-center">
              <View className="w-16 h-16 rounded-full bg-red-500/25 items-center justify-center">
                <View className="w-8 h-8 rounded-full bg-red-700 items-center justify-center shadow-md">
                  <CivicIcon name="water-drop" size={16} color="#ffffff" />
                </View>
              </View>
            </View>
            <View className="absolute bottom-2 bg-white/95 px-3 py-1 rounded-full border border-gray-200">
              <Text className="text-[11px] font-semibold text-gray-800">
                🛡️ Radio aproximado por seguridad ciudadana
              </Text>
            </View>
          </View>
        </View>

        {/* Coordinador Vecinal */}
        <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-28 flex-row items-center justify-between shadow-sm">
          <View className="flex-row items-center gap-3 flex-1 pr-2">
            <View className="w-10 h-10 rounded-full bg-sky-700 items-center justify-center">
              <CivicIcon name="support-agent" size={20} color="#ffffff" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-900">
                Coordinador: {item.coordinador?.nombre || 'Carlos P.'}
              </Text>
              <Text className="text-xs text-gray-500 font-medium">
                {item.coordinador?.cuadrilla || 'Cuadrilla VeciRed Sector 4'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleCallCoordinador}
            className="bg-gray-100 border border-gray-300 px-3 py-2 rounded-xl flex-row items-center gap-1"
          >
            <CivicIcon name="call" size={15} color="#006b2c" />
            <Text className="text-xs font-bold text-gray-900">Llamar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Pie de Acción Fijo */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-gray-200 px-4 py-3">
        <TouchableOpacity
          onPress={handleVolunteer}
          disabled={loading || ayudaEnviada}
          className={`w-full py-4 rounded-xl flex-row items-center justify-center gap-2 shadow-sm ${
            ayudaEnviada ? 'bg-green-700' : 'bg-red-700 active:bg-red-800'
          }`}
        >
          <CivicIcon
            name={ayudaEnviada ? 'check-circle' : 'front-hand'}
            size={18}
            color="#ffffff"
          />
          <Text className="text-white font-bold text-sm">
            {ayudaEnviada
              ? '¡Aviso enviado! Coordinador contactándote...'
              : loading
              ? 'Enviando aviso...'
              : 'Tengo este recurso / Iré a ayudar'}
          </Text>
        </TouchableOpacity>
        <Text className="text-[11px] text-gray-500 text-center mt-1.5">
          Se notificará automáticamente a la red barrial y a la brigada en camino.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DetalleEmergenciaScreen;
