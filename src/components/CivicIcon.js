import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export const CivicIcon = ({ name, size = 20, color = '#141b2b', style }) => {
  return <MaterialIcons name={name} size={size} color={color} style={style} />;
};

export default CivicIcon;
