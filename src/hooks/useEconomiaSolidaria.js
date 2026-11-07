import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const useEconomiaSolidaria = ({ tipoMuro = 'necesito', categoria = 'todos', busqueda = '' } = {}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    const data = await apiService.getEconomiaSolidaria({
      tipoMuro,
      categoria: categoria === 'todos' ? null : categoria,
      busqueda
    });
    setItems(data);
    setLoading(false);
  }, [tipoMuro, categoria, busqueda]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  return {
    items,
    loading,
    recargar: cargarDatos
  };
};

export default useEconomiaSolidaria;
