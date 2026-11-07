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
  Alert
} from 'react-native';
import { CivicIcon } from '../components/CivicIcon';
import apiService from '../services/api';

export const LoginScreen = ({ navigation }) => {
  const [telefono, setTelefono] = useState('987654321');
  const [password, setPassword] = useState('vecino2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!telefono.trim()) {
      Alert.alert('Teléfono requerido', 'Ingresa tu número de celular para ingresar.');
      return;
    }
    setLoading(true);
    try {
      const res = await apiService.login(telefono, password);
      setLoading(false);
      if (res.success) {
        navigation.replace('MainTabs');
      }
    } catch (e) {
      setLoading(false);
      Alert.alert('Error', 'No se pudo iniciar sesión.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          className="px-6"
          showsVerticalScrollIndicator={false}
        >
          {/* Cabecera y Logotipo */}
          <View className="items-center justify-center text-center mt-12 mb-8">
            <View className="bg-green-100 p-5 rounded-full mb-4">
              <CivicIcon name="volunteer-activism" size={42} color="#006b2c" />
            </View>
            <Text className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
              BarrioConecta
            </Text>
            <Text className="text-sm font-medium text-gray-500 text-center">
              Tu barrio, más conectado y solidario.
            </Text>
          </View>

          {/* Formulario */}
          <View className="space-y-4">
            {/* Teléfono */}
            <View>
              <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Número de teléfono
              </Text>
              <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-3.5 py-3 focus:border-green-600">
                <Text className="text-gray-700 font-semibold text-base">+51</Text>
                <View className="h-5 w-[1px] bg-gray-300 mx-3" />
                <TextInput
                  value={telefono}
                  onChangeText={setTelefono}
                  keyboardType="phone-pad"
                  maxLength={9}
                  placeholder="987 654 321"
                  className="flex-1 text-gray-900 font-medium text-base"
                />
              </View>
            </View>

            {/* Contraseña */}
            <View className="mt-3">
              <View className="flex-row justify-between items-center mb-1.5">
                <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Contraseña
                </Text>
                <TouchableOpacity onPress={() => Alert.alert('Recuperación', 'Se enviará un SMS de verificación a tu celular.')}>
                  <Text className="text-xs font-semibold text-green-700">
                    Olvidé mi contraseña
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-3.5 py-3">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholder="••••••••"
                  className="flex-1 text-gray-900 font-medium text-base"
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

            {/* Botón Ingresar */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className="mt-6 w-full bg-green-700 active:bg-green-800 rounded-xl py-4 flex-row items-center justify-center gap-2 shadow-sm"
            >
              <Text className="text-white font-bold text-base">
                {loading ? 'Ingresando...' : 'Ingresar'}
              </Text>
              <CivicIcon name="arrow-forward" size={20} color="#ffffff" />
            </TouchableOpacity>

            {/* Divisor */}
            <View className="flex-row items-center my-4">
              <View className="h-[1px] bg-gray-200 flex-1" />
              <Text className="text-xs uppercase text-gray-400 font-medium px-3">o</Text>
              <View className="h-[1px] bg-gray-200 flex-1" />
            </View>

            {/* Crear cuenta */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              className="w-full bg-white border border-gray-300 py-3.5 rounded-xl items-center"
            >
              <Text className="text-gray-900 font-bold text-base">
                Crear una cuenta nueva
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer institucional */}
          <View className="mt-auto pt-8 pb-6 items-center text-center">
            <View className="flex-row items-center gap-1.5 mb-1 text-gray-400">
              <CivicIcon name="verified-user" size={16} color="#6e7b6c" />
              <Text className="text-xs font-semibold tracking-wide uppercase text-gray-500">
                Comunidad Protegida
              </Text>
            </View>
            <Text className="text-xs text-gray-400 text-center leading-relaxed px-4">
              Al ingresar, aceptas el Pacto de Confianza Barrial y el uso de datos locales.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
