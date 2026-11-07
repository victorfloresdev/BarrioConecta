import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const useEmergencias = ({ categoria = 'todos', busqueda = '' } = {}) => {
  const [items, setItems] = useState([]);
  const [directorio, setDirectorio] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    const data = await apiService.getEmergencias({
      categoria: categoria === 'todos' ? null : categoria,
      busqueda
    });
    setItems(data);
    const dir = await apiService.getDirectorioApoyo();
    setDirectorio(dir);
    setLoading(false);
  }, [categoria, busqueda]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  return {
    items,
    directorio,
    loading,
    recargar: cargarDatos
  };
};

export default useEmergencias;
