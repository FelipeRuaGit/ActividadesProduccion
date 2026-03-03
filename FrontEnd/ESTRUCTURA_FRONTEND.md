# Estructura del Frontend - Gestión de Actividades Productivas

## 📁 Estructura General

```
FrontEnd/frontend/src/
├── 📂 assets/                    # Recursos estáticos
│   └── 📂 img/                   # Imágenes
│
├── 📂 features/                  # Módulos por funcionalidad (Feature-based)
│   ├── 📂 actividades/           # Actividades Productivas
│   ├── 📂 Aseo/                  # Actividades de Aseo
│   ├── 📂 auth/                  # Autenticación
│   ├── 📂 dashboard/             # Dashboard (vacío)
│   ├── 📂 Funciones/             # Gestión de Funciones
│   ├── 📂 lote/                  # Gestión de Lotes
│   └── 📂 user/                  # Gestión de Usuarios
│
├── 📂 shared/                    # Código compartido
│   ├── 📂 componets/             # Componentes reutilizables
│   ├── 📂 hooks/                 # Custom hooks
│   ├── 📂 service/               # Servicios API
│   ├── 📂 styles/                # Estilos globales
│   ├── 📂 utils/                 # Utilidades
│   └── 📂 validators/            # Validadores
│
└── 📄 Archivos raíz              # Configuración y entrada
    ├── App.tsx
    ├── index.tsx
    ├── main.tsx
    └── ...
```

---

## 🎯 Módulos de Features

### 1. Actividades Productivas (`features/actividades/`)

```
actividades/
├── 📂 components/
│   ├── 📂 modal/                 # Modales (detalles, edición)
│   ├── 📂 sidebar/               # Sidebar específico
│   ├── 📂 table/                 # Tabla de actividades
│   │   └── ActivitiesTable.tsx
│   └── AddActivityForm.tsx       # Formulario agregar
│
├── 📂 context/
│   └── ActividadStore.ts         # Estado global (Zustand)
│
├── 📂 DTOs/
│   ├── IGetActivitiesDTO.ts      # DTO para recibir datos
│   └── ISendActivityDTO.ts       # DTO para enviar datos
│
├── 📂 hooks/
│   ├── useActivity.tsx           # Hook principal
│   └── useEmptyTheActivityRef.tsx
│
├── 📂 interfaces/
│   ├── 📂 context/               # Interfaces de contexto
│   └── 📂 refs/                  # Interfaces de referencias
│
├── 📂 models/
│   └── IActividadModel.ts        # Modelo de datos
│
├── 📂 pages/
│   └── ActividadPages.tsx        # Página principal
│
└── 📂 utils/
    └── validateActivityData.ts   # Validaciones específicas
```

### 2. Actividades de Aseo (`features/Aseo/`)

```
Aseo/
├── 📂 components/
│   ├── 📂 modal/
│   │   └── ActivityDetailAseoForm.tsx
│   ├── 📂 sidebar/
│   │   └── SideBarActivity.tsx
│   ├── 📂 table/
│   │   └── ActivitiesAseoTable.tsx
│   └── AddActividadAseoForm.tsx
│
├── 📂 context/
│   └── activitiesAseoStore.ts
│
├── 📂 DTOs/
│   ├── IGetActivityAseoDTO.ts
│   └── ISendActivityAseoDTO.ts
│
├── 📂 hooks/
│   ├── useActivity.tsx
│   └── useEmptyTheActivityRef.tsx
│
├── 📂 interfaces/
│   ├── 📂 context/
│   └── 📂 refs/
│
├── 📂 models/
│   └── IActivityAseoModel.ts
│
├── 📂 pages/
│   └── ActivitiesAseoPage.tsx
│
└── 📂 utils/
    └── validateActivityData.ts
```

### 3. Autenticación (`features/auth/`)

```
auth/
├── 📂 components/
│   ├── AuthForm.tsx              # Formulario de login
│   └── LogoutButton.tsx          # Botón cerrar sesión
│
├── 📂 context/
│   └── LoginStore.tsx            # Estado de autenticación
│
├── 📂 interfaces/
│   ├── 📂 context/
│   │   └── ILoginStore.ts
│   └── 📂 DTOs/
│       └── ISendCredentialsDTO.ts
│
├── 📂 pages/
│   └── LoginPages.tsx            # Página de login
│
├── 📂 refs/
│   └── ILoginRef.ts
│
└── 📂 utils/
    ├── isTokenExpired.ts         # Validar token
    └── setToken.ts               # Guardar token
```

