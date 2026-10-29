# MediFlash Edu 🏥

Plataforma educativa para estudiantes de Medicina de pregrado.

> **⚕️ Aviso importante:** Esta aplicación es exclusivamente educativa. No diagnostica pacientes reales, no recomienda tratamientos ni medicamentos. Los casos clínicos son ficticios y elaborados con fines pedagógicos.

---

## 🚀 Instalación y ejecución

### Requisitos
- [Node.js](https://nodejs.org/) v18 o superior
- npm v9 o superior

### Pasos

```bash
# 1. Ir a la carpeta del proyecto
cd mediflash-edu

# 2. Instalar dependencias
npm install

# 3. Iniciar en modo desarrollo
npm run dev

# 4. Abrir en el navegador: http://localhost:5173
```

### Compilar para producción
```bash
npm run build
npm run preview
```

---

## 📁 Estructura del proyecto

```
mediflash-edu/
├── src/
│   ├── App.tsx                    # Enrutador principal
│   ├── main.tsx                   # Punto de entrada React
│   ├── index.css                  # Estilos globales + Tailwind
│   │
│   ├── types/
│   │   └── index.ts               # Tipos TypeScript (Flashcard, CasoClinico, etc.)
│   │
│   ├── data/
│   │   ├── casos.ts               # ← Aquí agregas casos clínicos ficticios
│   │   └── flashcardsDemo.ts      # Flashcards de ejemplo
│   │
│   ├── store/
│   │   └── useAppStore.ts         # Estado global (Zustand) + persistencia localStorage
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx        # Navegación lateral
│   │   │   └── PageHeader.tsx     # Cabecera de página
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── Alert.tsx
│   │       ├── FormFields.tsx     # Input, Textarea, Select
│   │       ├── ProgressBar.tsx
│   │       └── EmptyState.tsx
│   │
│   └── pages/
│       ├── Dashboard.tsx          # Inicio con resumen
│       ├── FlashcardsPage.tsx     # Lista de flashcards
│       ├── FlashcardFormPage.tsx  # Crear / editar flashcard
│       ├── FlashcardRepaso.tsx    # Sesión de repaso
│       ├── CasosPage.tsx          # Lista de casos clínicos
│       ├── CasoDetallePage.tsx    # Caso individual + resultado
│       └── ProgresoPage.tsx       # Panel de progreso y estadísticas
```

---

## ➕ Cómo agregar más casos clínicos

Edita el archivo [`src/data/casos.ts`](src/data/casos.ts) y añade un nuevo objeto al array `CASOS_CLINICOS` siguiendo el esquema `CasoClinico` definido en `src/types/index.ts`.

Estructura mínima de un caso:

```typescript
{
  id: 'caso-004',                    // ID único
  titulo: 'Título del caso',
  asignatura: 'Nombre de asignatura',
  tema: 'Tema específico',
  dificultad: 'básico',              // 'básico' | 'intermedio' | 'avanzado'
  descripcion: 'Descripción breve...',
  paciente: {
    edad: 35,
    sexo: 'femenino',
    motivoConsulta: '...',
    antecedentes: '...',
    examenFisico: '...',
    examenes: '...',                 // opcional
  },
  preguntas: [
    {
      id: 'p-004-1',
      enunciado: '¿Cuál es el diagnóstico?',
      opciones: [
        { id: 'o-1a', texto: 'Opción A', esCorrecta: false, explicacion: '...' },
        { id: 'o-1b', texto: 'Opción B', esCorrecta: true,  explicacion: '...' },
        { id: 'o-1c', texto: 'Opción C', esCorrecta: false, explicacion: '...' },
        { id: 'o-1d', texto: 'Opción D', esCorrecta: false, explicacion: '...' },
      ],
      explicacionGeneral: 'Explicación educativa del concepto...',
      conceptoClave: {
        pregunta: '¿Pregunta de la flashcard?',
        respuesta: 'Respuesta de la flashcard.',
      },
    },
  ],
  conceptosClave: [
    {
      pregunta: '¿Concepto general del caso?',
      respuesta: 'Respuesta completa...',
      asignatura: 'Nombre de asignatura',
      tema: 'Tema',
    },
  ],
  advertenciaEducativa: 'Este caso es ficticio con fines educativos...',
}
```

---

## 🔒 Restricciones implementadas

| Restricción | Implementación |
|---|---|
| Solo uso educativo | Aviso permanente en sidebar + alertas en cada caso |
| Sin diagnóstico real | Casos 100% ficticios en JSON estático curado |
| Sin IA generativa | Cero llamadas a APIs externas, todo es local |
| Sin importar archivos | No hay funcionalidad de upload/PDF |
| Sin datos de servidor | Todo en localStorage del navegador |

---

## 🛠️ Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18 | UI |
| TypeScript | 5 | Tipado estático |
| Vite | 5 | Build tool |
| Tailwind CSS | 3 | Estilos |
| React Router | 6 | Navegación |
| Zustand | 4 | Estado global |
| lucide-react | — | Iconos |

---

## 📝 Licencia

Uso educativo interno. No redistribuir sin autorización.
