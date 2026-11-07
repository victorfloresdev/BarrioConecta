# BarrioConecta (VeciRed) 🏘️🤝
### Aplicación Vecinal Solidaria — Hackathon El Comercio (8va Edición)

> Aplicación móvil colaborativa para que los ciudadanos obtengan productos y servicios con costos mínimos cerca de su residencia, avalados por recomendaciones de vecinos (Visto Bueno Vecinal), intercambien favores sin dinero y coordinen soporte humanitario ante situaciones de emergencia.

---

## 📱 Pantallas Adaptadas desde Stitch a React Native

1. **Inicio de Sesión (`LoginScreen`):** Ingreso con teléfono (+51) y contraseña, enlace a registro y pacto de confianza barrial.
2. **Registro Vecinal (`RegisterScreen`):** Registro de vecinos con sector/zona obligatoria y aviso de privacidad vecinal.
3. **Economía Local (`EconomiaLocalScreen`):** Feed de servicios y productos de proximidad, pestañas (Servicios, Productos, Trueques), filtros por categoría, tarjetas con distancia, sello avalador de ferreterías/bodegas y botón de Visto Bueno interactivo.
4. **Detalle de Economía Local (`DetalleEconomiaLocalScreen`):** Vista de detalle completa vía `route.params`, con fotos de muestras de trabajo, ubicación aproximada protegida y botón de contacto directo por WhatsApp con mensaje prearmado.
5. **Economía Solidaria / Muro de Favores (`EconomiaSolidariaScreen`):** Muro colaborativo sin dinero ("Piden Ayuda" vs "Ofrecen Ayuda"), buscador con dictado por voz para adultos mayores, y categorías: Movilidad, Herramientas, Tiempo.
6. **Detalle de Solicitud Solidaria (`DetalleSolidariaScreen`):** Coordinación de préstamo de herramientas y movilidad escolar solidaria con checklist de seguridad (lugar público, gratuidad y prevención).
7. **Tablero Humanitario de Emergencias (`TableroEmergenciasScreen`):** Activación de modo emergencia ante lluvias e inundaciones, botones rápidos SOS (105 Policía, 116 Bomberos, 115 INDECI, 106 SAMU) y directorio de centros de acopio y ollas comunes.
8. **Detalle de Emergencia / Recurso Crítico (`DetalleEmergenciaScreen`):** Reporte de insumos urgentes (agua, bidones, víveres), radio de seguridad ciudadana y botón de ofrecimiento de ayuda ("Tengo este recurso") con soporte para SMS sin internet.
9. **Publicación Paso 1 (`PublicarPaso1Screen`):** Flujo de publicación rápido en 3 toques: Ofrecer un servicio, vender un producto o intercambio solidario.
10. **Publicación Paso 2 (`PublicarPaso2Screen`):** Formulario de publicación con selector de categoría, modalidad de cobro (monto fijo, a convenir, trueque) y radio de visibilidad vecinal (2 km).
11. **Perfil Vecinal (`PerfilScreen`):** Datos del vecino, visto bueno otorgados, información offline y acceso al tutorial interactivo.
12. **Tutorial Accesible (`TutorialModal`):** Modal interactivo con letra grande, audio/dictado y modo asistido para adultos mayores.

---

## 🚀 Cómo Ejecutar y Probar la Aplicación

### Requisitos Previos
- Node.js (versión 18 o superior).
- Dispositivo móvil con la aplicación **Expo Go** instalada (disponible en Google Play Store y App Store) O navegador web para pruebas en computadora.

### 1. Clonar y abrir la carpeta del proyecto
```bash
cd "c:\Users\victo\UTP - Google Drive\Ciclo VI - Agosto-26\Hackathon El Comercio 8va edición\BarrioConecta"
```

### 2. Iniciar el servidor de desarrollo de Expo
```bash
npx expo start
```

### 3. Modos de prueba disponibles:

- **En tu teléfono celular (Recomendado):**
  1. Abre la cámara (iOS) o la app **Expo Go** (Android).
  2. Escanea el código QR que aparecerá en tu terminal.
  3. La aplicación se abrirá al instante en tu celular con todas las animaciones y vistas nativas.

- **En el Navegador Web (Para demostración rápida):**
  ```bash
  npm run web
  ```
  O presiona la tecla `w` en la consola donde corre Expo. Se abrirá automáticamente en `http://localhost:8081`.

- **En emulador de Android o Simulador iOS:**
  ```bash
  npm run android
  # o
  npm run ios
  ```

---

## 🔌 Cómo Cambiar del Backend Simulado a la API Real

El proyecto está diseñado bajo una arquitectura limpia desacoplada. Toda la lógica de conexión con el backend reside en:
📁 `src/services/api.js`

Cuando tu equipo de backend tenga listos los endpoints, **no es necesario tocar ninguna pantalla**. Solo abre `src/services/api.js` y modifica:

```javascript
export const API_CONFIG = {
  USE_MOCK: false, // <-- Cambiar a false
  BASE_URL: 'https://api-backend-de-tu-equipo.com/v1', // <-- Colocar URL del backend
  TIMEOUT_MS: 400
};
```

¡Listo! Automáticamente todas las pantallas consumirán las rutas REST (`/auth/login`, `/economia-local`, `/economia-solidaria`, `/emergencias`) utilizando exactamente la misma estructura de datos establecida en `mockData.js`.

---

## 📂 Estructura del Proyecto

```text
BarrioConecta/
├── App.js                   # Entrada principal con SafeAreaProvider y Navigation
├── index.js                 # Registro del Root Component con global.css
├── global.css               # Directivas de Tailwind CSS
├── tailwind.config.js       # Configuración y paleta oficial "Civic Hearth"
├── metro.config.js          # Integración de Metro con NativeWind
├── babel.config.js          # Presets de Babel para Expo y NativeWind
├── src/
│   ├── mockData.js          # Mock data oficial con entidades completas
│   ├── components/
│   │   ├── CivicIcon.js     # Componente normalizado de iconos Material
│   │   └── TutorialModal.js # Modal del tutorial interactivo accesible
│   ├── navigation/
│   │   └── AppNavigator.js  # Bottom Tabs y Stack Navigation completo
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── EconomiaLocalScreen.js
│   │   ├── DetalleEconomiaLocalScreen.js
│   │   ├── EconomiaSolidariaScreen.js
│   │   ├── DetalleSolidariaScreen.js
│   │   ├── TableroEmergenciasScreen.js
│   │   ├── DetalleEmergenciaScreen.js
│   │   ├── PublicarPaso1Screen.js
│   │   ├── PublicarPaso2Screen.js
│   │   └── PerfilScreen.js
│   └── services/
│       └── api.js           # Capa de backend simulado / API Gateway
└── docs/
    └── DOCUMENTACION_TECNICA.md # Especificación técnica profunda y seguridad
```

---

*Proyecto desarrollado con React Native, Expo y NativeWind para la 8va Edición del Hackathon El Comercio.*