### 4. Usuarios (`features/user/`)

```
user/
├── 📂 context/
│   └── userStore.ts              # Estado de usuarios
│
├── 📂 domain/
│   └── IUserModel.ts             # Modelo de usuario
│
├── 📂 DTOs/
│   ├── IGetUserDTO.ts
│   └── ISendUserDTO.ts
│
└── 📂 interfaces/
    └── 📂 context/
        └── IUserStore.ts
```

### 5. Lotes (`features/lote/`)

```
lote/
├── 📂 context/
│   └── loteStore.ts
│
├── 📂 domain/
│   └── ILoteModel.ts
│
├── 📂 DTOs/
│   ├── IGetLoteDTO.ts
│   └── SendLoteDTO.ts
│
└── 📂 interfaces/
    └── 📂 context/
        └── ILoteStore.ts
```

### 6. Funciones (`features/Funciones/`)

```
Funciones/
├── 📂 context/
│   └── FuncionesStore.tsx
│
├── 📂 domain/
│   └── IFuncionModel.ts
│
├── 📂 DTOs/
│   ├── IGetFuncionDTO.ts
│   └── ISendFuncionDTO.ts
│
└── 📂 interfaces/
    └── 📂 context/
        └── IFuncionesStore.ts
```

---

## 🔧 Código Compartido (`shared/`)

### Componentes (`shared/componets/`)

```
componets/
├── 📂 alerts/
│   └── ActivityTimeAlert.tsx     # ⭐ Alerta de tiempo excedido
│
├── 📂 buttons/
│   ├── ActionIconButton.tsx      # Botones de acción con iconos
│   ├── AddButton.tsx
│   ├── EditCantidadButton.tsx
│   ├── TerminaActividad.tsx
│   └── VerDteallesButton.tsx
│
├── 📂 header/
│   └── AppHeader.tsx             # ⭐ Header con usuario
│
├── 📂 sidebar/
│   ├── AppSidebar.tsx            # ⭐ Sidebar principal
│   └── AppSidebar.css
│
├── 📂 sweet/                     # Alertas SweetAlert2
│   ├── AddAlert.tsx
│   ├── AdvertAlert.tsx
│   ├── CloseAlert.tsx
│   ├── EditAlert.tsx
│   ├── ErrorAlert.tsx
│   └── showTopAlert.tsx
│
└── 📂 tables/
    ├── StatusBadgeProps.tsx      # Badge de estado
    └── 📂 headers/
        ├── IStatusBadge.tsx
        └── SatusBadge.tsx
```

### Hooks (`shared/hooks/`)

```
hooks/
├── useActivityTimeNotifications.ts  # ⭐ Notificaciones automáticas
└── 📂 validators/
```

### Servicios (`shared/service/`)

```
service/
├── authService.ts                # Servicio de autenticación
├── getDataService.ts             # GET requests
├── sendDataService.ts            # POST requests
├── modifyDataService.ts          # PUT/PATCH requests
├── getTokentService.ts           # Manejo de tokens
└── useLogout.ts                  # Hook de logout
```

### Estilos (`shared/styles/`)

```
styles/
└── CustomTable.css               # ⭐ Estilos personalizados de tablas
```

### Utilidades (`shared/utils/`)

```
utils/
└── activityTimeChecker.ts        # ⭐ Cálculo de tiempo de actividades
```

### Otros (`shared/`)

```
shared/
├── 📂 context/
│   └── paginationStore.ts        # Estado de paginación
│
├── 📂 enums/
│   └── enumActivityState.ts      # Estados: Pendiente, Terminada, Cancelada
│
├── 📂 interfaces/
│   └── 📂 context/
│       ├── IPagination.ts
│       └── IPaginationStore.ts
│
├── 📂 tokent/
│   └── validateTokent.ts         # Validación de tokens
│
└── 📂 validators/
    └── requiredValidate.ts       # Validadores comunes
```

