# Next.js Payments Table

Una aplicación de ejemplo Next.js (App Router) en TypeScript y Tailwind CSS que muestra una tabla amigable con información de pagos.

## Características

- **Next.js 14** con App Router
- **TypeScript** con modo estricto
- **Tailwind CSS** para estilos responsivos
- Formateo de moneda y fechas en español (es-ES)
- Datos de ejemplo incluidos
- UI moderna y responsiva

## Tabla de Pagos

La tabla muestra la siguiente información por cada registro:
- **Nombre y apellido**: Nombre completo del pagador
- **Monto abonado**: Cantidad pagada con fecha del último pago
- **Monto faltante**: Cantidad restante por pagar (totalDue - paidAmount)
  - Muestra "Completado" cuando el monto faltante es 0
  - Código de color: verde para completado, rojo para pendiente

## Instalación y Uso

### Requisitos previos
- Node.js 18 o superior
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### Construir para producción

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Estructura del Proyecto

```
.
├── app/
│   ├── layout.tsx       # Layout principal con metadata
│   ├── globals.css      # Estilos globales y Tailwind
│   └── page.tsx         # Página principal
├── components/
│   └── PaymentTable.tsx # Componente de tabla de pagos
├── data/
│   └── payments.ts      # Datos de ejemplo
└── package.json         # Dependencias y scripts
```

## Personalización

### Modificar datos
Edita el archivo `data/payments.ts` para cambiar los datos de ejemplo.

### Conectar a una API
Puedes modificar `app/page.tsx` para obtener datos desde una API:

```typescript
async function getData() {
  const res = await fetch('https://api.example.com/payments');
  return res.json();
}

export default async function Page() {
  const payments = await getData();
  return <PaymentTable items={payments} />;
}
```

### Cambiar estilos
- Modifica `tailwind.config.js` para personalizar colores y temas
- Edita `app/globals.css` para cambiar estilos globales

## Tecnologías Utilizadas

- [Next.js 14](https://nextjs.org/) - Framework de React
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS utility-first
- [React 18](https://react.dev/) - Biblioteca de UI

## Licencia

Este es un proyecto de ejemplo para demostración.
