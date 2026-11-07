import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  RefreshControl,
  Alert
} from 'react-native';
import { CivicIcon } from '../components/CivicIcon';
import apiService from '../services/api';

export const EconomiaSolidariaScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('necesito'); // 'necesito' | 'ofrezco'
  const [activeCategory, setActiveCategory] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarDatos = async () => {
    setLoading(true);
    const data = await apiService.getEconomiaSolidaria({
      tipoMuro: activeTab,
      categoria: activeCategory === 'todos' ? null : activeCategory,
      busqueda
    });
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarDatos();
  }, [activeTab, activeCategory, busqueda]);

  const handleVoiceSearch = () => {
    Alert.alert(
      'Búsqueda por Voz',
      'Dicta tu necesidad o favor. Esta función está optimizada para adultos mayores y accesibilidad rápida.',
      [
        { text: 'Buscar "Movilidad"', onPress: () => setBusqueda('Movilidad') },
        { text: 'Buscar "Herramientas"', onPress: () => setBusqueda('Herramientas') },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('DetalleSolidaria', { item })}
      className="bg-white rounded-2xl p-4 mb-3.5 border border-gray-200 shadow-sm"
    >
      {/* Top Tag & Time */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2">
          {item.urgencia === 'alta' && (
            <View className="flex-row items-center gap-0.5 bg-red-100 px-2 py-0.5 rounded-full">
              <CivicIcon name="bolt" size={13} color="#b61722" />
              <Text className="text-[10px] font-bold text-red-700 uppercase">
                URGENTE
              </Text>
            </View>
          )}
          <Text className="text-xs font-bold tracking-wider text-gray-500 uppercase">
            {item.categoria_favor}
          </Text>
        </View>

        <View className="flex-row items-center gap-1.5">
          <Text className="text-xs text-gray-500 font-medium">
            A {item.distancia_km} km
          </Text>
          <Text className="text-gray-300">•</Text>
          <CivicIcon name="history" size={13} color="#6e7b6c" />
          <Text className="text-xs text-gray-500 font-medium">
            {item.tiempo_relativo || 'Reciente'}
          </Text>
        </View>
      </View>

      {/* Título y Descripción */}
      <Text className="text-base font-bold text-gray-900 leading-snug mb-1">
        {item.titulo}
      </Text>
      <Text className="text-xs text-gray-600 leading-relaxed mb-3" numberOfLines={2}>
        {item.descripcion}
      </Text>

      {/* Punto de Encuentro Seguro */}
      {item.movilidad_segura?.punto_encuentro_publico && (
        <View className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 flex-row items-center gap-2 mb-3">
          <CivicIcon name="near-me" size={16} color="#006b2c" />
          <View>
            <Text className="text-[10px] font-semibold text-gray-400 uppercase">
              Punto de encuentro público
            </Text>
            <Text className="text-xs font-bold text-gray-900">
              {item.movilidad_segura.punto_encuentro_publico}
            </Text>
          </View>
        </View>
      )}

      {/* Separador */}
      <View className="w-full h-[1px] bg-gray-100 mb-3" />

      {/* Footer con Solicitante y Botón Puedo Ayudar */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2 flex-1 pr-2">
          <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
            <CivicIcon name="face" size={18} color="#3e4a3d" />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-bold text-gray-900" numberOfLines={1}>
              {item.usuario_publico?.nombre_publico}
            </Text>
            <View className="flex-row items-center gap-1">
              <CivicIcon name="verified" size={12} color="#006b2c" />
              <Text className="text-[10px] font-semibold text-green-700">
                Vecino verificado
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('DetalleSolidaria', { item })}
          className="flex-row items-center gap-1.5 px-3 py-2 rounded-xl bg-green-700 active:bg-green-800"
        >
          <CivicIcon name="volunteer-activism" size={15} color="#ffffff" />
          <Text className="text-xs font-bold text-white">
            {activeTab === 'necesito' ? 'Puedo Ayudar' : 'Ver Oferta'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Top Header */}
      <View className="px-4 py-3 bg-white/95 border-b border-gray-200 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <CivicIcon name="holiday-village" size={24} color="#006b2c" />
          <Text className="text-lg font-bold text-gray-900">Inicio Vecinal</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Perfil')}
          className="w-8 h-8 rounded-full bg-green-700 items-center justify-center"
        >
          <CivicIcon name="person" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 90 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={cargarDatos} colors={['#006b2c']} />
        }
        ListHeaderComponent={
          <View className="mb-3">
            {/* Modo y Activas */}
            <View className="flex-row justify-between items-center mb-1">
              <View className="bg-white border border-gray-200 px-3 py-1 rounded-full">
                <Text className="text-xs font-semibold text-gray-800">
                  Modo: Red Solidaria
                </Text>
              </View>
              <View className="flex-row items-center gap-1.5 bg-green-100 px-2.5 py-1 rounded-full">
                <View className="w-2 h-2 rounded-full bg-green-700" />
                <Text className="text-xs font-bold text-green-800">
                  {items.length} Activas
                </Text>
              </View>
            </View>

            {/* Título de Sección */}
            <Text className="text-2xl font-bold text-gray-900 mt-1">
              Muro de Apoyo Vecinal
            </Text>
            <Text className="text-xs text-gray-500 mb-3">
              Conecta necesidades reales con ayuda solidaria entre vecinos.
            </Text>

            {/* Segmented Tabs: Piden Ayuda vs Ofrecen Ayuda */}
            <View className="flex-row gap-6 border-b border-gray-200 pb-2 mb-3">
              <TouchableOpacity
                onPress={() => setActiveTab('necesito')}
                className="relative pb-1 flex-row items-center gap-1.5"
              >
                <Text
                  className={`text-sm font-bold ${
                    activeTab === 'necesito' ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  Piden Ayuda
                </Text>
                <View className="bg-gray-100 px-1.5 py-0.5 rounded-full">
                  <Text className="text-[10px] font-bold text-gray-600">
                    {activeTab === 'necesito' ? items.length : '2'}
                  </Text>
                </View>
                {activeTab === 'necesito' && (
                  <View className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-green-700 rounded-full" />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveTab('ofrezco')}
                className="relative pb-1 flex-row items-center gap-1.5"
              >
                <Text
                  className={`text-sm font-bold ${
                    activeTab === 'ofrezco' ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  Ofrecen Ayuda
                </Text>
                <View className="bg-gray-100 px-1.5 py-0.5 rounded-full">
                  <Text className="text-[10px] font-bold text-gray-600">
                    {activeTab === 'ofrezco' ? items.length : '2'}
                  </Text>
                </View>
                {activeTab === 'ofrezco' && (
                  <View className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-green-700 rounded-full" />
                )}
              </TouchableOpacity>
            </View>

            {/* Buscador con Micrófono para Adultos Mayores */}
            <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-3 py-2.5 mb-3">
              <CivicIcon name="search" size={20} color="#6e7b6c" />
              <TextInput
                value={busqueda}
                onChangeText={setBusqueda}
                placeholder="Buscar necesidades, herramientas o movilidad..."
                className="flex-1 ml-2 text-xs text-gray-900"
              />
              <TouchableOpacity onPress={handleVoiceSearch} className="p-1">
                <CivicIcon name="mic" size={20} color="#006b2c" />
              </TouchableOpacity>
            </View>

            {/* Subtítulo de Sector */}
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center gap-1">
                <CivicIcon name="location-on" size={15} color="#006b2c" />
                <Text className="text-xs text-gray-600">
                  Mostrando solicitudes en:{' '}
                  <Text className="font-bold text-gray-900">Sector 3, Piura</Text>
                </Text>
              </View>
            </View>

            {/* Chips de Categorías Solidarias */}
            <View className="flex-row gap-2 py-1 overflow-x-auto">
              {[
                { key: 'todos', label: 'Todos', icon: 'done' },
                { key: 'urgente', label: 'Urgentes', icon: 'priority-high' },
                { key: 'Movilidad', label: 'Movilidad', icon: 'directions-car' },
                { key: 'Herramientas', label: 'Herramientas', icon: 'build' },
                { key: 'Tiempo', label: 'Tiempo', icon: 'schedule' }
              ].map(chip => (
                <TouchableOpacity
                  key={chip.key}
                  onPress={() => setActiveCategory(chip.key)}
                  className={`flex-row items-center gap-1 px-3 py-1.5 rounded-full ${
                    activeCategory === chip.key
                      ? 'bg-green-700'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <CivicIcon
                    name={chip.icon}
                    size={14}
                    color={activeCategory === chip.key ? '#ffffff' : '#3e4a3d'}
                  />
                  <Text
                    className={`text-xs font-semibold ${
                      activeCategory === chip.key ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {chip.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
        ListEmptyComponent={
          !loading && (
            <View className="py-12 items-center text-center">
              <CivicIcon name="volunteer-activism" size={40} color="#bdcaba" />
              <Text className="text-sm font-semibold text-gray-600 mt-2">
                No hay solicitudes activas con este filtro.
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('PublicarPaso1')}
                className="mt-3 px-4 py-2 bg-green-700 rounded-xl"
              >
                <Text className="text-xs font-bold text-white">Publicar una solicitud</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default EconomiaSolidariaScreen;