---

## 📄 Archivos Raíz

```
src/
├── App.tsx                       # Componente principal
├── App.css                       # Estilos de App
├── index.tsx                     # Entrada React
├── main.tsx                      # Entrada Vite
├── index.css                     # Estilos globales
│
├── PrivateRouter.tsx             # Rutas privadas
├── ProtectedRouter.tsx           # Rutas protegidas
│
├── .env                          # Variables de entorno
├── js-cookie.d.ts                # Tipos de js-cookie
├── react-app-env.d.ts            # Tipos de React
├── vite-end.d.ts                 # Tipos de Vite
│
└── Archivos de configuración
    ├── setupTests.ts
    ├── reportWebVitals.ts
    ├── testFetch.ts
    └── vite.config.js
```

---

## 🎨 Patrón de Arquitectura

### Feature-Based Architecture

Cada feature (actividades, aseo, auth, etc.) es **autocontenida** y sigue esta estructura:

```
feature/
├── components/     # Componentes UI específicos
├── context/        # Estado global (Zustand)
├── DTOs/           # Data Transfer Objects
├── hooks/          # Custom hooks
├── interfaces/     # TypeScript interfaces
├── models/         # Modelos de datos
├── pages/          # Páginas/Vistas
└── utils/          # Utilidades específicas
```

### Ventajas:
- ✅ **Modularidad**: Cada feature es independiente
- ✅ **Escalabilidad**: Fácil agregar nuevas features
- ✅ **Mantenibilidad**: Código organizado y fácil de encontrar
- ✅ **Reutilización**: Código compartido en `shared/`

---

## 🔄 Flujo de Datos

```
Component (UI)
    ↓
Hook (useActivity)
    ↓
Store (Zustand)
    ↓
Service (API)
    ↓
Backend (FastAPI)
```

---

## 🆕 Mejoras Recientes

### ⭐ Nuevos Componentes:
1. **ActivityTimeAlert** - Alertas visuales de tiempo excedido
2. **AppSidebar** - Sidebar rediseñado con logout integrado
3. **AppHeader** - Header mejorado con usuario

### ⭐ Nuevos Hooks:
1. **useActivityTimeNotifications** - Notificaciones automáticas

### ⭐ Nuevas Utilidades:
1. **activityTimeChecker** - Cálculo de tiempo de actividades

### ⭐ Nuevos Estilos:
1. **CustomTable.css** - Tablas modernas y elegantes

---

## 📝 Convenciones de Nomenclatura

### Archivos:
- **Componentes**: `PascalCase.tsx` (ej: `ActivityTable.tsx`)
- **Hooks**: `camelCase.ts` con prefijo `use` (ej: `useActivity.ts`)
- **Stores**: `camelCase.ts` con sufijo `Store` (ej: `actividadStore.ts`)
- **DTOs**: `PascalCase.ts` con prefijo `I` (ej: `IGetActivityDTO.ts`)
- **Interfaces**: `PascalCase.ts` con prefijo `I` (ej: `IUserModel.ts`)

### Carpetas:
- **Features**: `camelCase` o `PascalCase` (ej: `actividades/`, `Aseo/`)
- **Shared**: `camelCase` (ej: `componets/`, `hooks/`)

---

## 🔧 Tecnologías Utilizadas

- **React 19** - Framework UI
- **TypeScript** - Tipado estático
- **Zustand** - Estado global
- **PrimeReact** - Componentes UI
- **SweetAlert2** - Alertas elegantes
- **React Router** - Navegación
- **Vite** - Build tool
- **js-cookie** - Manejo de cookies

---

## 📚 Próximas Mejoras Sugeridas

1. **Dashboard** - Implementar página de inicio con métricas
2. **Paginación** - Agregar paginación completa a tablas
3. **Filtros** - Sistema de filtros avanzados
4. **Reportes** - Módulo de reportes y estadísticas
5. **Tests** - Agregar tests unitarios y E2E
6. **PWA** - Convertir en Progressive Web App
7. **Tema Oscuro** - Implementar modo oscuro

---

**Fecha de actualización**: 2026-03-03
**Versión**: 1.0.0
