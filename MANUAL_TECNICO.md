# Manual Técnico — Sistema de Gestión de Actividades Productivas

---

## 1. Introducción

### 1.1 Propósito del documento

Este manual técnico describe la arquitectura, estructura, tecnologías y funcionamiento interno del Sistema de Gestión de Actividades Productivas. Está dirigido a desarrolladores y personal técnico responsable del mantenimiento, despliegue o extensión del sistema.

### 1.2 Alcance

El documento cubre:

- Arquitectura general del sistema (backend y frontend)
- Tecnologías y dependencias utilizadas
- Estructura de la base de datos
- Módulos del sistema y sus responsabilidades
- API REST: endpoints, parámetros y respuestas
- Sistema de autenticación y seguridad
- Configuración del entorno y despliegue

### 1.3 Audiencia

- Desarrolladores de software que mantengan o extiendan el sistema
- Administradores de sistemas responsables del despliegue
- Personal técnico que requiera entender el funcionamiento interno

### 1.4 Definiciones y términos

| Término | Descripción |
|---|---|
| JWT | JSON Web Token — mecanismo de autenticación sin estado |
| ORM | Object-Relational Mapper — mapeo entre objetos Python y tablas SQL |
| UC | Use Case — caso de uso, unidad de lógica de negocio |
| DTO | Data Transfer Object — objeto para transferir datos entre capas |
| CORS | Cross-Origin Resource Sharing — política de seguridad HTTP |
| Clean Architecture | Patrón arquitectónico con separación estricta de capas |
| Zustand | Librería de gestión de estado para React |
| PrimeReact | Librería de componentes UI para React |

---

## 2. Descripción General del Sistema

### 2.1 ¿Qué es el sistema?

El Sistema de Gestión de Actividades Productivas es una aplicación web interna diseñada para registrar, monitorear y gestionar las actividades laborales del personal de planta. Permite a cada usuario registrar sus actividades diarias, asignarles un estado (Pendiente, Terminada, Cancelada) y llevar trazabilidad de tiempos y cantidades.

### 2.2 Objetivo del sistema

- Centralizar el registro de actividades productivas y de aseo
- Proveer visibilidad en tiempo real del estado de las actividades por usuario
- Gestionar lotes de producción y funciones/tareas disponibles
- Alertar sobre actividades que llevan demasiado tiempo en estado Pendiente

### 2.3 Ciclo de vida de una actividad

```
[Creación] → Estado: Pendiente
                  ↓
         [En ejecución]
          ↙           ↘
   Estado: Terminada   Estado: Cancelada
```

Toda actividad inicia en estado **Pendiente**. El usuario puede cambiarla a **Terminada** (completada) o **Cancelada** (descartada). No hay retorno desde estados finales.

### 2.4 Funciones principales del sistema

- Registro de actividades productivas con lote, función, cantidad y horario
- Registro de actividades de aseo con función y horario
- Cambio de estado de actividades
- Modificación de cantidad en actividades productivas
- Gestión de lotes de producción (CRUD)
- Gestión de funciones/tareas disponibles (CRUD)
- Gestión de usuarios
- Alertas visuales para actividades pendientes con tiempo excedido (>4h warning, >8h crítico)
- Autenticación con JWT almacenado en cookies

### 2.5 Tecnologías usadas

#### Backend

| Tecnología | Versión | Uso |
|---|---|---|
| Python | 3.14 | Lenguaje principal |
| FastAPI | 0.128.0 | Framework web / API REST |
| SQLAlchemy | 2.0.45 | ORM asíncrono |
| Pydantic | 2.12.5 | Validación de datos y settings |
| PyJWT | — | Generación y validación de JWT |
| Uvicorn | 0.40.0 | Servidor ASGI |
| aioodbc | — | Driver async para SQL Server |
| python-dotenv | 1.2.1 | Carga de variables de entorno |
| ODBC Driver 18 | — | Conexión a SQL Server |

