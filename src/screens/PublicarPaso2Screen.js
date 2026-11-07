import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  Modal
} from 'react-native';
import { CivicIcon } from '../components/CivicIcon';
import apiService from '../services/api';

export const PublicarPaso2Screen = ({ route, navigation }) => {
  const tipoPublicacion = route.params?.tipo_publicacion || 'servicio';

  const [categoria, setCategoria] = useState({
    key: 'gasfiteria',
    label: 'Gasfitería y Fontanería',
    icon: 'plumbing'
  });
  const [modalCat, setModalCat] = useState(false);
  const [titulo, setTitulo] = useState('Reparación de tuberías y filtraciones');
  const [descripcion, setDescripcion] = useState(
    'Atención de urgencias domésticas, cambio de griferías, desatoros y detección de humedad con herramientas propias en el barrio.'
  );
  const [precioModo, setPrecioModo] = useState('a_convenir'); // 'monto_fijo' | 'a_convenir' | 'trueque'
  const [precioMonto, setPrecioMonto] = useState('35.00');
  const [loading, setLoading] = useState(false);

  const categorias = [
    { key: 'gasfiteria', label: 'Gasfitería y Fontanería', icon: 'plumbing' },
    { key: 'electricidad', label: 'Electricidad residencial', icon: 'bolt' },
    { key: 'carpinteria', label: 'Carpintería y Muebles', icon: 'carpenter' },
    { key: 'alimentos', label: 'Alimentos y Postres', icon: 'restaurant' },
    { key: 'clases', label: 'Clases y Tutoría', icon: 'menu-book' },
    { key: 'jardineria', label: 'Jardinería y Paisajismo', icon: 'yard' }
  ];

  const handlePublicar = async () => {
    if (!titulo.trim() || !descripcion.trim()) {
      Alert.alert('Campos requeridos', 'Por favor ingresa un título y una descripción.');
      return;
    }
    setLoading(true);
    try {
      const res = await apiService.crearPublicacion({
        tipo_publicacion: tipoPublicacion,
        categoria: categoria.key,
        categoria_label: categoria.label,
        titulo,
        descripcion,
        precio_tipo: precioModo,
        precio_monto: precioModo === 'monto_fijo' ? parseFloat(precioMonto) || 0 : null
      });
      setLoading(false);
      if (res.success) {
        Alert.alert(
          '¡Publicado con éxito!',
          'Tu anuncio ya es visible para los vecinos de tu sector.',
          [
            {
              text: 'Ver en el muro',
              onPress: () => navigation.navigate('EconomiaLocalTab')
            }
          ]
        );
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Error', 'No se pudo publicar el anuncio.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header Fijo */}
      <View className="h-14 px-4 bg-white border-b border-gray-200 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-1">
          <CivicIcon name="close" size={24} color="#141b2b" />
        </TouchableOpacity>
        <Text className="text-sm font-bold text-gray-900">Paso 2 De 2</Text>
        <View className="w-8 h-8 rounded-full bg-green-700 items-center justify-center">
          <CivicIcon name="person" size={18} color="#ffffff" />
        </View>
      </View>
      {/* Barra de Progreso (2/2 completa) */}
      <View className="w-full h-1 bg-gray-200">
        <View className="w-full h-full bg-green-700" />
      </View>

      <ScrollView className="flex-1 px-5 py-4" showsVerticalScrollIndicator={false}>
        {/* Título */}
        <View className="mb-5">
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            {tipoPublicacion === 'servicio'
              ? '¿Qué servicio vas a ofrecer?'
              : tipoPublicacion === 'producto'
              ? '¿Qué producto vas a ofrecer?'
              : '¿Qué favor o intercambio deseas coordinar?'}
          </Text>
          <Text className="text-xs text-gray-500">
            Conecta con tus vecinos compartiendo tus habilidades y oficios.
          </Text>
        </View>

        {/* Campo 1: Selector de Categoría */}
        <View className="mb-4">
          <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Categoría
          </Text>
          <TouchableOpacity
            onPress={() => setModalCat(true)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 flex-row items-center justify-between"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-8 h-8 rounded-lg bg-green-50 items-center justify-center">
                <CivicIcon name={categoria.icon} size={18} color="#006b2c" />
              </View>
              <Text className="text-sm font-semibold text-gray-900">
                {categoria.label}
              </Text>
            </View>
            <CivicIcon name="expand-more" size={20} color="#6e7b6c" />
          </TouchableOpacity>
        </View>

        {/* Campo 2: Título */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-1.5">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Título de tu anuncio
            </Text>
            <Text className="text-xs text-gray-400">{titulo.length}/60</Text>
          </View>
          <TextInput
            value={titulo}
            onChangeText={setTitulo}
            maxLength={60}
            placeholder="Ej. Reparación de tuberías y filtraciones"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900"
          />
        </View>

        {/* Campo 3: Descripción */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-1.5">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Descripción
            </Text>
            <Text className="text-xs text-gray-400">Mín. 20 car.</Text>
          </View>
          <TextInput
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholder="Detalla tu experiencia o lo que ofreces a tus vecinos..."
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 min-h-[85px]"
          />
        </View>

        {/* Campo 4: Modalidad de Cobro */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-1.5">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Modalidad de cobro
            </Text>
            <Text className="text-xs font-semibold text-green-700">Acuerdo vecinal</Text>
          </View>
          <View className="flex-row gap-2">
            {[
              { id: 'monto_fijo', label: 'Monto fijo en soles', icon: 'payments' },
              { id: 'a_convenir', label: 'A convenir', icon: 'handshake' },
              { id: 'trueque', label: 'Trueque', icon: 'swap-horiz' }
            ].map(p => (
              <TouchableOpacity
                key={p.id}
                onPress={() => setPrecioModo(p.id)}
                className={`flex-1 py-3 px-1 rounded-xl items-center justify-center border ${
                  precioModo === p.id
                    ? 'bg-green-700 border-green-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <CivicIcon
                  name={p.icon}
                  size={18}
                  color={precioModo === p.id ? '#ffffff' : '#6e7b6c'}
                />
                <Text
                  className={`text-[11px] font-bold mt-1 text-center ${
                    precioModo === p.id ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Input para Monto Fijo */}
          {precioModo === 'monto_fijo' && (
            <View className="mt-2.5 bg-white border border-gray-200 rounded-xl px-4 py-2 flex-row items-center">
              <Text className="text-sm font-bold text-gray-500 mr-2">S/</Text>
              <TextInput
                value={precioMonto}
                onChangeText={setPrecioMonto}
                keyboardType="numeric"
                placeholder="0.00"
                className="flex-1 text-base font-bold text-gray-900"
              />
              <Text className="text-xs text-gray-400">por labor o servicio</Text>
            </View>
          )}
        </View>

        {/* Campo 5: Foto / Muestras de Trabajo */}
        <View className="mb-4">
          <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Foto del oficio opcional
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => Alert.alert('Galería', 'Foto demostrativa seleccionada.')}
              className="flex-1 bg-white border border-dashed border-gray-300 rounded-2xl p-4 items-center justify-center min-h-[96px]"
            >
              <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mb-1">
                <CivicIcon name="add-a-photo" size={20} color="#6e7b6c" />
              </View>
              <Text className="text-xs font-bold text-gray-800">Subir foto real</Text>
              <Text className="text-[10px] text-gray-400">Genera 4x más confianza</Text>
            </TouchableOpacity>

            <View className="w-24 h-24 rounded-2xl overflow-hidden border border-gray-200 relative">
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=300&q=80'
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute bottom-1 right-1 bg-black/60 px-1.5 py-0.5 rounded">
                <Text className="text-[9px] font-bold text-white">1/3</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tarjeta de Visibilidad y Confianza */}
        <View className="bg-green-50/70 border border-green-200/50 rounded-xl p-3 flex-row items-start gap-2.5 mb-6">
          <CivicIcon name="location-on" size={18} color="#006b2c" />
          <View className="flex-1">
            <View className="flex-row items-center gap-1.5 mb-0.5">
              <Text className="text-xs font-bold text-gray-900">Sector 4, Piura</Text>
              <View className="bg-green-100 px-1.5 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-green-800">Verificado</Text>
              </View>
            </View>
            <Text className="text-[11px] text-gray-600 leading-tight">
              Este anuncio será visible para los vecinos a 2 km a la redonda de tu dirección registrada.
            </Text>
          </View>
        </View>

        {/* Botón Publicar */}
        <TouchableOpacity
          onPress={handlePublicar}
          disabled={loading}
          className="w-full bg-green-700 active:bg-green-800 py-4 rounded-xl flex-row items-center justify-center gap-2 mb-8 shadow-sm"
        >
          <CivicIcon name="check-circle" size={18} color="#ffffff" />
          <Text className="text-white font-bold text-base">
            {loading ? 'Publicando...' : 'Publicar Anuncio en el Barrio'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Categorías */}
      <Modal visible={modalCat} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl p-5 border-t border-gray-200">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-900">Selecciona Categoría</Text>
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
                  categoria.key === c.key ? 'bg-green-100 border border-green-600' : 'bg-gray-50'
                }`}
              >
                <CivicIcon name={c.icon} size={20} color="#006b2c" />
                <Text className="text-sm font-semibold text-gray-900">{c.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PublicarPaso2Screen;
