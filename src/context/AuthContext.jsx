import React, { createContext, useState, useEffect } from 'react';
import apiService from '../services/api';

export const AuthContext = createContext({
  usuario: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inicializar sesión con el usuario activo por defecto
    const u = apiService.getUsuarioActual();
    setUsuario(u);
    setLoading(false);
  }, []);

  const login = async (telefono) => {
    const res = await apiService.loginConTelefono(telefono);
    if (res.success) {
      setUsuario(res.usuario);
    }
    return res;
  };

  const register = async (datos) => {
    const res = await apiService.registrarUsuario(datos);
    if (res.success) {
      setUsuario(res.usuario);
    }
    return res;
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        isAuthenticated: !!usuario,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