#### Frontend

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19.2.4 | Framework UI |
| TypeScript | 4.9.5 | Tipado estático |
| React Router DOM | 7.13.0 | Enrutamiento SPA |
| Zustand | 5.0.10 | Gestión de estado global |
| PrimeReact | 10.9.7 | Componentes UI |
| PrimeFlex | 4.0.0 | Sistema de grillas CSS |
| PrimeIcons | 7.0.0 | Iconografía |
| Tailwind CSS | 3.4.19 | Estilos utilitarios |
| SweetAlert2 | 11.26.17 | Alertas y confirmaciones |
| js-cookie | 3.0.5 | Manejo de cookies (JWT) |
| jwt-decode | 4.0.0 | Decodificación de tokens |
| Emotion | 11.14.0 | CSS-in-JS |

#### Base de datos

| Tecnología | Detalle |
|---|---|
| SQL Server | Motor de base de datos |
| Schema | dbo |
| Conexión | Windows Authentication (Trusted_Connection) |
| Host | PCRY-056, puerto 1433 |
| Base de datos | InventarioAppsheetPrueba |

---

## 3. Arquitectura del Sistema

### 3.1 Visión general

```
┌─────────────────────────────────────────────────────┐
│                   CLIENTE (Browser)                  │
│              React + TypeScript (Puerto 3000)        │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP/REST (JSON)
                       │ Authorization: Bearer <JWT>
┌──────────────────────▼──────────────────────────────┐
│                  BACKEND (FastAPI)                   │
│                    Puerto 8001                       │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │ Presentation│  │ Applications │  │Infrastructure│ │
│  │  (Routers)  │→ │ (Use Cases)  │→ │(Repositories)│ │
│  └─────────────┘  └──────────────┘  └─────┬──────┘  │
└────────────────────────────────────────────┼────────┘
                                             │ SQLAlchemy async
┌────────────────────────────────────────────▼────────┐
│              SQL Server (Puerto 1433)                │
│              Schema: dbo                             │
│  Usuarios | Funciones | Lote |                       │
│  ActividadesVariasUsuarios | ActividadesAseo         │
└─────────────────────────────────────────────────────┘
```

### 3.2 Arquitectura del Backend — Clean Architecture

Cada módulo (feature) sigue la misma estructura de capas:

```
features/
└── <modulo>/
    ├── domain/          → Modelos SQLAlchemy (entidades de BD)
    ├── DTOs/            → Esquemas Pydantic (entrada/salida)
    ├── applications/    → Casos de uso (lógica de negocio)
    ├── infrastructure/  → Repositorios (acceso a datos)
    ├── presentation/    → Routers FastAPI (endpoints HTTP)
    └── exceptions/      → Excepciones específicas del módulo
```

### 3.3 Arquitectura del Frontend — Feature-based

```
src/
├── features/
│   ├── auth/            → Login, store de autenticación
│   ├── actividades/     → Actividades productivas
│   ├── Aseo/            → Actividades de aseo
│   ├── user/            → Gestión de usuarios
│   ├── lote/            → Gestión de lotes
│   └── Funciones/       → Gestión de funciones
├── shared/
│   ├── componets/       → Sidebar, Header, alertas
│   ├── service/         → Servicios HTTP (get, send, modify)
│   ├── hooks/           → Hooks reutilizables
│   ├── utils/           → Utilidades (tiempo, formato)
│   ├── config/          → Configuración (URL base API)
│   ├── enums/           → Enumeraciones compartidas
│   └── context/         → Contextos globales (paginación)
└── App.tsx              → Definición de rutas
```

---

## 4. Base de Datos

### 4.1 Diagrama de entidades

```
Usuarios (1) ──────────────── (N) ActividadesVariasUsuarios
    │                                        │
    │                              (N) ──────┤
    │                                        │
    └──── (N) ActividadesAseo       Funciones (1) ──── (N) ActividadesAseo
                    │
              Funciones (1)
                    
Lote (1) ──── (N) ActividadesVariasUsuarios
```

### 4.2 Tablas

#### dbo.Usuarios

| Columna | Tipo | Descripción |
|---|---|---|
| IdUsuarioApp | VARCHAR(50) PK | Identificador único del usuario |
| Usuario | VARCHAR(255) | Nombre del usuario |

#### dbo.Funciones

| Columna | Tipo | Descripción |
|---|---|---|
| IdOtraFuncionProduc | INT PK AI | ID autoincremental |
| OtraActividadProduc | VARCHAR(150) | Nombre de la función |
| DescripcionFuncion | VARCHAR(255) NULL | Descripción opcional |

