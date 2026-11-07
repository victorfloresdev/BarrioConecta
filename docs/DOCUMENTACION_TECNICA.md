# BarrioConecta / VeciRed — Documentación Técnica de Frontend
## Hackathon El Comercio — 8va Edición · Noviembre 2026

---

## 1. Visión General de la Arquitectura

**BarrioConecta** es una aplicación móvil desarrollada para conectar a los vecinos de un barrio, permitiéndoles:
1. Acceder a productos y servicios de proximidad a costos mínimos y con visto bueno vecinal (**Economía Local**).
2. Solicitar y ofrecer favores sin dinero: préstamo de herramientas, ayuda temporal, donación y movilidad solidaria (**Economía Solidaria**).
3. Coordinar auxilio inmediato y recursos críticos ante desastres naturales como lluvias e inundaciones (**Tablero Humanitario de Emergencias**).

### Stack Tecnológico
- **Framework Móvil:** React Native con Expo SDK 58 (React 19).
- **Estilos:** Tailwind CSS v3 mediante **NativeWind v4** (Design System "Civic Hearth").
- **Navegación:** `@react-navigation/native-stack` y `@react-navigation/bottom-tabs` v7.
- **Iconografía:** `@expo/vector-icons` (Google Material Icons).
- **Capa de Datos:** Backend simulado desacoplado (`src/services/api.js`) sobre `src/mockData.js`, preparado para migración transparente a API REST.

---

## 2. Correspondencia de Pantallas: Diseños de Stitch a React Native

Cada una de las pantallas diseñadas en Stitch fue minuciosamente adaptada respetando su identidad visual, tokens de color y microinteracciones:

| # | Pantalla en Stitch | Componente en React Native | Ruta / Navegación |
|---|---|---|---|
| 1 | `inicio_de_sesi_n_vecired` | `src/screens/LoginScreen.js` | Stack: `Login` |
| 2 | `registro_nete_a_tu_barrio` | `src/screens/RegisterScreen.js` | Stack: `Register` |
| 3 | `vista_principal_econom_a_local` | `src/screens/EconomiaLocalScreen.js` | Tab: `EconomiaLocalTab` |
| 4 | `detalle_de_publicaci_n_econom_a_local` | `src/screens/DetalleEconomiaLocalScreen.js` | Stack: `DetalleEconomiaLocal` |
| 5 | `muro_de_apoyo_vecinal_econom_a_solidaria` | `src/screens/EconomiaSolidariaScreen.js` | Tab: `EconomiaSolidariaTab` |
| 6 | `detalle_de_solicitud_solidaria` | `src/screens/DetalleSolidariaScreen.js` | Stack: `DetalleSolidaria` |
| 7 | `tablero_humanitario_emergencias` | `src/screens/TableroEmergenciasScreen.js` | Tab: `EmergenciasTab` |
| 8 | `detalle_de_emergencia_recurso_cr_tico` | `src/screens/DetalleEmergenciaScreen.js` | Stack: `DetalleEmergencia` |
| 9 | `selecci_n_de_publicaci_n_paso_1_de_3` | `src/screens/PublicarPaso1Screen.js` | Stack: `PublicarPaso1` (Paso 1 de 2: Comercio, Solidaridad, Emergencia) |
| 10 | Formulario Comercio | `src/screens/PublicarComercioScreen.js` | Stack: `PublicarComercio` (Paso 2 de 2: Selector Producto o Servicio) |
| 11 | Formulario Solidario | `src/screens/PublicarSolidariaScreen.js` | Stack: `PublicarSolidaria` (Paso 2 de 2: Necesito u Ofrezco Ayuda) |
| 12 | Formulario Emergencia | `src/screens/PublicarEmergenciaScreen.js` | Stack: `PublicarEmergencia` (Paso 2 de 2: Necesidad Crítica Comunitaria) |
| 13 | — Transversal — | `src/screens/PerfilScreen.js` | Tab: `PerfilTab` y Stack: `Perfil` |
| 14 | — Accesibilidad — | `src/components/TutorialModal.js` | Modal Reabrible (30s, audio y modo adulto mayor) |

