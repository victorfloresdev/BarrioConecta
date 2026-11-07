import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
  Share
} from 'react-native';
import { CivicIcon } from '../components/CivicIcon';
import { mockData } from '../mockData';

export const DetalleSolidariaScreen = ({ route, navigation }) => {
  // Mapeo directo usando route.params
  const item = route.params?.item || mockData.economia_solidaria[0];

  const handleHelp = () => {
    const tel = item.usuario_publico?.telefono || '981234567';
    const nombre = item.usuario_publico?.nombre_publico || 'Vecino';
    const mensaje = encodeURIComponent(
      `¡Hola ${nombre}! Vi tu pedido en BarrioConecta sobre "${item.titulo}" y con gusto puedo ayudarte.`
    );
    const url = `whatsapp://send?phone=51${tel}&text=${mensaje}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(
            'Contacto Solidario',
            `Puedes comunicarte directamente con ${nombre} al teléfono:\n\n📞 +51 ${tel}\n\nCoordinen siempre el punto de encuentro en un lugar público iluminado.`,
            [{ text: 'Entendido' }]
          );
        }
      })
      .catch(() => {
        Alert.alert('Contacto Solidario', `Teléfono: +51 ${tel}`);
      });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Solicitud de apoyo barrial en BarrioConecta: "${item.titulo}" por ${item.usuario_publico.nombre_publico}. Punto de encuentro: ${item.movilidad_segura.punto_encuentro_publico}.`
      });
    } catch (e) {}
  };

  const handleReportAcoso = () => {
    Alert.alert(
      'Seguridad y Prevención',
      'Si detectas algún comportamiento sospechoso o acoso, puedes llamar de inmediato al 105 de la Policía Nacional o reportar al moderador comunitario.',
      [
        { text: 'Llamar al 105', onPress: () => Linking.openURL('tel:105') },
        { text: 'Cerrar', style: 'cancel' }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header Fijo */}
      <View className="h-14 px-4 bg-white/90 border-b border-gray-200 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row items-center gap-1.5 py-1"
        >
          <CivicIcon name="arrow-back" size={20} color="#141b2b" />
          <Text className="text-sm font-semibold text-gray-900">Volver</Text>
        </TouchableOpacity>
        <Text className="text-sm font-bold text-gray-900">Detalle De Solicitud</Text>
        <View className="flex-row items-center gap-1">
          <TouchableOpacity onPress={handleShare} className="p-2">
            <CivicIcon name="share" size={20} color="#3e4a3d" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReportAcoso} className="p-2">
            <CivicIcon name="flag" size={20} color="#b61722" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 py-3" showsVerticalScrollIndicator={false}>
        {/* Badges de Categoría y Urgencia */}
        <View className="flex-row items-center gap-2 mb-2 flex-wrap">
          {item.urgencia === 'alta' && (
            <View className="flex-row items-center gap-1 bg-red-100 px-2.5 py-1 rounded-lg">
              <CivicIcon name="local-fire-department" size={14} color="#b61722" />
              <Text className="text-xs font-bold text-red-700 uppercase">URGENTE</Text>
            </View>
          )}
          <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {item.categoria_favor} SOLIDARIA • {item.tiempo_relativo || 'HACE 10 MIN'}
          </Text>
        </View>

        {/* Título Principal */}
        <Text className="text-2xl font-bold text-gray-900 leading-snug mb-3">
          {item.titulo}
        </Text>

        {/* Foto de Contexto */}
        <View className="relative w-full h-40 rounded-2xl overflow-hidden bg-gray-100 mb-3 border border-gray-200">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute bottom-2.5 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full flex-row items-center gap-1">
            <CivicIcon name="verified" size={13} color="#7ffc97" />
            <Text className="text-xs font-semibold text-white">
              Ruta verificada de 2.4 km
            </Text>
          </View>
        </View>

        {/* Descripción */}
        <Text className="text-sm text-gray-700 leading-relaxed mb-4">
          {item.descripcion}
        </Text>

        {/* Grid de Horario y Punto de Encuentro */}
        <View className="flex-row gap-2.5 mb-4">
          <View className="flex-1 bg-white border border-gray-200 p-3 rounded-2xl flex-row items-center gap-2.5 shadow-sm">
            <View className="w-9 h-9 rounded-xl bg-green-100 items-center justify-center">
              <CivicIcon name="schedule" size={18} color="#006b2c" />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Horario
              </Text>
              <Text className="text-xs font-bold text-gray-900" numberOfLines={1}>
                {item.movilidad_segura?.horario || 'Coordinar'}
              </Text>
            </View>
          </View>

          <View className="flex-1 bg-white border border-gray-200 p-3 rounded-2xl flex-row items-center gap-2.5 shadow-sm">
            <View className="w-9 h-9 rounded-xl bg-sky-100 items-center justify-center">
              <CivicIcon name="location-on" size={18} color="#006194" />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Encuentro
              </Text>
              <Text className="text-xs font-bold text-gray-900" numberOfLines={1}>
                {item.movilidad_segura?.punto_encuentro_publico || 'Punto público'}
              </Text>
            </View>
          </View>
        </View>

        {/* Perfil del Solicitante */}
        <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 flex-row items-center justify-between shadow-sm">
          <View className="flex-row items-center gap-3 flex-1 pr-2">
            <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center">
              <Text className="text-base font-bold text-green-800">
                {item.usuario_publico?.iniciales || 'CM'}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-gray-900">
                {item.usuario_publico?.nombre_publico}
              </Text>
              <Text className="text-xs text-gray-500 font-medium">
                {item.usuario_publico?.zona_aproximada}
              </Text>
              <Text className="text-[11px] text-sky-800 font-semibold mt-0.5">
                {item.usuario_publico?.aportes_cumplidos || 18} aportes solidarios • Miembro activo
              </Text>
            </View>
          </View>

          <View className="bg-sky-100 px-2.5 py-1.5 rounded-xl items-center justify-center">
            <CivicIcon name="verified-user" size={16} color="#006194" />
            <Text className="text-[10px] font-bold text-sky-900 uppercase tracking-wider mt-0.5">
              DNI OK
            </Text>
          </View>
        </View>

        {/* Protocolo de Movilidad Segura / Acuerdo Comunitario */}
        <View className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-24">
          <View className="flex-row items-center gap-2 mb-3">
            <CivicIcon name="security" size={20} color="#006b2c" />
            <Text className="text-sm font-bold text-gray-900">
              Condiciones de Movilidad Segura
            </Text>
          </View>

          <View className="space-y-2.5">
            <View className="flex-row items-start gap-2.5">
              <View className="w-5 h-5 rounded-full bg-green-100 items-center justify-center mt-0.5">
                <CivicIcon name="check" size={12} color="#006b2c" />
              </View>
              <Text className="text-xs text-gray-700 leading-tight flex-1">
                <Text className="font-bold text-gray-900">Punto público:</Text> Encuentro exclusivo en {item.movilidad_segura?.punto_encuentro_publico} a plena luz del día.
              </Text>
            </View>

            <View className="flex-row items-start gap-2.5 mt-2">
              <View className="w-5 h-5 rounded-full bg-green-100 items-center justify-center mt-0.5">
                <CivicIcon name="check" size={12} color="#006b2c" />
              </View>
              <Text className="text-xs text-gray-700 leading-tight flex-1">
                <Text className="font-bold text-gray-900">Gratuito y solidario:</Text> Prohibida cualquier compensación económica o cobro.
              </Text>
            </View>

            <View className="flex-row items-start gap-2.5 mt-2">
              <View className="w-5 h-5 rounded-full bg-green-100 items-center justify-center mt-0.5">
                <CivicIcon name="check" size={12} color="#006b2c" />
              </View>
              <Text className="text-xs text-gray-700 leading-tight flex-1">
                <Text className="font-bold text-gray-900">Protección al menor:</Text> Prohibido solicitar datos privados, rutas o fotografías de menores.
              </Text>
            </View>
          </View>

          {/* Botón de Prevención / Acoso */}
          <TouchableOpacity
            onPress={handleReportAcoso}
            className="mt-3.5 pt-3 border-t border-gray-200 flex-row items-center justify-between"
          >
            <Text className="text-xs font-semibold text-red-700">
              ¿Viste algo sospechoso? Reportar acoso
            </Text>
            <Text className="text-xs font-bold text-red-700">105 Policía</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* CTA Inferior */}
      <View className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-gray-200 px-4 py-3">
        <TouchableOpacity
          onPress={handleHelp}
          className="w-full bg-green-700 active:bg-green-800 py-3.5 rounded-xl flex-row items-center justify-center gap-2 shadow-sm"
        >
          <CivicIcon name="volunteer-activism" size={18} color="#ffffff" />
          <Text className="text-white font-bold text-sm">
            Puedo ayudar / Contactar por WhatsApp
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetalleSolidariaScreen;