#### dbo.Lote

| Columna | Tipo | Descripción |
|---|---|---|
| IdLote | INT PK AI | ID autoincremental |
| LotePresentacion | VARCHAR(100) | Nombre/presentación del lote |
| Cantidad | INT | Cantidad disponible |
| Descripcion | VARCHAR(255) NULL | Descripción opcional |

#### dbo.ActividadesVariasUsuarios

| Columna | Tipo | Descripción |
|---|---|---|
| IdActividadesVarias | VARCHAR(8) PK | UUID truncado (8 chars) |
| IdUsuarioApp | VARCHAR(50) FK | Usuario que registró |
| IdOtraFuncionProduc | INT FK NULL | Función asignada |
| IdLote | INT FK NULL | Lote asociado |
| Cantidad | INT | Cantidad trabajada |
| HoraInicioAV | TIME NULL | Hora de inicio |
| HoraFinalAV | TIME NULL | Hora de finalización |
| DuracionAV | VARCHAR(20) NULL | Duración calculada |
| ObservacionesAV | VARCHAR(255) NULL | Observaciones |
| Fecha | DATE NULL | Fecha de la actividad |
| Estado | ENUM | Pendiente / Terminada / Cancelada |

#### dbo.ActividadesAseo

| Columna | Tipo | Descripción |
|---|---|---|
| IdActividadesAseo | VARCHAR(8) PK | UUID truncado (8 chars) |
| IdUsuarioApp | VARCHAR(50) FK | Usuario que registró |
| IdOtraFuncionProduc | INT FK NULL | Función asignada |
| HoraInicioAV | TIME NULL | Hora de inicio |
| HoraFinalAV | TIME NULL | Hora de finalización |
| DuracionAV | VARCHAR(20) NULL | Duración calculada |
| ObservacionesAV | VARCHAR(255) NULL | Observaciones |
| Fecha | DATE NULL | Fecha de la actividad |
| Estado | ENUM | Pendiente / Terminada / Cancelada |

---

## 5. Módulos del Sistema

### 5.1 Módulo de Autenticación (auth)

Gestiona el acceso al sistema mediante credenciales de usuario.

**Flujo de autenticación:**

```
1. Usuario ingresa documento y contraseña en LoginPage
2. Frontend llama POST /api/v1/auth/login
3. Backend valida credenciales contra tabla Usuarios
4. Si válido: genera JWT (HS256, 60 min, emisor: ActividadesApp)
5. Frontend almacena token en cookie (expires: 1 día)
6. Cada request posterior incluye: Authorization: Bearer <token>
7. Middleware get_current_user valida el token en cada endpoint protegido
```

**Validación de credenciales:**
- `document` → busca usuario por `IdUsuarioApp`
- `password` → compara con los últimos 3 caracteres de `IdUsuarioApp`

**Clases de seguridad:**

| Clase | Responsabilidad |
|---|---|
| `JwtGenerator` | Crea tokens JWT firmados con SECRET_ACCESS_TOKEN |
| `JwtValidator` | Valida y decodifica tokens JWT |
| `get_current_user` | Dependency injection para proteger endpoints |

**Excepciones:**

| Excepción | HTTP | Descripción |
|---|---|---|
| AuthInvalidCredentialsException | 500 | Credenciales incorrectas |
| AuthInvalidTokenException | 401 | Token inválido o expirado |
| AuthInvalidAuthorizationException | 401 | Sin token en la petición |

---

### 5.2 Módulo de Actividades Productivas (producción)

Gestiona las actividades de producción de planta por usuario.

