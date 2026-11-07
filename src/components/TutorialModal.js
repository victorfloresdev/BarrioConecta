import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { CivicIcon } from './CivicIcon';

export const TutorialModal = ({ visible, onClose }) => {
  const [paso, setPaso] = useState(0);

  const pasos = [
    {
      titulo: '¡Bienvenido a BarrioConecta!',
      subtitulo: 'La red solidaria de vecinos de tu barrio',
      desc: 'Encuentra productos y oficios recomendados a pocos pasos de tu casa, pide favores sin dinero y mantente coordinado ante cualquier emergencia.',
      icono: 'holiday-village',
      color: '#006b2c'
    },
    {
      titulo: '1. Visto Bueno Vecinal',
      subtitulo: 'Confianza de persona a persona',
      desc: 'Cada oficio o producto cuenta con recomendaciones y el respaldo de bodegas o ferreterías del barrio. ¡Sin intermediarios ni comisiones!',
      icono: 'thumb-up',
      color: '#006b2c'
    },
    {
      titulo: '2. Muro Solidario Sin Dinero',
      subtitulo: 'Trueque, herramientas y movilidad',
      desc: 'Si necesitas una muleta, una escalera o compartir movilidad escolar, publícalo en el muro. Los vecinos nos ayudamos mutuamente.',
      icono: 'volunteer-activism',
      color: '#006194'
    },
    {
      titulo: '3. Tablero Humanitario en Emergencias',
      subtitulo: 'Respuesta rápida en situaciones críticas',
      desc: 'Ante lluvias, huaicos o sismos, coordina agua, víveres y herramientas con tu cuadrilla barrial y números de auxilio directo como 105 o 116.',
      icono: 'warning',
      color: '#b61722'
    },
    {
      titulo: 'Modo Asistido para Adultos Mayores',
      subtitulo: 'Diseñado para ser fácil y legible',
      desc: 'Botones grandes, sin contraseñas difíciles y con opción para que un familiar o vecino de confianza publique por ti.',
      icono: 'accessibility-new',
      color: '#006b2c'
    }
  ];

  const actual = pasos[paso];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <View className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl border border-gray-200">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <View className="flex-row items-center gap-2">
              <View 
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: `${actual.color}15` }}
              >
                <CivicIcon name={actual.icono} size={24} color={actual.color} />
              </View>
              <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Guía paso {paso + 1} de 5
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} className="p-1">
              <CivicIcon name="close" size={22} color="#6e7b6c" />
            </TouchableOpacity>
          </View>

          {/* Contenido */}
          <Text className="text-xl font-bold text-gray-900 mb-1">
            {actual.titulo}
          </Text>
          <Text className="text-sm font-semibold text-green-700 mb-3">
            {actual.subtitulo}
          </Text>
          <Text className="text-sm text-gray-600 leading-relaxed mb-6">
            {actual.desc}
          </Text>

          {/* Indicadores de paso */}
          <View className="flex-row justify-center gap-1.5 mb-6">
            {pasos.map((_, i) => (
              <View
                key={i}
                className={`h-1.5 rounded-full ${
                  i === paso ? 'w-6 bg-green-700' : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </View>

          {/* Botones */}
          <View className="flex-row gap-3">
            {paso > 0 && (
              <TouchableOpacity
                onPress={() => setPaso(paso - 1)}
                className="flex-1 py-3 border border-gray-300 rounded-xl items-center"
              >
                <Text className="text-sm font-semibold text-gray-700">Anterior</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                if (paso < pasos.length - 1) {
                  setPaso(paso + 1);
                } else {
                  onClose();
                }
              }}
              className="flex-1 py-3 bg-green-700 rounded-xl items-center"
            >
              <Text className="text-sm font-bold text-white">
                {paso === pasos.length - 1 ? '¡Comenzar!' : 'Siguiente'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TutorialModal;
