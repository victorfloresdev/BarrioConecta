/**
 * Mock Data para BarrioConecta / VeciRed
 * Estructura oficial alineada al JSON del reto y a las pantallas generadas en Stitch.
 * Permite simular el backend y mapear directamente a <FlatList> y route.params.
 */

export const mockData = {
  usuarios: [
    {
      id: "USR-001",
      nombre: "María López",
      telefono: "987654321",
      zona_residencia: "Sector 4, Piura",
      rol: "vecino",
      vistos_buenos_otorgados: 3,
      fecha_registro: "2026-11-06T10:00:00Z",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80",
      oficio: "Confección y Costura",
      bio: "Vecina activa en el Sector 4. Promuevo el apoyo mutuo y compras de proximidad."
    },
    {
      id: "USR-002",
      nombre: "Carlos Mendoza",
      telefono: "981234567",
      zona_residencia: "Sector 3, Piura",
      rol: "vecino",
      vistos_buenos_otorgados: 7,
      fecha_registro: "2026-10-15T08:30:00Z",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
      aportes_solidarios: 18,
      verificado_dni: true
    },
    {
      id: "USR-003",
      nombre: "Familia Gómez",
      telefono: "976543210",
      zona_residencia: "Sector Bajo, Piura",
      rol: "vecino",
      vistos_buenos_otorgados: 1,
      fecha_registro: "2026-11-01T14:00:00Z"
    },
    {
      id: "USR-MOD",
      nombre: "Coordinador Comunitario",
      telefono: "980000105",
      zona_residencia: "Sector Central, Piura",
      rol: "moderador",
      vistos_buenos_otorgados: 45,
      fecha_registro: "2026-01-01T00:00:00Z"
    }
  ],

  economia_local: [
    {
      id: "PUB-101",
      autor_id: "USR-001",
      tipo_publicacion: "servicio",
      categoria: "gasfiteria",
      categoria_label: "Gasfitería",
      titulo: "Reparación de tuberías y fugas",
      descripcion: "Gasfitero con 10 años de experiencia. Trabajo rápido y limpio. Detección de fugas sin romper de más, cambio de griferías, desatoros y diagnóstico con herramientas propias en el barrio.",
      precio_tipo: "a_convenir",
      precio_monto: null,
      disponibilidad: "Disponible hoy",
      vendedor: {
        nombre_publico: "Juan Pérez",
        zona_aproximada: "Sector 2, Piura",
        sello_avalador: "Ferretería Don Pepe",
        telefono: "987654321",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80",
        descripcion_avalador: "Negocio del barrio verificado con más de 14 años en la Calle Piura 240."
      },
      distancia_km: 0.8,
      vistos_buenos: 12,
      fecha_publicacion: "2026-11-06T10:00:00Z",
      estado: "activa",
      imagen: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80",
      beneficios: ["Sin cobro por traslado", "Garantía de 30 días"]
    },
    {
      id: "PUB-102",
      autor_id: "USR-001",
      tipo_publicacion: "servicio",
      categoria: "electricidad",
      categoria_label: "Electricidad",
      titulo: "Instalación de tableros y cableado residencial",
      descripcion: "Técnico electricista certificado. Reparación de cortocircuitos, instalación de llaves térmicas y diferenciales para proteger tu hogar.",
      precio_tipo: "monto_fijo",
      precio_monto: 45.0,
      disponibilidad: "Atención inmediata",
      vendedor: {
        nombre_publico: "Marcos Chiroque",
        zona_aproximada: "Sector 1, Piura",
        sello_avalador: "Bodega San Martín",
        telefono: "987112233",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
        descripcion_avalador: "Vecino y comerciante reconocido en el sector."
      },
      distancia_km: 1.1,
      vistos_buenos: 19,
      fecha_publicacion: "2026-11-05T15:20:00Z",
      estado: "activa",
      imagen: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
      beneficios: ["Materiales de calidad", "Revisión preventiva"]
    },
    {
      id: "PUB-103",
      autor_id: "USR-002",
      tipo_publicacion: "producto",
      categoria: "alimentos",
      categoria_label: "Alimentos",
      titulo: "Pastelitos caseros y lasañas frescas",
      descripcion: "Lasañas familiares y pastelitos de choclo preparados cada mañana con receta tradicional norteña. Porciones generosas para compartir en familia.",
      precio_tipo: "monto_fijo",
      precio_monto: 18.0,
      disponibilidad: "Horneado diario a las 11:00 AM",
      vendedor: {
        nombre_publico: "Doña Carmen Rivas",
        zona_aproximada: "Sector 4, Piura",
        sello_avalador: "Parroquia San Francisco",
        telefono: "981998877",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
        descripcion_avalador: "Colaboradora comunitaria y emprendedora barrial."
      },
      distancia_km: 0.5,
      vistos_buenos: 28,
      fecha_publicacion: "2026-11-07T08:00:00Z",
      estado: "activa",
      imagen: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80",
      beneficios: ["Ingredientes 100% frescos", "Entrega en puerta o recojo"]
    },
    {
      id: "PUB-104",
      autor_id: "USR-002",
      tipo_publicacion: "servicio",
      categoria: "clases",
      categoria_label: "Clases y Tutoría",
      titulo: "Reforzamiento escolar en Matemáticas y Física",
      descripcion: "Profesor de secundaria con paciencia y metodología didáctica para primaria y secundaria. Preparación para exámenes bimestrales.",
      precio_tipo: "monto_fijo",
      precio_monto: 20.0,
      disponibilidad: "Tardes de 3:00 a 7:00 PM",
      vendedor: {
        nombre_publico: "Prof. Víctor Seminario",
        zona_aproximada: "Sector 3, Piura",
        sello_avalador: "Librería Estudiantil Grau",
        telefono: "985443322",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80",
        descripcion_avalador: "Librería del barrio vecinal desde 2010."
      },
      distancia_km: 0.6,
      vistos_buenos: 15,
      fecha_publicacion: "2026-11-04T12:00:00Z",
      estado: "activa",
      imagen: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
      beneficios: ["Material de ejercicios incluido", "Primera clase de prueba"]
    },
    {
      id: "PUB-105",
      autor_id: "USR-001",
      tipo_publicacion: "servicio",
      categoria: "cerrajeria",
      categoria_label: "Cerrajería",
      titulo: "Apertura rápida de puertas y duplicados",
      descripcion: "Cerrajero de confianza. Solución de emergencias sin romper la chapa. Duplicados a domicilio y cambio de guardas.",
      precio_tipo: "a_convenir",
      precio_monto: null,
      disponibilidad: "Emergencias 24/7",
      vendedor: {
        nombre_publico: "Don Lucho Cerrajero",
        zona_aproximada: "Sector 2, Piura",
        sello_avalador: "Ferretería El Tornillo",
        telefono: "986778899",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80",
        descripcion_avalador: "Taller autorizado de cerrajería tradicional."
      },
      distancia_km: 0.9,
      vistos_buenos: 22,
      fecha_publicacion: "2026-11-06T18:00:00Z",
      estado: "activa",
      imagen: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
      beneficios: ["Respuesta en menos de 20 min", "Tarifa transparente"]
    }
  ],

  economia_solidaria: [
    {
      id: "FAV-201",
      autor_id: "USR-002",
      tipo_muro: "necesito",
      categoria_favor: "Movilidad",
      titulo: "Necesito llevar a mis 2 hijos al Colegio San José",
      descripcion: "Mi auto se malogró hoy. ¿Alguien tiene espacio a las 7:00 AM desde la plaza central? Los niños van con uniforme escolar y yo los acompaño en todo momento.",
      urgencia: "alta",
      distancia_km: 0.45,
      tiempo_relativo: "Hace 10 min",
      usuario_publico: {
        nombre_publico: "Carlos Mendoza",
        zona_aproximada: "Sector 3, Piura",
        iniciales: "CM",
        verificado: true,
        aportes_cumplidos: 18,
        telefono: "981234567"
      },
      movilidad_segura: {
        punto_encuentro_publico: "Plaza Central",
        pago_requerido: false,
        horario: "7:00 AM puntual",
        ruta_distancia_km: 2.4,
        condiciones: [
          { titulo: "Punto público", desc: "Encuentro exclusivo en Plaza Central a plena luz del día." },
          { titulo: "Gratuito y solidario", desc: "Prohibida cualquier compensación económica o cobro." },
          { titulo: "Acompañamiento obligatorio", desc: "El padre de familia acompaña durante todo el trayecto." }
        ]
      },
      fecha_publicacion: "2026-11-07T06:30:00Z",
      fecha_vencimiento: "2026-12-07T06:30:00Z",
      estado_intercambio: "activa"
    },
    {
      id: "FAV-202",
      autor_id: "USR-001",
      tipo_muro: "necesito",
      categoria_favor: "Herramientas",
      titulo: "Préstamo de escalera telescópica 4m",
      descripcion: "Necesito pintar la fachada antes de las lluvias de este fin de semana. Devuelvo el domingo intacta con acuerdo firmado.",
      urgencia: "alta",
      distancia_km: 1.2,
      tiempo_relativo: "Hace 25 min",
      usuario_publico: {
        nombre_publico: "Elena R.",
        zona_aproximada: "Sector 3, Piura",
        iniciales: "ER",
        verificado: true,
        aportes_cumplidos: 6,
        telefono: "987654321"
      },
      movilidad_segura: {
        punto_encuentro_publico: "Parque de las Flores",
        pago_requerido: false,
        horario: "Sábado 8:00 AM",
        condiciones: [
          { titulo: "Foto de estado", desc: "Se registra foto al entregar y al devolver." },
          { titulo: "Sin costo", desc: "Préstamo solidario vecinal." }
        ]
      },
      fecha_publicacion: "2026-11-07T07:15:00Z",
      fecha_vencimiento: "2026-12-07T07:15:00Z",
      estado_intercambio: "activa"
    },
    {
      id: "FAV-203",
      autor_id: "USR-001",
      tipo_muro: "ofrezco",
      categoria_favor: "Herramientas",
      titulo: "Presto muletas ortopédicas de aluminio para adulto",
      descripcion: "Mi hermano ya se recuperó de su esguince. Quedaron desinfectadas y en perfecto estado. Para cualquier vecino que las necesite temporalmente.",
      urgencia: "normal",
      distancia_km: 0.3,
      tiempo_relativo: "Hace 1 hora",
      usuario_publico: {
        nombre_publico: "Rosa Palacios",
        zona_aproximada: "Sector 2, Piura",
        iniciales: "RP",
        verificado: true,
        aportes_cumplidos: 9,
        telefono: "982334455"
      },
      movilidad_segura: {
        punto_encuentro_publico: "Bodega Don Pepe en Calle Piura",
        pago_requerido: false,
        horario: "Coordinar por la tarde",
        condiciones: [
          { titulo: "Devolución pactada", desc: "Uso por semanas según prescripción médica." }
        ]
      },
      fecha_publicacion: "2026-11-07T05:00:00Z",
      fecha_vencimiento: "2026-12-07T05:00:00Z",
      estado_intercambio: "activa"
    },
    {
      id: "FAV-204",
      autor_id: "USR-002",
      tipo_muro: "ofrezco",
      categoria_favor: "Tiempo",
      titulo: "Paseo de mascotas para adultos mayores",
      descripcion: "Tengo disponibilidad por las mañanas de 7 a 9 AM. Apoyo a vecinos de la tercera edad paseando a sus perritos en el parque local.",
      urgencia: "normal",
      distancia_km: 0.7,
      tiempo_relativo: "Hace 3 horas",
      usuario_publico: {
        nombre_publico: "Diego Castro",
        zona_aproximada: "Sector 1, Piura",
        iniciales: "DC",
        verificado: true,
        aportes_cumplidos: 12,
        telefono: "983445566"
      },
      movilidad_segura: {
        punto_encuentro_publico: "Parque Grau",
        pago_requerido: false,
        horario: "Lunes a Viernes 7:30 AM",
        condiciones: [
          { titulo: "Cuidado responsable", desc: "Mascotas con correa y cartilla al día." }
        ]
      },
      fecha_publicacion: "2026-11-06T20:00:00Z",
      fecha_vencimiento: "2026-12-06T20:00:00Z",
      estado_intercambio: "activa"
    }
  ],

  emergencias: [
    {
      id: "EMG-301",
      codigo: "VEC-048",
      autor_id: "USR-003",
      tipo_necesidad: "balde_bidon",
      tipo_label: "Agua / Bidones",
      zona_aproximada: "Sector Bajo, Piura",
      referencia_ubicacion: "Capilla San Pedro con Calle Las Malvinas",
      urgencia: "alta",
      cantidad: "2 bidones",
      titulo: "Necesitamos 2 bidones de agua limpia",
      descripcion: "El Sector Bajo está inundado y se cortó el suministro principal. Hay 3 familias agrupadas esperando apoyo con niños pequeños y personas adultas mayores.",
      distancia_km: 1.2,
      tiempo_relativo: "Hace 2 horas",
      fecha_reporte: "2026-11-07T12:00:00Z",
      estado: "activa",
      recurso_critico: true,
      personas_en_riesgo: "11 personas de 3 familias",
      prioridad_motivo: "Corte general de suministro",
      coordinador: {
        nombre: "Carlos P.",
        cuadrilla: "Cuadrilla VeciRed Sector 4",
        telefono: "980112233"
      }
    },
    {
      id: "EMG-302",
      codigo: "VEC-049",
      autor_id: "USR-003",
      tipo_necesidad: "alimentos",
      tipo_label: "Alimentos No Perecibles",
      zona_aproximada: "Sector Río Seco, Piura",
      referencia_ubicacion: "Local Comunal Santa Rosa",
      urgencia: "alta",
      cantidad: "Canasta familiar para 4 personas",
      titulo: "Alimentos básicos para Olla Común de emergencia",
      descripcion: "Habilitamos punto de almuerzo solidario para vecinos afectados por el aniego. Se requiere arroz, menestras, atún y aceite.",
      distancia_km: 1.8,
      tiempo_relativo: "Hace 45 min",
      fecha_reporte: "2026-11-07T14:15:00Z",
      estado: "activa",
      recurso_critico: true,
      personas_en_riesgo: "35 vecinos atendidos",
      prioridad_motivo: "Olla comunal activa",
      coordinador: {
        nombre: "Sra. Bertha Ruiz",
        cuadrilla: "Comité Vaso de Leche",
        telefono: "981445566"
      }
    },
    {
      id: "EMG-303",
      codigo: "VEC-050",
      autor_id: "USR-001",
      tipo_necesidad: "herramientas",
      tipo_label: "Herramientas de Drenaje",
      zona_aproximada: "Sector 2, Piura",
      referencia_ubicacion: "Av. Grau cruce con Jr. Junín",
      urgencia: "media",
      cantidad: "3 palas y 1 motobomba portátil",
      titulo: "Palas y motobomba para evacuar aguas estancadas",
      descripcion: "La cuadra 3 está con 20 cm de agua tras la lluvia de la madrugada. Vecinos organizados están desaguando.",
      distancia_km: 0.9,
      tiempo_relativo: "Hace 3 horas",
      fecha_reporte: "2026-11-07T11:00:00Z",
      estado: "activa",
      recurso_critico: false,
      personas_en_riesgo: "6 viviendas",
      prioridad_motivo: "Evitar filtración a cimientos",
      coordinador: {
        nombre: "Manuel Flores",
        cuadrilla: "Junta Vecinal Sector 2",
        telefono: "982556677"
      }
    }
  ],

  // Directorio de Apoyo Institucional y Comunitario en Emergencias
  directorio_apoyo: [
    {
      id: "DIR-01",
      nombre: "Centro de Acopio Norte - Parroquia San José",
      tipo: "Centro de Acopio",
      direccion: "Av. Los Cocos 450, Piura",
      telefono: "073-304050",
      estado: "Habilitado 24h",
      recursos_disponibles: "Agua embotellada, frazadas, botiquín"
    },
    {
      id: "DIR-02",
      nombre: "Olla Común 'Madres Unidas'",
      tipo: "Comedor Comunitario",
      direccion: "Sector Bajo Mz. F Lote 12",
      telefono: "989001122",
      estado: "Almuerzo y cena",
      recursos_disponibles: "Raciones calientes para damnificados"
    },
    {
      id: "DIR-03",
      nombre: "Punto de Agua Potable Comunal Cisterna EPS",
      tipo: "Abastecimiento de Agua",
      direccion: "Parque Infantil Sector 3",
      telefono: "073-322211",
      estado: "Llegada 9:00 AM y 4:00 PM",
      recursos_disponibles: "Distribución gratuita en recipientes limpios"
    }
  ],

  // Números oficiales de emergencia del Perú (Ley SINAGERD)
  telefonos_sos: [
    { numero: "105", nombre: "Policía Nacional", sigla: "PNP", icono: "local-police" },
    { numero: "116", nombre: "Bomberos del Perú", sigla: "CGBVP", icono: "fire-truck" },
    { numero: "115", nombre: "Defensa Civil", sigla: "INDECI", icono: "campaign" },
    { numero: "106", nombre: "Atención Médica Móvil", sigla: "SAMU", icono: "medical-services" }
  ]
};

export default mockData;