**Endpoints:**

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/api/v1/actividades/AddActividad` | ✅ | Crear actividad |
| GET | `/api/v1/actividades/GetAllActividades` | ✅ | Listar actividades del usuario (paginado) |
| GET | `/api/v1/actividades/GetActividadById/{id}` | ❌ | Obtener actividad por ID |
| PATCH | `/api/v1/actividades/ChangeStateActividad/{id}` | ✅ | Cambiar estado |
| PATCH | `/api/v1/actividades/ModifyCantidadActividad/{id}` | ✅ | Modificar cantidad |

**Parámetros de paginación (GetAllActividades):**

| Parámetro | Tipo | Default | Descripción |
|---|---|---|---|
| page_index | int | 1 | Página actual |
| page_size | int | 50 | Registros por página |

**Estados válidos:** `Pendiente` → `Terminada` o `Cancelada`

---

### 5.3 Módulo de Actividades de Aseo (Aseo)

Gestiona las actividades de limpieza y aseo por usuario. Dominio independiente del módulo de producción.

**Endpoints:**

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/api/v1/actividadesAseo/AddActividadAseo` | ✅ | Crear actividad de aseo |
| GET | `/api/v1/actividadesAseo/GetAllActividadesAseo` | ✅ | Listar actividades del usuario (paginado) |
| GET | `/api/v1/actividadesAseo/GetActividadAseoById/{id}` | ❌ | Obtener por ID |
| PATCH | `/api/v1/actividadesAseo/ChangeStateActividadAseo/{id}` | ✅ | Cambiar estado |

**Diferencia con Producción:** Las actividades de aseo no tienen campo `Cantidad` ni `Lote` asociado.

---

### 5.4 Módulo de Usuarios (users)

Gestiona los usuarios del sistema.

**Endpoints:**

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/api/v1/users/AddUser` | ❌ | Crear usuario |
| GET | `/api/v1/users/GetAllUsers` | ❌ | Listar usuarios (paginado) |
| GET | `/api/v1/users/GetUserById/{id}` | ❌ | Obtener usuario por ID |
| GET | `/api/v1/users/me` | ✅ | Obtener usuario autenticado |

---

### 5.5 Módulo de Lotes (lote)

Gestiona los lotes de producción disponibles.

**Endpoints:**

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/v1/lotes/GetAllLotes` | ❌ | Listar lotes (paginado) |
| GET | `/api/v1/lotes/GetLoteById/{id}` | ✅ | Obtener lote por ID |
| POST | `/api/v1/lotes/AddLote` | ✅ | Crear lote |
| PUT | `/api/v1/lotes/ModifyCantidad/{id}` | ✅ | Modificar cantidad |

---

### 5.6 Módulo de Funciones (funciones)

Gestiona el catálogo de funciones/tareas disponibles para asignar a actividades.

**Endpoints:**

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/v1/funciones/GetAllFunciones` | ❌ | Listar funciones (paginado) |
| GET | `/api/v1/funciones/GetFuncionById/{id}` | ✅ | Obtener función por ID |
| POST | `/api/v1/funciones/AddFuncion` | ✅ | Crear función |

---

## 6. Funcionalidades del Sistema

### 6.1 Sistema de alertas por tiempo

El frontend incluye un sistema de alertas para actividades que llevan demasiado tiempo en estado Pendiente:

| Tiempo transcurrido | Severidad | Color | Comportamiento |
|---|---|---|---|
| < 4 horas | Normal | Azul | Sin alerta |
| 4 – 8 horas | Warning | Naranja | Badge en columna Estado |
| > 8 horas | Crítico | Rojo | Badge + Toast automático |

**Archivos involucrados:**
- `shared/utils/activityTimeChecker.ts` — cálculo de tiempo y severidad
- `shared/componets/alerts/ActivityTimeAlert.tsx` — badge visual
- `shared/hooks/useActivityTimeNotifications.ts` — toast automático

### 6.2 Paginación

Todos los listados soportan paginación mediante `page_index` y `page_size`. El estado de paginación se gestiona globalmente con `paginationStore` (Zustand).

### 6.3 Protección de rutas (Frontend)

El componente `PrivateRoute` verifica la existencia del token JWT en cookies antes de renderizar cualquier página protegida. Si no hay token, redirige a `/login`.

**Rutas del sistema:**

| Ruta | Acceso | Componente |
|---|---|---|
| `/login` | Público | LoginPage |
| `/actividadesProductivas` | Privado | ActividadPages |
| `/actividadesAseo` | Privado | ActivitiesAseoPage |
| `*` | — | Redirige a /login |

---

## 7. Configuración y Despliegue

### 7.1 Variables de entorno — Backend

Archivo: `BackEnd/.env`

```env
DB_HOST=PCRY-056
DB_PORT=1433
DB_NAME=InventarioAppsheetPrueba
DB_DRIVER=ODBC Driver 18 for SQL Server
SECRET_ACCESS_TOKEN=<clave-secreta>
ALGORITHM=HS256
```

### 7.2 Configuración de URL — Frontend

Archivo: `FrontEnd/frontend/src/shared/config/apiConfig.ts`

```typescript
const API_BASE_URL = 'http://192.168.42.181:8001/api/v1'
export default API_BASE_URL
```

### 7.3 Requisitos previos

**Backend:**
- Python 3.14+
- ODBC Driver 18 for SQL Server instalado
- Acceso a red local (IP 192.168.42.181)
- SQL Server corriendo en PCRY-056:1433

**Frontend:**
- Node.js 18+
- npm 9+

### 7.4 Instalación y ejecución

**Backend:**
```bash
cd BackEnd
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

