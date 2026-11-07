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
      `¿Deseas llamar a ${entidad} al número ${numero}?`,
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
      className="bg-white rounded-2xl p-4 mb-3 border border-red-100 shadow-sm"
    >
      {/* Header de Tarjeta */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-1.5">
          <View className="bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
            <Text className="text-[11px] font-bold text-red-700 uppercase">
              Urgente
            </Text>
          </View>
          <Text className="text-[11px] font-semibold text-gray-400">
            {item.codigo || 'Recurso Crítico'}
          </Text>
        </View>
        <Text className="text-xs text-gray-500 font-medium">
          {item.tiempo_relativo || 'Hace 2 horas'}
        </Text>
      </View>

      {/* Título de la Necesidad */}
      <Text className="text-base font-bold text-gray-900 leading-snug mb-1">
        {item.titulo}
      </Text>
      <Text className="text-xs text-gray-600 leading-relaxed mb-3" numberOfLines={2}>
        {item.descripcion}
      </Text>

      {/* Datos Clave: Cantidad y Sector */}
      <View className="bg-gray-50 rounded-xl p-2.5 flex-row justify-between items-center mb-3">
        <View className="flex-row items-center gap-1.5 flex-1 pr-2">
          <CivicIcon name="water-drop" size={15} color="#b61722" />
          <Text className="text-xs font-bold text-gray-800" numberOfLines={1}>
            {item.cantidad}
          </Text>
        </View>
        <View className="flex-row items-center gap-1">
          <CivicIcon name="location-on" size={13} color="#6e7b6c" />
          <Text className="text-xs text-gray-500 font-medium">
            {item.zona_aproximada} • {item.distancia_km} km
          </Text>
        </View>
      </View>

      {/* Footer con Botón Directo */}
      <View className="flex-row items-center justify-between pt-1 border-t border-gray-100">
        <Text className="text-[11px] text-gray-500 font-medium flex-1 pr-2" numberOfLines={1}>
          Coordinación: {item.coordinador?.nombre || 'Cuadrilla Vecinal'}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('DetalleEmergencia', { item })}
          className="bg-red-700 active:bg-red-800 px-3 py-1.5 rounded-lg flex-row items-center gap-1"
        >
          <CivicIcon name="front-hand" size={13} color="#ffffff" />
          <Text className="text-xs font-bold text-white">Puedo apoyar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Top Header */}
      <View className="px-4 py-3 bg-white border-b border-gray-200 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 rounded-lg bg-red-100 items-center justify-center">
            <CivicIcon name="local-fire-department" size={20} color="#b61722" />
          </View>
          <View>
            <Text className="text-[10px] font-bold text-red-700 uppercase tracking-wider">
              Barrio Resiliente
            </Text>
            <Text className="text-base font-bold text-gray-900 leading-tight">
              Tablero de Emergencia
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('PublicarEmergencia')}
            className="bg-red-700 px-2.5 py-1.5 rounded-lg flex-row items-center gap-1"
          >
            <CivicIcon name="add" size={15} color="#ffffff" />
            <Text className="text-xs font-bold text-white">Reportar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Perfil')}
            className="w-8 h-8 rounded-full bg-green-700 items-center justify-center"
          >
            <CivicIcon name="person" size={17} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner Sutil de Alerta */}
      <View className="bg-red-50 border-b border-red-200 px-4 py-2 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2 flex-1 pr-2">
          <CivicIcon name="warning" size={16} color="#b61722" />
          <Text className="text-xs font-semibold text-red-800" numberOfLines={1}>
            Alerta Activa: Inundaciones en Sector Bajo
          </Text>
        </View>
        <TouchableOpacity onPress={() => setModalDirectorio(true)}>
          <Text className="text-xs font-bold text-red-700 underline">Puntos de Acopio</Text>
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
            {/* Título de Sección */}
            <Text className="text-xl font-bold text-gray-900 mb-0.5">
              Auxilio y Recursos Críticos
            </Text>
            <Text className="text-xs text-gray-500 mb-3">
              Coordinación vecinal de suministros ante situaciones críticas.
            </Text>

            {/* Botonera SOS Limpia y Compacta */}
            <View className="mb-3">
              <Text className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Llamadas Oficiales de Auxilio Inmediato
              </Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => handleCallSOS('105', 'Policía Nacional')}
                  className="flex-1 bg-white border border-gray-200 py-2.5 px-2 rounded-xl flex-row items-center justify-center gap-1.5 shadow-sm"
                >
                  <CivicIcon name="local-police" size={16} color="#b61722" />
                  <Text className="text-xs font-bold text-gray-900">105 Policía</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleCallSOS('116', 'Bomberos')}
                  className="flex-1 bg-white border border-gray-200 py-2.5 px-2 rounded-xl flex-row items-center justify-center gap-1.5 shadow-sm"
                >
                  <CivicIcon name="fire-truck" size={16} color="#b61722" />
                  <Text className="text-xs font-bold text-gray-900">116 Bomberos</Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row gap-2 mt-2">
                <TouchableOpacity
                  onPress={() => handleCallSOS('115', 'Defensa Civil')}
                  className="flex-1 bg-white border border-gray-200 py-2.5 px-2 rounded-xl flex-row items-center justify-center gap-1.5 shadow-sm"
                >
                  <CivicIcon name="campaign" size={16} color="#b61722" />
                  <Text className="text-xs font-bold text-gray-900">115 Defensa Civil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleCallSOS('106', 'SAMU')}
                  className="flex-1 bg-white border border-gray-200 py-2.5 px-2 rounded-xl flex-row items-center justify-center gap-1.5 shadow-sm"
                >
                  <CivicIcon name="medical-services" size={16} color="#b61722" />
                  <Text className="text-xs font-bold text-gray-900">106 SAMU</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Buscador de Recursos */}
            <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-3 py-2 mb-2.5">
              <CivicIcon name="search" size={18} color="#6e7b6c" />
              <TextInput
                value={busqueda}
                onChangeText={setBusqueda}
                placeholder="Buscar agua, alimentos, palas..."
                className="flex-1 ml-2 text-xs text-gray-900"
              />
              {busqueda.length > 0 && (
                <TouchableOpacity onPress={() => setBusqueda('')}>
                  <CivicIcon name="close" size={15} color="#6e7b6c" />
                </TouchableOpacity>
              )}
            </View>

            {/* Chips de Recursos Críticos */}
            <View className="flex-row gap-2 py-1 overflow-x-auto">
              {[
                { key: 'todos', label: 'Todos' },
                { key: 'balde_bidon', label: 'Agua y bidones' },
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
              <CivicIcon name="check-circle" size={40} color="#006b2c" />
              <Text className="text-sm font-semibold text-gray-700 mt-2">
                No hay necesidades críticas activas en esta categoría.
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('PublicarEmergencia')}
                className="mt-3 px-4 py-2 bg-red-700 rounded-xl"
              >
                <Text className="text-xs font-bold text-white">Reportar necesidad</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />

      {/* Modal Directorio de Apoyo */}
      <Modal visible={modalDirectorio} transparent animationType="slide">
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl p-5 border-t border-gray-200 max-h-[85%]">
            <View className="flex-row justify-between items-center mb-3">
              <View>
                <Text className="text-base font-bold text-gray-900">
                  Puntos de Apoyo Comunitario
                </Text>
                <Text className="text-xs text-gray-500">
                  Centros de acopio y ollas comunes habilitadas
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
                <View className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-2.5">
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
                      Llamar {d.telefono}
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
