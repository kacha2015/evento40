import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Tabla de pagos',
  description: 'Listado de pagos con monto abonado, fecha y monto faltante'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-b from-white to-slate-50 min-h-screen">
        <main className="max-w-5xl mx-auto p-6">
          <header className="mb-6">
            <h1 className="text-3xl font-extrabold text-slate-800">Registro de pagos</h1>
            <p className="text-slate-600 mt-1">Tabla con nombre, monto abonado (y fecha) y monto faltante</p>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