---

## 3. Modelo de Datos y Backend Simulado (`mockData.js`)

El archivo `src/mockData.js` contiene la estructura JSON oficial solicitada, enriquecida con casos de uso reales del norte del Perú (Piura):

```json
{
  "usuarios": [
    {
      "id": "USR-001",
      "nombre": "María López",
      "telefono": "987654321",
      "zona_residencia": "Sector 4, Piura",
      "rol": "vecino",
      "vistos_buenos_otorgados": 3,
      "fecha_registro": "2026-11-06T10:00:00Z"
    }
  ],
  "economia_local": [
    {
      "id": "PUB-101",
      "autor_id": "USR-001",
      "tipo_publicacion": "servicio",
      "categoria": "gasfiteria",
      "titulo": "Reparación de tuberías y fugas",
      "descripcion": "Gasfitero con 10 años de experiencia. Trabajo rápido y limpio.",
      "precio_tipo": "a_convenir",
      "precio_monto": null,
      "vendedor": {
        "nombre_publico": "Juan Pérez",
        "zona_aproximada": "Sector 2, Piura",
        "sello_avalador": "Ferretería Don Pepe"
      },
      "distancia_km": 0.8,
      "vistos_buenos": 12,
      "fecha_publicacion": "2026-11-06T10:00:00Z",
      "estado": "activa"
    }
  ],
  "economia_solidaria": [
    {
      "id": "FAV-201",
      "autor_id": "USR-002",
      "tipo_muro": "necesito",
      "categoria_favor": "Movilidad",
      "titulo": "Necesito llevar a mis 2 hijos al Colegio San José",
      "descripcion": "Mi auto se malogró hoy. ¿Alguien tiene espacio a las 7:00 AM desde la plaza central?",
      "usuario_publico": {
        "nombre_publico": "Carlos Mendoza",
        "zona_aproximada": "Sector 3, Piura"
      },
      "movilidad_segura": {
        "punto_encuentro_publico": "Plaza Central",
        "pago_requerido": false
      },
      "fecha_publicacion": "2026-11-07T06:30:00Z",
      "fecha_vencimiento": "2026-12-07T06:30:00Z",
      "estado_intercambio": "activa"
    }
  ],
  "emergencias": [
    {
      "id": "EMG-301",
      "autor_id": "USR-003",
      "tipo_necesidad": "balde_bidon",
      "zona_aproximada": "Sector Bajo, Piura",
      "urgencia": "alta",
      "cantidad": "2 bidones",
      "distancia_km": 1.2,
      "fecha_reporte": "2026-11-07T12:00:00Z",
      "estado": "activa"
    }
  ]
}
```

### Mapeo a Componentes React Native
1. **Listas (`<FlatList>`):** 
   - `EconomiaLocalScreen`: Consume `apiService.getEconomiaLocal()` y mapea los campos `titulo`, `vendedor`, `distancia_km`, `vistos_buenos`, `sello_avalador`.
   - `EconomiaSolidariaScreen`: Consume `apiService.getEconomiaSolidaria()` y mapea `titulo`, `descripcion`, `usuario_publico`, `movilidad_segura.punto_encuentro_publico`.
   - `TableroEmergenciasScreen`: Consume `apiService.getEmergencias()` y mapea `titulo`, `cantidad`, `zona_aproximada`, `urgencia`, `distancia_km`.
2. **Vistas de Detalle (`route.params`):**
   - Al tocar cualquier tarjeta, el objeto completo se transfiere vía `navigation.navigate('PantallaDetalle', { item })`.
   - La pantalla de detalle extrae `const item = route.params?.item;` y puebla la vista con el perfil completo, el sello avalador y las acciones de contacto.

