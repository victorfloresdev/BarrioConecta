import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  RefreshControl
} from 'react-native';
import { CivicIcon } from '../components/CivicIcon';
import apiService from '../services/api';

export const EconomiaLocalScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('servicios'); // 'servicios' | 'productos' | 'trueques'
  const [activeFilter, setActiveFilter] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Carga de datos mediante el backend simulado
  const cargarDatos = async () => {
    setLoading(true);
    const data = await apiService.getEconomiaLocal({
      tab: activeTab,
      categoria: activeFilter === 'todos' ? null : activeFilter,
      busqueda
    });
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarDatos();
  }, [activeTab, activeFilter, busqueda]);

  // Manejar el Visto Bueno Vecinal en tiempo real
  const handleVistoBueno = async (id) => {
    const res = await apiService.toggleVistoBueno(id);
    if (res.success) {
      setItems(prev => prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            vistos_buenos: res.vistos_buenos,
            visto_bueno_activo: res.activo
          };
        }
        return p;
      }));
    }
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('DetalleEconomiaLocal', { item })}
      className="bg-white rounded-2xl p-4 mb-3.5 border border-gray-200 shadow-sm"
    >
      {/* Top Header Card */}
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-xs font-bold tracking-wider uppercase text-gray-500">
          {item.categoria_label || item.categoria}
        </Text>
        <View className="flex-row items-center gap-1 bg-green-50 px-2.5 py-0.5 rounded-md">
          <CivicIcon name="schedule" size={13} color="#006b2c" />
          <Text className="text-xs font-semibold text-green-700">
            {item.disponibilidad || 'Disponible hoy'}
          </Text>
        </View>
      </View>

      {/* Título y Metadatos */}
      <Text className="text-base font-bold text-gray-900 leading-snug mb-1">
        {item.titulo}
      </Text>
      <View className="flex-row items-center gap-2 mb-3">
        <View className="flex-row items-center gap-0.5">
          <CivicIcon name="location-on" size={15} color="#006b2c" />
          <Text className="text-xs text-gray-600 font-medium">
            A {item.distancia_km} km
          </Text>
        </View>
        <Text className="text-gray-300">•</Text>
        <Text className="text-xs font-bold text-gray-900">
          {item.precio_tipo === 'a_convenir'
            ? 'Precio a convenir'
            : item.precio_monto ? `S/ ${item.precio_monto.toFixed(2)}` : 'Sin dinero / Trueque'}
        </Text>
      </View>

      {/* Foto / Muestra del Trabajo */}
      {item.imagen && (
        <View className="w-full h-32 rounded-xl overflow-hidden bg-gray-100 mb-3">
          <Image
            source={{ uri: item.imagen }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      )}

      {/* Separador Tonal */}
      <View className="w-full h-[1px] bg-gray-100 mb-3" />

      {/* Footer de Tarjeta con Sello de Confianza y Visto Bueno */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-2">
          <Text className="text-sm font-bold text-gray-900" numberOfLines={1}>
            {item.vendedor.nombre_publico}
          </Text>
          <View className="flex-row items-center gap-1 mt-0.5 bg-gray-100 px-2 py-0.5 rounded-md self-start">
            <CivicIcon name="handshake" size={12} color="#006b2c" />
            <Text className="text-[11px] font-semibold text-green-800" numberOfLines={1}>
              Avalado por: {item.vendedor.sello_avalador}
            </Text>
          </View>
        </View>

        {/* Botón interactivo de Visto Bueno */}
        <TouchableOpacity
          onPress={() => handleVistoBueno(item.id)}
          className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg border ${
            item.visto_bueno_activo
              ? 'bg-green-100 border-green-600'
              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
          }`}
        >
          <CivicIcon
            name="thumb-up"
            size={16}
            color={item.visto_bueno_activo ? '#006b2c' : '#6e7b6c'}
          />
          <Text className={`text-xs font-bold ${item.visto_bueno_activo ? 'text-green-800' : 'text-gray-700'}`}>
            {item.vistos_buenos}
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
          <CivicIcon name="storefront" size={24} color="#006b2c" />
          <Text className="text-lg font-bold text-gray-900">Inicio Comunitario</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 items-center justify-center rounded-full bg-gray-100"
          >
            <CivicIcon name="search" size={20} color="#3e4a3d" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Perfil')}
            className="w-8 h-8 rounded-full bg-green-700 items-center justify-center"
          >
            <CivicIcon name="person" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de Búsqueda Desplegable */}
      {searchOpen && (
        <View className="px-4 py-2 bg-white border-b border-gray-200">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2">
            <CivicIcon name="search" size={18} color="#6e7b6c" />
            <TextInput
              value={busqueda}
              onChangeText={setBusqueda}
              placeholder="Buscar oficios, gasfitero, pastelitos..."
              className="flex-1 ml-2 text-sm text-gray-900"
              autoFocus
            />
            {busqueda.length > 0 && (
              <TouchableOpacity onPress={() => setBusqueda('')}>
                <CivicIcon name="close" size={16} color="#6e7b6c" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Main Container */}
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
            {/* Título de Sección y Contador de Activos */}
            <View className="flex-row items-baseline justify-between mb-1">
              <View>
                <Text className="text-2xl font-bold text-gray-900">Economía Local</Text>
                <Text className="text-xs text-gray-500">
                  Sector 4, Piura • Conectando vecinos y oficios
                </Text>
              </View>
              <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100">
                <View className="w-2 h-2 rounded-full bg-green-700" />
                <Text className="text-xs font-bold text-green-800">
                  {items.length} activos
                </Text>
              </View>
            </View>

            {/* Segmented Tabs (Servicios | Productos | Trueques) */}
            <View className="flex-row gap-6 mt-3 border-b border-gray-200 pb-2">
              {[
                { key: 'servicios', label: 'Servicios' },
                { key: 'productos', label: 'Productos' },
                { key: 'trueques', label: 'Trueques' }
              ].map(tab => (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  className="relative pb-1"
                >
                  <Text
                    className={`text-sm font-bold ${
                      activeTab === tab.key ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {tab.label}
                  </Text>
                  {activeTab === tab.key && (
                    <View className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-green-700 rounded-full" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Chips de filtro rápido */}
            <View className="flex-row gap-2 py-3 overflow-x-auto">
              {[
                { key: 'todos', label: 'Todos', icon: 'tune' },
                { key: 'gasfiteria', label: 'Gasfitería', icon: 'plumbing' },
                { key: 'electricidad', label: 'Electricidad', icon: 'bolt' },
                { key: 'alimentos', label: 'Alimentos', icon: 'restaurant' }
              ].map(chip => (
                <TouchableOpacity
                  key={chip.key}
                  onPress={() => setActiveFilter(chip.key)}
                  className={`flex-row items-center gap-1 px-3 py-1.5 rounded-full ${
                    activeFilter === chip.key
                      ? 'bg-green-700'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <CivicIcon
                    name={chip.icon}
                    size={14}
                    color={activeFilter === chip.key ? '#ffffff' : '#3e4a3d'}
                  />
                  <Text
                    className={`text-xs font-semibold ${
                      activeFilter === chip.key ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {chip.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
        ListFooterComponent={
          <View className="mt-2 p-4 rounded-2xl bg-green-50/70 border border-green-200/50 flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center">
              <CivicIcon name="store" size={20} color="#006b2c" />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-bold text-gray-900">
                ¿Eres un negocio del barrio?
              </Text>
              <Text className="text-xs text-gray-600 leading-tight">
                Avalar a vecinos emprendedores fortalece el comercio local.
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('PublicarPaso1')}>
              <Text className="text-xs font-bold text-green-700">Participar</Text>
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          !loading && (
            <View className="py-12 items-center text-center">
              <CivicIcon name="search-off" size={40} color="#bdcaba" />
              <Text className="text-sm font-semibold text-gray-600 mt-2">
                No hay publicaciones en esta categoría.
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('PublicarPaso1')}
                className="mt-3 px-4 py-2 bg-green-700 rounded-xl"
              >
                <Text className="text-xs font-bold text-white">Publicar el primero</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default EconomiaLocalScreen;
