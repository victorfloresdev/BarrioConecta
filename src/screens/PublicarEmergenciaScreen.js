import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal
} from 'react-native';
import { CivicIcon } from '../components/CivicIcon';
import apiService from '../services/api';

export const PublicarEmergenciaScreen = ({ navigation }) => {
  const tiposEmergencia = [
    { key: 'balde_bidon', label: 'Agua y bidones', icon: 'water-drop' },
    { key: 'alimentos', label: 'Alimentos no perecibles', icon: 'restaurant' },
    { key: 'herramientas', label: 'Herramientas de drenaje', icon: 'build' },
    { key: 'abrigo', label: 'Abrigo y techo', icon: 'roofing' },
    { key: 'salud', label: 'Primeros auxilios', icon: 'medical-services' }
  ];

  const [tipoSeleccionado, setTipoSeleccionado] = useState(tiposEmergencia[0]);
  const [modalTipo, setModalTipo] = useState(false);
  const [titulo, setTitulo] = useState('Agua potable urgente para 2 familias');
  const [descripcion, setDescripcion] = useState(
    'Corte prolongado de suministro por lluvias. Se requiere agua limpia para hidratación de adultos mayores.'
  );
  const [cantidad, setCantidad] = useState('2 bidones de 20 litros');
  const [personasRiesgo, setPersonasRiesgo] = useState('4 adultos mayores y 2 menores');
  const [zonaReferencia, setZonaReferencia] = useState('Sector Bajo, Piura. Manzana D frente a la losa deportiva');
  const [loading, setLoading] = useState(false);

  const handlePublicar = async () => {
    if (!titulo.trim() || !descripcion.trim() || !cantidad.trim()) {
      Alert.alert('Campos requeridos', 'Por favor completa el título, descripción y cantidad requerida.');
      return;
    }

    setLoading(true);
    try {
      const res = await apiService.crearReporteEmergencia({
        tipo_necesidad: tipoSeleccionado.key,
        tipo_label: tipoSeleccionado.label,
        titulo,
        descripcion,
        cantidad,
        personas_en_riesgo: personasRiesgo,
        zona_aproximada: 'Sector Bajo, Piura',
        referencia_ubicacion: zonaReferencia
      });

      setLoading(false);
      if (res.success) {
        Alert.alert(
          'Reporte Registrado',
          'Tu solicitud de emergencia ha sido publicada en el tablero comunitario.',
          [
            {
              text: 'Ver en Emergencia',
              onPress: () => navigation.navigate('MainTabs', { screen: 'EmergenciasTab' })
            }
          ]
        );
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Error', 'No se pudo enviar el reporte de emergencia.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header Fijo */}
      <View className="h-14 px-4 bg-white border-b border-gray-200 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
          <CivicIcon name="arrow-back" size={22} color="#141b2b" />
        </TouchableOpacity>
        <Text className="text-sm font-bold text-gray-900">Paso 2 de 2</Text>
        <View className="w-8 h-8 rounded-full bg-red-700 items-center justify-center">
          <CivicIcon name="person" size={18} color="#ffffff" />
        </View>
      </View>

      {/* Barra de Progreso al 100% */}
      <View className="w-full h-1 bg-gray-200">
        <View className="w-full h-full bg-red-700" />
      </View>

      <ScrollView className="flex-1 px-5 py-4" showsVerticalScrollIndicator={false}>
        {/* Título */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            Solicitud de emergencia
          </Text>
          <Text className="text-xs text-gray-500">
            Reporta una necesidad crítica para organizar la ayuda vecinal inmediata.
          </Text>
        </View>

        {/* Tipo de Necesidad Crítica */}
        <View className="mb-4">
          <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Tipo de necesidad crítica
          </Text>
          <TouchableOpacity
            onPress={() => setModalTipo(true)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-lg bg-red-50 items-center justify-center">
                <CivicIcon name={tipoSeleccionado.icon} size={18} color="#b61722" />
              </View>
              <Text className="text-sm font-semibold text-gray-900">
                {tipoSeleccionado.label}
              </Text>
            </View>
            <CivicIcon name="expand-more" size={20} color="#6e7b6c" />
          </TouchableOpacity>
        </View>

        {/* Título de la Solicitud */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-1.5">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Título del reporte
            </Text>
            <Text className="text-xs text-gray-400">{titulo.length} de 60</Text>
          </View>
          <TextInput
            value={titulo}
            onChangeText={setTitulo}
            maxLength={60}
            placeholder="Ej. Agua potable urgente para 2 familias"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900"
          />
        </View>

        {/* Descripción de la Situación */}
        <View className="mb-4">
          <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Detalle de la situación
          </Text>
          <TextInput
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholder="Describe la urgencia y el estado de los afectados..."
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 min-h-[85px]"
          />
        </View>

        {/* Cantidad y Personas Afectadas */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Cantidad requerida
            </Text>
            <TextInput
              value={cantidad}
              onChangeText={setCantidad}
              placeholder="Ej. 2 bidones"
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900"
            />
          </View>

          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Personas en riesgo
            </Text>
            <TextInput
              value={personasRiesgo}
              onChangeText={setPersonasRiesgo}
              placeholder="Ej. 4 personas"
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900"
            />
          </View>
        </View>

        {/* Ubicación y Referencia */}
        <View className="mb-4">
          <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Zona exacta y punto de referencia
          </Text>
          <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-3.5 py-3">
            <CivicIcon name="location-on" size={18} color="#b61722" />
            <TextInput
              value={zonaReferencia}
              onChangeText={setZonaReferencia}
              placeholder="Ej. Manzana D frente a la losa deportiva"
              className="flex-1 ml-2 text-sm text-gray-900"
            />
          </View>
        </View>

        {/* Nivel de Prioridad Fijo */}
        <View className="bg-red-50 border border-red-200 rounded-xl p-3 flex-row items-center gap-2.5 mb-6">
          <CivicIcon name="priority-high" size={20} color="#b61722" />
          <View className="flex-1">
            <Text className="text-xs font-bold text-red-900">
              Prioridad Alta Comunitaria
            </Text>
            <Text className="text-[11px] text-red-700 leading-tight">
              Este reporte se destacará en el tablero vecinal para agilizar el auxilio mutuo.
            </Text>
          </View>
        </View>

        {/* Botón Publicar */}
        <TouchableOpacity
          onPress={handlePublicar}
          disabled={loading}
          className="w-full bg-red-700 active:bg-red-800 py-4 rounded-xl flex-row items-center justify-center gap-2 mb-8 shadow-sm"
        >
          <CivicIcon name="campaign" size={20} color="#ffffff" />
          <Text className="text-white font-bold text-base">
            {loading ? 'Publicando...' : 'Publicar solicitud de emergencia'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Tipos de Emergencia */}
      <Modal visible={modalTipo} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl p-5 border-t border-gray-200">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-base font-bold text-gray-900">
                Tipo de Recurso Requerido
              </Text>
              <TouchableOpacity onPress={() => setModalTipo(false)}>
                <CivicIcon name="close" size={22} color="#6e7b6c" />
              </TouchableOpacity>
            </View>
            {tiposEmergencia.map(t => (
              <TouchableOpacity
                key={t.key}
                onPress={() => {
                  setTipoSeleccionado(t);
                  setModalTipo(false);
                }}
                className={`flex-row items-center gap-3 p-3.5 rounded-xl mb-2 ${
                  tipoSeleccionado.key === t.key ? 'bg-red-100 border border-red-600' : 'bg-gray-50'
                }`}
              >
                <CivicIcon name={t.icon} size={18} color="#b61722" />
                <Text className="text-sm font-semibold text-gray-900">{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PublicarEmergenciaScreen;
