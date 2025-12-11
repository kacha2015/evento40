import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Tabla de pagos',
  description: 'Listado de pagos con monto abonado, fecha y monto faltante'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
