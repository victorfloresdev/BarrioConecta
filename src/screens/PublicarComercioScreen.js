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

export const PublicarComercioScreen = ({ navigation }) => {
  const [tipoPublicacion, setTipoPublicacion] = useState('servicio'); // 'servicio' | 'producto'

  const categoriasServicio = [
    { key: 'gasfiteria', label: 'Gasfitería y fontanería', icon: 'plumbing' },
    { key: 'electricidad', label: 'Electricidad residencial', icon: 'bolt' },
    { key: 'carpinteria', label: 'Carpintería y muebles', icon: 'carpenter' },
    { key: 'clases', label: 'Clases y tutoría', icon: 'menu-book' },
    { key: 'jardineria', label: 'Jardinería y áreas verdes', icon: 'yard' }
  ];

  const categoriasProducto = [
    { key: 'alimentos', label: 'Alimentos y postres caseros', icon: 'restaurant' },
    { key: 'costura', label: 'Confección y manualidades', icon: 'checkroom' },
    { key: 'huerto', label: 'Plantas y productos de huerto', icon: 'eco' },
    { key: 'artesania', label: 'Artesanías y hogar', icon: 'palette' }
  ];

  const [categoria, setCategoria] = useState(categoriasServicio[0]);
  const [modalCat, setModalCat] = useState(false);
  const [titulo, setTitulo] = useState('Reparación de tuberías y filtraciones');
  const [descripcion, setDescripcion] = useState(
    'Atención de urgencias domésticas, cambio de griferías y detección de fugas con herramientas propias.'
  );
  const [precioModo, setPrecioModo] = useState('a_convenir'); // 'monto_fijo' | 'a_convenir' | 'trueque'
  const [precioMonto, setPrecioMonto] = useState('35.00');
  const [loading, setLoading] = useState(false);

  const categoriasDisponibles = tipoPublicacion === 'servicio' ? categoriasServicio : categoriasProducto;

  const handleTipoChange = (nuevoTipo) => {
    setTipoPublicacion(nuevoTipo);
    if (nuevoTipo === 'servicio') {
      setCategoria(categoriasServicio[0]);
      setTitulo('Reparación de tuberías y filtraciones');
      setDescripcion('Atención de urgencias domésticas, cambio de griferías y detección de fugas con herramientas propias.');
    } else {
      setCategoria(categoriasProducto[0]);
      setTitulo('Lasañas caseras y pastelitos de choclo');
      setDescripcion('Preparadas cada mañana con ingredientes frescos del mercado local. Listas para el almuerzo.');
    }
  };

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
          'Publicación Exitosa',
          'Tu anuncio ya está visible en el directorio de Economía Local.',
          [
            {
              text: 'Ver en Comercio',
              onPress: () => navigation.navigate('MainTabs', { screen: 'EconomiaLocalTab' })
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
          <CivicIcon name="arrow-back" size={22} color="#141b2b" />
        </TouchableOpacity>
        <Text className="text-sm font-bold text-gray-900">Paso 2 de 2</Text>
        <View className="w-8 h-8 rounded-full bg-green-700 items-center justify-center">
          <CivicIcon name="person" size={18} color="#ffffff" />
        </View>
      </View>

      {/* Barra de Progreso al 100% */}
      <View className="w-full h-1 bg-gray-200">
        <View className="w-full h-full bg-green-700" />
      </View>

      <ScrollView className="flex-1 px-5 py-4" showsVerticalScrollIndicator={false}>
        {/* Título */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            Ofrecer producto o servicio
          </Text>
          <Text className="text-xs text-gray-500">
            Conecta con tus vecinos compartiendo tus productos u oficios.
          </Text>
        </View>

        {/* Selector Toggle: Producto vs Servicio */}
        <View className="flex-row bg-gray-100 p-1 rounded-xl mb-4">
          <TouchableOpacity
            onPress={() => handleTipoChange('servicio')}
            className={`flex-1 py-2.5 rounded-lg flex-row items-center justify-center gap-1.5 ${
              tipoPublicacion === 'servicio' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <CivicIcon
              name="handyman"
              size={16}
              color={tipoPublicacion === 'servicio' ? '#006b2c' : '#6e7b6c'}
            />
            <Text
              className={`text-xs font-bold ${
                tipoPublicacion === 'servicio' ? 'text-green-800' : 'text-gray-500'
              }`}
            >
              Servicio
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTipoChange('producto')}
            className={`flex-1 py-2.5 rounded-lg flex-row items-center justify-center gap-1.5 ${
              tipoPublicacion === 'producto' ? 'bg-white shadow-sm' : ''
            }`}
          >
            <CivicIcon
              name="storefront"
              size={16}
              color={tipoPublicacion === 'producto' ? '#006b2c' : '#6e7b6c'}
            />
            <Text
              className={`text-xs font-bold ${
                tipoPublicacion === 'producto' ? 'text-green-800' : 'text-gray-500'
              }`}
            >
              Producto
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categoría */}
        <View className="mb-4">
          <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Categoría de {tipoPublicacion}
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

        {/* Título */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-1.5">
            <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Título del anuncio
            </Text>
            <Text className="text-xs text-gray-400">{titulo.length} de 60</Text>
          </View>
          <TextInput
            value={titulo}
            onChangeText={setTitulo}
            maxLength={60}
            placeholder="Ej. Reparación de tuberías y filtraciones"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900"
          />
        </View>

        {/* Descripción */}
        <View className="mb-4">
          <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Descripción
          </Text>
          <TextInput
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholder="Detalla lo que ofreces a tus vecinos..."
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 min-h-[85px]"
          />
        </View>

        {/* Modalidad de Cobro */}
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
                  size={17}
                  color={precioModo === p.id ? '#ffffff' : '#6e7b6c'}
                />
                <Text
                  className={`text-[10px] font-bold mt-1 text-center ${
                    precioModo === p.id ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
              <Text className="text-xs text-gray-400">por labor o unidad</Text>
            </View>
          )}
        </View>

        {/* Foto de Muestra */}
        <View className="mb-4">
          <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Foto del producto o servicio opcional
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => Alert.alert('Galería', 'Foto demostrativa seleccionada.')}
              className="flex-1 bg-white border border-dashed border-gray-300 rounded-2xl p-4 items-center justify-center min-h-[96px]"
            >
              <CivicIcon name="add-a-photo" size={20} color="#6e7b6c" />
              <Text className="text-xs font-bold text-gray-800 mt-1">Subir foto real</Text>
              <Text className="text-[10px] text-gray-400">Genera confianza en el barrio</Text>
            </TouchableOpacity>

            <View className="w-24 h-24 rounded-2xl overflow-hidden border border-gray-200 relative">
              <Image
                source={{
                  uri:
                    tipoPublicacion === 'producto'
                      ? 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=300&q=80'
                      : 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=300&q=80'
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute bottom-1 right-1 bg-black/60 px-1.5 py-0.5 rounded">
                <Text className="text-[9px] font-bold text-white">1 de 3</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Radio de Visibilidad */}
        <View className="bg-green-50/70 border border-green-200/50 rounded-xl p-3 flex-row items-start gap-2.5 mb-6">
          <CivicIcon name="location-on" size={17} color="#006b2c" />
          <View className="flex-1">
            <Text className="text-xs font-bold text-gray-900 mb-0.5">
              Sector 4, Piura • Verificado
            </Text>
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
            {loading ? 'Publicando...' : 'Publicar en Comercio'}
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
            {categoriasDisponibles.map(c => (
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
                <CivicIcon name={c.icon} size={18} color="#006b2c" />
                <Text className="text-sm font-semibold text-gray-900">{c.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PublicarComercioScreen;
