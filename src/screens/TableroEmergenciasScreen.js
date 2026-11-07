import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Linking,
  RefreshControl,
  Modal,
  Alert
} from 'react-native';
import { CivicIcon } from '../components/CivicIcon';
import apiService from '../services/api';

export const TableroEmergenciasScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [categoria, setCategoria] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalDirectorio, setModalDirectorio] = useState(false);
  const [directorio, setDirectorio] = useState([]);

  const cargarEmergencias = async () => {
    setLoading(true);
    const data = await apiService.getEmergencias({
      categoria: categoria === 'todos' ? null : categoria,
      busqueda
    });
    setItems(data);
    const dir = await apiService.getDirectorioApoyo();
    setDirectorio(dir);
    setLoading(false);
  };

  useEffect(() => {
    cargarEmergencias();
  }, [categoria, busqueda]);

  const handleCallSOS = (numero, entidad) => {
    Alert.alert(
      `Llamada de Emergencia Oficial`,
      `¿Deseas marcar al ${numero} (${entidad})?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Llamar', onPress: () => Linking.openURL(`tel:${numero}`) }
      ]
    );
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('DetalleEmergencia', { item })}
      className="bg-white rounded-2xl p-4 mb-3.5 border border-red-200/80 shadow-sm"
    >
      {/* Top Tag & Time */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-1.5">
          <View className="bg-red-700 px-2 py-0.5 rounded-md">
            <Text className="text-[10px] font-bold text-white uppercase tracking-wider">
              ALTA URGENCIA
            </Text>
          </View>
          <Text className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            {item.codigo || 'RECURSO CRÍTICO'}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <CivicIcon name="schedule" size={13} color="#6e7b6c" />
          <Text className="text-xs text-gray-500 font-medium">
            {item.tiempo_relativo || 'Hace 2 horas'}
          </Text>
        </View>
      </View>

      {/* Título de la Necesidad */}
      <Text className="text-base font-bold text-gray-900 leading-snug mb-1">
        {item.titulo}
      </Text>
      <Text className="text-xs text-gray-600 leading-relaxed mb-3" numberOfLines={2}>
        {item.descripcion}
      </Text>

      {/* Grid de Personas y Ubicación */}
      <View className="bg-red-50/60 border border-red-100 rounded-xl p-2.5 flex-row justify-between items-center mb-3">
        <View className="flex-row items-center gap-1.5">
          <CivicIcon name="water-drop" size={16} color="#b61722" />
          <Text className="text-xs font-bold text-gray-900">
            {item.cantidad}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <CivicIcon name="location-on" size={14} color="#6e7b6c" />
          <Text className="text-xs text-gray-600 font-medium">
            {item.zona_aproximada} ({item.distancia_km} km)
          </Text>
        </View>
      </View>

      {/* Footer de Tarjeta con Coordinador y Botón Ayudar */}
      <View className="flex-row items-center justify-between pt-1 border-t border-gray-100">
        <View className="flex-1 pr-2">
          <Text className="text-[11px] font-semibold text-gray-500">
            Coordinador: {item.coordinador?.nombre || 'Cuadrilla Vecinal'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetalleEmergencia', { item })}
          className="bg-red-700 active:bg-red-800 px-3.5 py-1.5 rounded-lg flex-row items-center gap-1"
        >
          <CivicIcon name="front-hand" size={13} color="#ffffff" />
          <Text className="text-xs font-bold text-white">Tengo este recurso</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Top Header */}
      <View className="px-4 py-3 bg-white/95 border-b border-gray-200 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="w-9 h-9 rounded-xl bg-red-100 items-center justify-center">
            <CivicIcon name="local-fire-department" size={22} color="#b61722" />
          </View>
          <View>
            <Text className="text-[10px] font-bold text-red-700 uppercase tracking-wider">
              Barrio Resiliente
            </Text>
            <Text className="text-lg font-bold text-gray-900 leading-tight">
              Emergencia
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Perfil')}
          className="w-8 h-8 rounded-full bg-green-700 items-center justify-center"
        >
          <CivicIcon name="person" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Banner de Emergencia Crítica */}
      <View className="bg-red-100 border-b border-red-200 px-4 py-2 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2 flex-1 pr-2">
          <CivicIcon name="warning" size={18} color="#b61722" />
          <Text className="text-xs font-semibold text-red-800 leading-tight" numberOfLines={1}>
            Alerta Activa: Inundaciones en Sector Bajo
          </Text>
        </View>
        <TouchableOpacity onPress={() => setModalDirectorio(true)}>
          <Text className="text-xs font-bold text-red-700 underline">Directorio</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 90 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={cargarEmergencias} colors={['#b61722']} />
        }
        ListHeaderComponent={
          <View className="mb-3">
            {/* Título de Pantalla */}
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-2xl font-bold text-gray-900">
                Tablero Humanitario
              </Text>
              <TouchableOpacity
                onPress={() => setModalDirectorio(true)}
                className="bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-full flex-row items-center gap-1"
              >
                <CivicIcon name="folder-shared" size={13} color="#006194" />
                <Text className="text-[11px] font-bold text-sky-800">Puntos de Apoyo</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-xs text-gray-500 mb-3">
              Coordinación rápida de insumos y recursos de auxilio inmediato.
            </Text>

            {/* Cuadrícula 2x2 SOS Números Oficiales del Perú */}
            <View className="grid grid-cols-2 gap-2 mb-3">
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => handleCallSOS('105', 'Policía Nacional')}
                  className="flex-1 bg-white border border-gray-200 p-2.5 rounded-xl flex-row items-center justify-between shadow-sm"
                >
                  <View className="flex-row items-center gap-1.5">
                    <View className="w-7 h-7 rounded-full bg-red-100 items-center justify-center">
                      <CivicIcon name="local-police" size={15} color="#b61722" />
                    </View>
                    <Text className="text-xs font-bold text-gray-900">105 Policía</Text>
                  </View>
                  <Text className="text-[10px] font-bold text-red-700">SOS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleCallSOS('116', 'Bomberos')}
                  className="flex-1 bg-white border border-gray-200 p-2.5 rounded-xl flex-row items-center justify-between shadow-sm"
                >
                  <View className="flex-row items-center gap-1.5">
                    <View className="w-7 h-7 rounded-full bg-red-100 items-center justify-center">
                      <CivicIcon name="fire-truck" size={15} color="#b61722" />
                    </View>
                    <Text className="text-xs font-bold text-gray-900">116 Bomberos</Text>
                  </View>
                  <Text className="text-[10px] font-bold text-red-700">SOS</Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row gap-2 mt-2">
                <TouchableOpacity
                  onPress={() => handleCallSOS('115', 'Defensa Civil / INDECI')}
                  className="flex-1 bg-white border border-gray-200 p-2.5 rounded-xl flex-row items-center justify-between shadow-sm"
                >
                  <View className="flex-row items-center gap-1.5">
                    <View className="w-7 h-7 rounded-full bg-red-100 items-center justify-center">
                      <CivicIcon name="campaign" size={15} color="#b61722" />
                    </View>
                    <Text className="text-xs font-bold text-gray-900">115 Defensa Civil</Text>
                  </View>
                  <Text className="text-[10px] font-bold text-red-700">SOS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleCallSOS('106', 'SAMU')}
                  className="flex-1 bg-white border border-gray-200 p-2.5 rounded-xl flex-row items-center justify-between shadow-sm"
                >
                  <View className="flex-row items-center gap-1.5">
                    <View className="w-7 h-7 rounded-full bg-red-100 items-center justify-center">
                      <CivicIcon name="medical-services" size={15} color="#b61722" />
                    </View>
                    <Text className="text-xs font-bold text-gray-900">106 SAMU</Text>
                  </View>
                  <Text className="text-[10px] font-bold text-red-700">SOS</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Buscador de Recursos Críticos */}
            <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-3 py-2.5 mb-2.5">
              <CivicIcon name="search" size={20} color="#6e7b6c" />
              <TextInput
                value={busqueda}
                onChangeText={setBusqueda}
                placeholder="Buscar recursos críticos, agua, medicinas..."
                className="flex-1 ml-2 text-xs text-gray-900"
              />
            </View>

            {/* Fila de Estado: Actualizado */}
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center gap-1.5">
                <View className="w-2 h-2 rounded-full bg-red-700" />
                <Text className="text-xs text-gray-500 font-medium">
                  Actualizado hace 5 min
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <CivicIcon name="location-on" size={14} color="#6e7b6c" />
                <Text className="text-xs text-gray-600 font-semibold">Sector Bajo, Piura</Text>
              </View>
            </View>

            {/* Chips de Recursos */}
            <View className="flex-row gap-2 py-1 overflow-x-auto">
              {[
                { key: 'todos', label: 'Todos' },
                { key: 'balde_bidon', label: 'Agua / Bidones' },
                { key: 'alimentos', label: 'Alimentos' },
                { key: 'herramientas', label: 'Herramientas' }
              ].map(chip => (
                <TouchableOpacity
                  key={chip.key}
                  onPress={() => setCategoria(chip.key)}
                  className={`px-3 py-1.5 rounded-full ${
                    categoria === chip.key
                      ? 'bg-red-700'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      categoria === chip.key ? 'text-white' : 'text-gray-700'
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
              <CivicIcon name="check-circle" size={40} color="#7ffc97" />
              <Text className="text-sm font-semibold text-gray-700 mt-2">
                No hay necesidades urgentes registradas en esta categoría.
              </Text>
            </View>
          )
        }
      />

      {/* Modal Directorio de Apoyo */}
      <Modal visible={modalDirectorio} transparent animationType="slide">
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl p-5 border-t border-gray-200 max-h-[85%]">
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-lg font-bold text-gray-900">
                  Directorio de Apoyo Comunitario
                </Text>
                <Text className="text-xs text-gray-500">
                  Puntos de reunión, ollas comunes y abastecimiento
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalDirectorio(false)}>
                <CivicIcon name="close" size={22} color="#6e7b6c" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={directorio}
              keyExtractor={d => d.id}
              renderItem={({ item: d }) => (
                <View className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 mb-2.5">
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="text-sm font-bold text-gray-900 flex-1 pr-2">
                      {d.nombre}
                    </Text>
                    <View className="bg-green-100 px-2 py-0.5 rounded-full">
                      <Text className="text-[10px] font-bold text-green-800">{d.estado}</Text>
                    </View>
                  </View>
                  <Text className="text-xs text-gray-600 mb-1">📍 {d.direccion}</Text>
                  <Text className="text-xs text-gray-700 mb-2 font-medium">
                    📦 {d.recursos_disponibles}
                  </Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`tel:${d.telefono}`)}
                    className="flex-row items-center gap-1 bg-white border border-gray-300 self-start px-2.5 py-1 rounded-lg"
                  >
                    <CivicIcon name="call" size={13} color="#006b2c" />
                    <Text className="text-xs font-semibold text-gray-800">
                      Llamar ({d.telefono})
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TableroEmergenciasScreen;