**Frontend:**
```bash
cd FrontEnd/frontend
npm install
npm start
```

**Acceso:**
- Frontend: `http://192.168.42.181:3000`
- Backend API: `http://192.168.42.181:8001`
- Documentación API (Swagger): `http://192.168.42.181:8001/docs`

### 7.5 CORS

El backend permite peticiones desde los siguientes orígenes:

```python
allow_origins = [
    "http://192.168.42.181:3000",
    "http://localhost:3000"
]
```

---

## 8. Estructura de Carpetas

### 8.1 Backend

```
BackEnd/
├── .env                          # Variables de entorno
├── app/
│   ├── main.py                   # Punto de entrada, registro de routers
│   ├── core/
│   │   ├── database.py           # Configuración SQLAlchemy async
│   │   ├── security.py           # JwtValidator, JwtGenerator
│   │   ├── settings.py           # Configuración con Pydantic Settings
│   │   └── unit_of_work.py       # Patrón Unit of Work
│   ├── context/
│   │   └── context.py            # Modelos SQLAlchemy (todas las tablas)
│   ├── shared/
│   │   ├── exceptions/           # Excepciones base y compartidas
│   │   ├── repositories/         # BaseActivityRepository
│   │   └── enums/                # EnumActivityType
│   └── features/
│       ├── auth/                 # Autenticación
│       ├── producción/           # Actividades productivas
│       ├── Aseo/                 # Actividades de aseo
│       ├── users/                # Usuarios
│       ├── lote/                 # Lotes
│       └── funciones/            # Funciones/tareas
```

### 8.2 Frontend

```
FrontEnd/frontend/src/
├── App.tsx                       # Rutas principales
├── PrivateRouter.tsx             # Protección de rutas
├── index.tsx                     # Punto de entrada React
├── features/
│   ├── auth/                     # Login
│   ├── actividades/              # Actividades productivas
│   ├── Aseo/                     # Actividades de aseo
│   ├── user/                     # Usuarios
│   ├── lote/                     # Lotes
│   └── Funciones/                # Funciones
└── shared/
    ├── componets/
    │   ├── sidebar/              # AppSidebar
    │   ├── header/               # AppHeader
    │   └── alerts/               # ActivityTimeAlert
    ├── service/
    │   ├── getDataService.ts     # GET con auth
    │   ├── sendDataService.ts    # POST con auth
    │   └── modifyDataService.ts  # PATCH/PUT con auth
    ├── config/
    │   └── apiConfig.ts          # URL base del backend
    ├── hooks/
    │   └── useActivityTimeNotifications.ts
    ├── utils/
    │   └── activityTimeChecker.ts
    ├── enums/
    │   └── enumActivityState.ts
    └── context/
        └── paginationStore.ts
```

---

## 9. Consideraciones de Seguridad

- El `SECRET_ACCESS_TOKEN` debe mantenerse en `.env` y nunca commitearse al repositorio
- Los tokens JWT expiran en 60 minutos
- El CORS está restringido a orígenes específicos (no wildcard `*`)
- Las rutas del frontend están protegidas por `PrivateRoute`
- Los endpoints sensibles requieren token válido via `Depends(get_current_user)`
- El `.env` está incluido en `.gitignore`