---

## 4. Transición hacia la API Real del Backend

La aplicación implementa el patrón **Service Gateway** en `src/services/api.js`.

Para cambiar de backend simulado a la API REST del equipo de backend:

1. Abrir `src/services/api.js`.
2. Modificar la constante de configuración:
   ```javascript
   export const API_CONFIG = {
     USE_MOCK: false, // <-- Cambiar a false
     BASE_URL: 'https://tu-servidor-backend.com/api/v1', // <-- Colocar URL del backend
     TIMEOUT_MS: 400
   };
   ```
3. Ningún componente (`.js`) ni vista requiere ser modificado, ya que todos consumen la interfaz estandarizada `apiService`.

---

## 5. Decisiones de Diseño y Seguridad (Ley Peruana de Datos Personales)

1. **Ubicación Pública Aproximada:**
   - La dirección exacta nunca se muestra públicamente. Se desplaza visualmente de 300 a 500 metros en el mapa de privacidad vecinal para proteger la seguridad ciudadana.
2. **Seguridad en Movilidad Solidaria:**
   - Checklist obligatorio de punto de encuentro público en horario diurno.
   - Prohibido publicar fotos, rutas exactas o nombres de menores de edad.
   - Botón directo de alerta al **105 (Policía Nacional del Perú)**.
3. **Emergencias y Ley SINAGERD (Ley 29664):**
   - Aviso permanente en el encabezado de emergencias indicando que se trata de un canal vecinal no oficial.
   - Enlaces telefónicos directos con un toque a los números de emergencia del Perú: **105** (Policía), **116** (Bomberos), **115** (Defensa Civil / INDECI) y **106** (SAMU).
   - Botón de auxilio por SMS para zonas sin conexión de datos móviles.

---

## 6. Reglas de Negocio y Flujos Especializados

1. **Bloqueo de Auto-Visto Bueno Vecinal:**
   - Para salvaguardar la confianza comunitaria, ningún usuario puede otorgarse "visto bueno" o recomendación a sus propias publicaciones.
   - Tanto `EconomiaLocalScreen` como `DetalleEconomiaLocalScreen` identifican `item.autor_id === usuarioActual.id`, mostrando el badge informativo *"Tu publicación"* y deshabilitando la interacción de auto-voto.
   - A nivel de capa de datos (`apiService.toggleVistoBueno`), se valida la autoría y se retorna `{ success: false, motivo: 'auto_voto_prohibido' }`.

2. **Flujo de Publicación Unificado en 2 Pasos:**
   - **Paso 1 de 2 (`PublicarPaso1Screen`):** Selector de 3 categorías principales sin fragmentación ni textos superfluos:
     1. *Ofrecer un producto o servicio*
     2. *Solicitar ayuda vecinal*
     3. *Solicitud de emergencia*
   - **Paso 2 de 2:** Formularios especializados por propósito:
     - `PublicarComercioScreen`: Selector toggle entre Producto o Servicio, categorías dinámicas, modalidad de cobro y área de visibilidad vecinal (2 km).
     - `PublicarSolidariaScreen`: Selector de Muro entre Necesito u Ofrezco ayuda, punto de encuentro público seguro, horario y urgencia.
     - `PublicarEmergenciaScreen`: Necesidad crítica comunitaria (agua, víveres, drenaje, primeros auxilios), personas en riesgo y zona con referencia vecinal.

3. **Navegación Contextual al Publicar:**
   - Tras registrar un nuevo anuncio en Comercio, la app redirige directamente a la pestaña `EconomiaLocalTab`.
   - Tras registrar una solicitud de ayuda, redirige a `EconomiaSolidariaTab`.
   - Tras reportar una emergencia crítica, redirige a `EmergenciasTab`.
   - La nueva publicación aparece inmediatamente al tope de la lista gracias a la reactividad de `apiService`.
