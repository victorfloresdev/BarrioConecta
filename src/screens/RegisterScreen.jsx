import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal
} from 'react-native';
import { CivicIcon } from '../components/CivicIcon';
import apiService from '../services/api';

export const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sector, setSector] = useState('Sector 2 • Parque Central');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalSector, setModalSector] = useState(false);
  const [loading, setLoading] = useState(false);

  const sectores = [
    { label: 'Sector 1 • Los Rosales', count: '342 vecinos' },
    { label: 'Sector 2 • Parque Central', count: '518 vecinos' },
    { label: 'Sector 3 • Rinconada Alta', count: '209 vecinos' },
    { label: 'Sector 4 • Alameda Sur', count: '415 vecinos' }
  ];

  const handleRegister = async () => {
    if (!nombre.trim() || !telefono.trim() || !password.trim()) {
      Alert.alert('Datos incompletos', 'Por favor llena todos los campos para registrarte.');
      return;
    }
    setLoading(true);
    try {
      const res = await apiService.registro({
        nombre,
        telefono,
        zona_residencia: sector,
        password
      });
      setLoading(false);
      if (res.success) {
        Alert.alert('¡Bienvenido!', 'Tu cuenta ha sido creada con éxito.', [
          { text: 'Comenzar', onPress: () => navigation.replace('MainTabs') }
        ]);
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Error', 'No se pudo crear la cuenta.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="px-5 py-4" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="flex-row items-center gap-1 py-1"
            >
              <CivicIcon name="arrow-back" size={20} color="#141b2b" />
              <Text className="text-sm font-semibold text-gray-900">Volver</Text>
            </TouchableOpacity>
            <Text className="text-xs font-semibold text-gray-500">Paso 1 de 2</Text>
          </View>

          {/* Título */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-900 mb-1">
              Únete a tu barrio
            </Text>
            <Text className="text-sm text-gray-600 leading-relaxed">
              Crea tu perfil vecinal para ofrecer servicios o intercambiar favores con confianza.
            </Text>
          </View>

          {/* Formulario */}
          <View className="space-y-4">
            {/* Nombre */}
            <View>
              <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Nombre y Apellido
              </Text>
              <TextInput
                value={nombre}
                onChangeText={setNombre}
                placeholder="Ej. María López"
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900"
              />
            </View>

            {/* Teléfono */}
            <View className="mt-3">
              <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Número de celular para verificación
              </Text>
              <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3">
                <View className="flex-row items-center gap-1.5">
                  <CivicIcon name="verified-user" size={16} color="#006b2c" />
                  <Text className="font-semibold text-gray-900 text-base">+51</Text>
                  <View className="h-5 w-[1px] bg-gray-300 mx-2" />
                </View>
                <TextInput
                  value={telefono}
                  onChangeText={setTelefono}
                  keyboardType="phone-pad"
                  maxLength={9}
                  placeholder="987 654 321"
                  className="flex-1 text-base text-gray-900"
                />
              </View>
            </View>

            {/* Zona / Sector */}
            <View className="mt-3">
              <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Zona de residencia
              </Text>
              <TouchableOpacity
                onPress={() => setModalSector(true)}
                className="flex-row items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3.5"
              >
                <Text className="text-base text-gray-900 font-medium">{sector}</Text>
                <CivicIcon name="expand-more" size={20} color="#6e7b6c" />
              </TouchableOpacity>
            </View>

            {/* Contraseña */}
            <View className="mt-3">
              <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Crea una contraseña
              </Text>
              <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 py-3">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="••••••••"
                  className="flex-1 text-base text-gray-900"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <CivicIcon
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={20}
                    color="#6e7b6c"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Aviso de privacidad */}
            <View className="mt-4 bg-green-50/70 border border-green-200/60 rounded-xl p-3.5 flex-row items-start gap-2.5">
              <CivicIcon name="security" size={18} color="#006b2c" />
              <Text className="text-xs text-gray-700 leading-relaxed flex-1">
                Solo tus vecinos verán tu nombre y sector general. Tu dirección exacta y teléfono están ocultos por defecto.
              </Text>
            </View>

            {/* Botón Crear Cuenta */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
              className="mt-6 w-full bg-green-700 active:bg-green-800 rounded-xl py-4 flex-row items-center justify-center gap-2 shadow-sm"
            >
              <Text className="text-white font-bold text-base">
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Text>
              <CivicIcon name="arrow-forward" size={18} color="#ffffff" />
            </TouchableOpacity>

            <Text className="text-xs text-gray-400 text-center leading-relaxed mt-2 mb-8">
              Al registrarte, aceptas las normas de convivencia vecinal y el cuidado mutuo de la red.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal Selector de Sector */}
      <Modal visible={modalSector} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl p-5 border-t border-gray-200">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-900">Selecciona tu Sector</Text>
              <TouchableOpacity onPress={() => setModalSector(false)}>
                <CivicIcon name="close" size={22} color="#6e7b6c" />
              </TouchableOpacity>
            </View>
            {sectores.map((s, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  setSector(s.label);
                  setModalSector(false);
                }}
                className={`flex-row justify-between items-center p-3.5 rounded-xl mb-2 ${
                  sector === s.label ? 'bg-green-100 border border-green-600' : 'bg-gray-50'
                }`}
              >
                <Text className="text-sm font-semibold text-gray-900">{s.label}</Text>
                <Text className="text-xs text-green-700 font-medium">{s.count}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RegisterScreen;
