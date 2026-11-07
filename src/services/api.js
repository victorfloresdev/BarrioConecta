/**
 * Servicio de API - BarrioConecta
 * 
 * Actualmente opera en modo SIMULADO (Mock Backend) utilizando mockData.js.
 * Cuando el equipo de backend tenga listos los endpoints, solo se debe cambiar
 * USE_MOCK = false y configurar la BASE_URL correspondiente.
 */

import { mockData } from '../mockData';

export const API_CONFIG = {
  USE_MOCK: true,
  BASE_URL: 'https://api.barrioconecta.pe/v1', // URL base futura del backend
  TIMEOUT_MS: 400
};

// Estado en memoria para simular mutaciones (crear publicaciones, visto bueno, etc.)
let localEconomia = [...mockData.economia_local];
let localSolidaria = [...mockData.economia_solidaria];
let localEmergencias = [...mockData.emergencias];
let usuarioActual = mockData.usuarios[0]; // María López por defecto

const delay = (ms = API_CONFIG.TIMEOUT_MS) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  // Autenticación simulada
  login: async (telefono, password) => {
    if (API_CONFIG.USE_MOCK) {
      await delay(300);
      const user = mockData.usuarios.find(u => u.telefono === telefono) || {
        ...mockData.usuarios[0],
        telefono
      };
      usuarioActual = user;
      return { success: true, user, token: 'mock-jwt-token-vecired-2026' };
    }
    const res = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefono, password })
    });
    return await res.json();
  },

  registro: async ({ nombre, telefono, zona_residencia, password }) => {
    if (API_CONFIG.USE_MOCK) {
      await delay(400);
      const nuevoUsuario = {
        id: `USR-${Date.now().toString().slice(-4)}`,
        nombre,
        telefono,
        zona_residencia: zona_residencia || 'Sector 1, Piura',
        rol: 'vecino',
        vistos_buenos_otorgados: 0,
        fecha_registro: new Date().toISOString()
      };
      usuarioActual = nuevoUsuario;
      return { success: true, user: nuevoUsuario, token: 'mock-jwt-token-new' };
    }
    const res = await fetch(`${API_CONFIG.BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, telefono, zona_residencia, password })
    });
    return await res.json();
  },

  getUsuarioActual: () => usuarioActual,

  // Economía Local
  getEconomiaLocal: async ({ tab = 'servicios', categoria = 'todos', busqueda = '' } = {}) => {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      let resultado = [...localEconomia];

      // Filtro por pestaña (servicios, productos, trueques)
      if (tab === 'servicios') {
        resultado = resultado.filter(item => item.tipo_publicacion === 'servicio');
      } else if (tab === 'productos') {
        resultado = resultado.filter(item => item.tipo_publicacion === 'producto');
      } else if (tab === 'trueques') {
        resultado = resultado.filter(item => item.precio_tipo === 'a_convenir' || item.precio_tipo === 'trueque');
      }

      // Filtro por categoría
      if (categoria && categoria !== 'todos') {
        resultado = resultado.filter(item => 
          item.categoria.toLowerCase() === categoria.toLowerCase()
        );
      }

      // Búsqueda por texto
      if (busqueda.trim()) {
        const query = busqueda.toLowerCase();
        resultado = resultado.filter(item => 
          item.titulo.toLowerCase().includes(query) ||
          item.descripcion.toLowerCase().includes(query) ||
          item.vendedor.nombre_publico.toLowerCase().includes(query)
        );
      }

      return resultado;
    }

    const params = new URLSearchParams({ tab, categoria, busqueda });
    const res = await fetch(`${API_CONFIG.BASE_URL}/economia-local?${params}`);
    return await res.json();
  },

  // Toggle de Visto Bueno Vecinal
  toggleVistoBueno: async (publicacionId) => {
    if (API_CONFIG.USE_MOCK) {
      await delay(150);
      const item = localEconomia.find(p => p.id === publicacionId);
      if (item) {
        item.visto_bueno_activo = !item.visto_bueno_activo;
        item.vistos_buenos += item.visto_bueno_activo ? 1 : -1;
        return { success: true, vistos_buenos: item.vistos_buenos, activo: item.visto_bueno_activo };
      }
      return { success: false };
    }
    const res = await fetch(`${API_CONFIG.BASE_URL}/economia-local/${publicacionId}/visto-bueno`, {
      method: 'POST'
    });
    return await res.json();
  },

  // Economía Solidaria / Muro de Favores
  getEconomiaSolidaria: async ({ tipoMuro = 'necesito', categoria = 'todos', busqueda = '' } = {}) => {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      let resultado = [...localSolidaria];

      if (tipoMuro) {
        resultado = resultado.filter(item => item.tipo_muro === tipoMuro);
      }

      if (categoria && categoria !== 'todos') {
        resultado = resultado.filter(item => 
          item.categoria_favor.toLowerCase() === categoria.toLowerCase()
        );
      }

      if (busqueda.trim()) {
        const query = busqueda.toLowerCase();
        resultado = resultado.filter(item =>
          item.titulo.toLowerCase().includes(query) ||
          item.descripcion.toLowerCase().includes(query) ||
          item.usuario_publico.nombre_publico.toLowerCase().includes(query)
        );
      }

      return resultado;
    }

    const params = new URLSearchParams({ tipoMuro, categoria, busqueda });
    const res = await fetch(`${API_CONFIG.BASE_URL}/economia-solidaria?${params}`);
    return await res.json();
  },

  // Emergencias / Tablero Humanitario
  getEmergencias: async ({ busqueda = '', categoria = 'todos' } = {}) => {
    if (API_CONFIG.USE_MOCK) {
      await delay();
      let resultado = [...localEmergencias];

      if (categoria && categoria !== 'todos') {
        resultado = resultado.filter(item => 
          item.tipo_necesidad.toLowerCase().includes(categoria.toLowerCase())
        );
      }

      if (busqueda.trim()) {
        const query = busqueda.toLowerCase();
        resultado = resultado.filter(item =>
          item.titulo.toLowerCase().includes(query) ||
          item.descripcion.toLowerCase().includes(query) ||
          item.zona_aproximada.toLowerCase().includes(query)
        );
      }

      return resultado;
    }

    const params = new URLSearchParams({ busqueda, categoria });
    const res = await fetch(`${API_CONFIG.BASE_URL}/emergencias?${params}`);
    return await res.json();
  },

  getDirectorioApoyo: async () => {
    if (API_CONFIG.USE_MOCK) {
      await delay(200);
      return mockData.directorio_apoyo;
    }
    const res = await fetch(`${API_CONFIG.BASE_URL}/emergencias/directorio`);
    return await res.json();
  },

  // Crear nueva publicación
  crearPublicacion: async (datos) => {
    if (API_CONFIG.USE_MOCK) {
      await delay(500);
      const nueva = {
        id: `PUB-${Date.now().toString().slice(-4)}`,
        autor_id: usuarioActual.id,
        tipo_publicacion: datos.tipo_publicacion || 'servicio',
        categoria: datos.categoria || 'gasfiteria',
        categoria_label: datos.categoria_label || 'Servicio General',
        titulo: datos.titulo,
        descripcion: datos.descripcion,
        precio_tipo: datos.precio_tipo || 'a_convenir',
        precio_monto: datos.precio_monto || null,
        disponibilidad: 'Disponible hoy',
        vendedor: {
          nombre_publico: usuarioActual.nombre,
          zona_aproximada: usuarioActual.zona_residencia,
          sello_avalador: 'Avalado por Junta Vecinal',
          telefono: usuarioActual.telefono,
          avatar: usuarioActual.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'
        },
        distancia_km: 0.2,
        vistos_buenos: 0,
        fecha_publicacion: new Date().toISOString(),
        estado: 'activa',
        imagen: datos.imagen || 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
        beneficios: ['Trato directo con vecino', 'Cercanía garantizada']
      };
      localEconomia.unshift(nueva);
      return { success: true, publicacion: nueva };
    }

    const res = await fetch(`${API_CONFIG.BASE_URL}/economia-local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    return await res.json();
  },

  // Notificar ayuda en emergencia
  responderEmergencia: async (emergenciaId, mensaje) => {
    if (API_CONFIG.USE_MOCK) {
      await delay(300);
      return {
        success: true,
        mensaje: 'Tu disposición de ayuda ha sido comunicada a la cuadrilla de respuesta inmediata.'
      };
    }
    const res = await fetch(`${API_CONFIG.BASE_URL}/emergencias/${emergenciaId}/responder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje })
    });
    return await res.json();
  }
};

export default apiService;
