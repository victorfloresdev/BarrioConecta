import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

export const useEconomiaLocal = ({ tab = 'servicios', categoria = 'todos', busqueda = '' } = {}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarDatos = useCallback(async () => {
    setLoading(true);
    const data = await apiService.getEconomiaLocal({
      tab,
      categoria: categoria === 'todos' ? null : categoria,
      busqueda
    });
    setItems(data);
    setLoading(false);
  }, [tab, categoria, busqueda]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const toggleVistoBueno = async (item, usuarioId) => {
    if (item.autor_id === usuarioId) {
      return { success: false, motivo: 'auto_voto_prohibido' };
    }
    const res = await apiService.toggleVistoBueno(item.id, usuarioId);
    if (res.success) {
      setItems(prev =>
        prev.map(p => {
          if (p.id === item.id) {
            return {
              ...p,
              vistos_buenos: res.vistos_buenos,
              visto_bueno_activo: res.activo
            };
          }
          return p;
        })
      );
    }
    return res;
  };

  return {
    items,
    loading,
    recargar: cargarDatos,
    toggleVistoBueno
  };
};

export default useEconomiaLocal;
