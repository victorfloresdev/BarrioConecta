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

export const PublicarSolidariaScreen = ({ navigation }) => {
  const [tipoMuro, setTipoMuro] = useState('necesito'); // 'necesito' | 'ofrezco'

  const categorias = [
    { key: 'Movilidad', label: 'Movilidad escolar o vecinal', icon: 'directions-car' },
    { key: 'Herramientas', label: 'Préstamo de herramientas', icon: 'build' },
    { key: 'Tiempo', label: 'Ayuda temporal o compañía', icon: 'schedule' },
    { key: 'Donacion', label: 'Donación de materiales', icon: 'inventory-2' }
  ];

  const [categoria, setCategoria] = useState(categorias[0]);
  const [modalCat, setModalCat] = useState(false);
  const [titulo, setTitulo] = useState('Necesito llevar a mis hijos al Colegio San José');
  const [descripcion, setDescripcion] = useState(
    'Mi vehículo se malogró hoy. ¿Alguien tiene espacio desde la plaza central? Acompaño a los niños en todo momento.'
  );
  const [puntoEncuentro, setPuntoEncuentro] = useState('Plaza Central');
  const [horario, setHorario] = useState('7:00 AM puntual');
  const [urgencia, setUrgencia] = useState('alta'); // 'alta' | 'normal'
  const [loading, setLoading] = useState(false);

  const handleTipoChange = (nuevoTipo) => {
    setTipoMuro(nuevoTipo);
    if (nuevoTipo === 'necesito') {
      setTitulo('Necesito llevar a mis hijos al Colegio San José');
      setDescripcion('Mi vehículo se malogró hoy. ¿Alguien tiene espacio desde la plaza central?');
      setUrgencia('alta');
    } else {
      setTitulo('Presto muletas ortopédicas de aluminio para adulto');
      setDescripcion('Están limpias y en perfecto estado. Para cualquier vecino que las necesite temporalmente.');
      setCategoria(categorias[1]);
      setUrgencia('normal');
    }
  };

  const handlePublicar = async () => {
    if (!titulo.trim() || !descripcion.trim() || !puntoEncuentro.trim()) {
      Alert.alert('Campos requeridos', 'Por favor completa el título, descripción y punto de encuentro.');
      return;
    }
    setLoading(true);
    try {
      const res = await apiService.crearSolicitudSolidaria({
        tipo_muro: tipoMuro,
        categoria_favor: categoria.key,
        titulo,
        descripcion,
        punto_encuentro_publico: puntoEncuentro,
        horario,
        urgencia
      });
      setLoading(false);
      if (res.success) {
        Alert.alert(
          'Publicación Solidaria Registrada',
          'Tu solicitud ya está visible en el Muro de Apoyo Vecinal.',
          [
            {
              text: 'Ver en Solidaridad',
              onPress: () => navigation.navigate('MainTabs', { screen: 'EconomiaSolidariaTab' })
            }
          ]
        );
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Error', 'No se pudo publicar la solicitud.');
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
        <View className="w-8 h-8 rounded-full bg-green-700 items-center justify-center">
          <CivicIcon name="person" size={18} color="#ffffff" />
        </View>
      </View>

      {/* Barra de Progreso al 100% */}
      <View className="w-full h-1 bg-gray-200">
        <View className="w-full h-full bg-sky-700" />
      </View>

      <ScrollView className="flex-1 px-5 py-4" showsVerticalScrollIndicator={false}>
        {/* Título */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            Solicitar ayuda vecinal
          </Text>
          <Text className="text-xs text-gray-500">
            Conecta con vecinos dispuestos a apoyarte sin dinero de por medio.
          </Text>
        </View>

        {/* Selector Toggle: Necesito vs Ofrezco */}
        <View className="flex-row bg-gray-100 p-1 rounded-xl mb-4">
          <TouchableOpacity
            onPress={() => handleTipoChange('necesito')}
            className={`flex-1 py-2.5 rounded-lg flex-row items-center justify-center gap-1.5 ${
              tipoMuro === 'necesito' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <CivicIcon
              name="volunteer-activism"
              size={16}
              color={tipoMuro === 'necesito' ? '#006194' : '#6e7b6c'}
            />
            <Text
              className={`text-xs font-bold ${
                tipoMuro === 'necesito' ? 'text-sky-800' : 'text-gray-500'
              }`}
            >
              Necesito ayuda
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTipoChange('ofrezco')}
            className={`flex-1 py-2.5 rounded-lg flex-row items-center justify-center gap-1.5 ${
              tipoMuro === 'ofrezco' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <CivicIcon
              name="handshake"
              size={16}
              color={tipoMuro === 'ofrezco' ? '#006194' : '#6e7b6c'}
            />
            <Text
              className={`text-xs font-bold ${
                tipoMuro === 'ofrezco' ? 'text-sky-800' : 'text-gray-500'
              }`}
            >
              Ofrezco ayuda
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categoría */}
        <View className="mb-4">
          <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Categoría del favor
          </Text>
          <TouchableOpacity
            onPress={() => setModalCat(true)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-lg bg-sky-50 items-center justify-center">
                <CivicIcon name={categoria.icon} size={18} color="#006194" />
              </View>
              <Text className="text-sm font-semibold text-gray-900">
                {categoria.label}
              </Text>
            </View>
            <CivicIcon name="expand-more" size={20} color="#6e7b6c" />
          </TouchableOpacity>
        </View>

        {/* Título de la solicitud */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-1.5">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Título de la solicitud
            </Text>
            <Text className="text-xs text-gray-400">{titulo.length} de 60</Text>
          </View>
          <TextInput
            value={titulo}
            onChangeText={setTitulo}
            maxLength={60}
            placeholder="Ej. Préstamo de escalera telescópica 4m"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900"
          />
        </View>

        {/* Descripción */}
        <View className="mb-4">
          <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Descripción de la necesidad o favor
          </Text>
          <TextInput
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholder="Explica qué necesitas y cómo se coordinará el intercambio..."
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 min-h-[85px]"
          />
        </View>

        {/* Punto de Encuentro Público */}
        <View className="mb-4">
          <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Punto de encuentro público
          </Text>
          <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-3.5 py-3">
            <CivicIcon name="near-me" size={18} color="#006194" />
            <TextInput
              value={puntoEncuentro}
              onChangeText={setPuntoEncuentro}
              placeholder="Ej. Plaza Central, Parque Grau, frente a parroquia"
              className="flex-1 ml-2 text-sm text-gray-900"
            />
          </View>
          <Text className="text-[11px] text-gray-500 mt-1">
            Por seguridad, los intercambios siempre se realizan en espacios públicos iluminados.
          </Text>
        </View>

        {/* Horario y Urgencia */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Horario estimado
            </Text>
            <TextInput
              value={horario}
              onChangeText={setHorario}
              placeholder="Ej. 7:00 AM puntual"
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900"
            />
          </View>

          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Nivel de urgencia
            </Text>
            <View className="flex-row gap-1">
              <TouchableOpacity
                onPress={() => setUrgencia('normal')}
                className={`flex-1 py-3 rounded-xl items-center border ${
                  urgencia === 'normal'
                    ? 'bg-sky-700 border-sky-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    urgencia === 'normal' ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  Normal
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setUrgencia('alta')}
                className={`flex-1 py-3 rounded-xl items-center border ${
                  urgencia === 'alta'
                    ? 'bg-red-700 border-red-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    urgencia === 'alta' ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  Urgente
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Condiciones de Solidaridad */}
        <View className="bg-sky-50/60 border border-sky-200/50 rounded-xl p-3 flex-row items-start gap-2.5 mb-6">
          <CivicIcon name="security" size={17} color="#006194" />
          <View className="flex-1">
            <Text className="text-xs font-bold text-gray-900 mb-0.5">
              Pacto de Solidaridad Vecinal
            </Text>
            <Text className="text-[11px] text-gray-600 leading-tight">
              Los favores comunitarios son gratuitos y solidarios. Queda prohibido cualquier cobro o exigencia monetaria.
            </Text>
          </View>
        </View>

        {/* Botón Publicar */}
        <TouchableOpacity
          onPress={handlePublicar}
          disabled={loading}
          className="w-full bg-sky-700 active:bg-sky-800 py-4 rounded-xl flex-row items-center justify-center gap-2 mb-8 shadow-sm"
        >
          <CivicIcon name="check-circle" size={18} color="#ffffff" />
          <Text className="text-white font-bold text-base">
            {loading ? 'Publicando...' : 'Publicar en Solidaridad'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Categorías */}
      <Modal visible={modalCat} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl p-5 border-t border-gray-200">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-base font-bold text-gray-900">
                Selecciona la Categoría
              </Text>
              <TouchableOpacity onPress={() => setModalCat(false)}>
                <CivicIcon name="close" size={22} color="#6e7b6c" />
              </TouchableOpacity>
            </View>
            {categorias.map(c => (
              <TouchableOpacity
                key={c.key}
                onPress={() => {
                  setCategoria(c);
                  setModalCat(false);
                }}
                className={`flex-row items-center gap-3 p-3.5 rounded-xl mb-2 ${
                  categoria.key === c.key ? 'bg-sky-100 border border-sky-600' : 'bg-gray-50'
                }`}
              >
                <CivicIcon name={c.icon} size={18} color="#006194" />
                <Text className="text-sm font-semibold text-gray-900">{c.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PublicarSolidariaScreen;
