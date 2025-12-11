'use client';

import React from 'react';
import type { Payment } from '../data/payments';

type Props = {
  items: Payment[];
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
}

export default function PaymentTable({ items }: Props) {
  return (
    <div className="table-card p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-slate-600 text-sm">
              <th className="pb-3 px-4">Nombre y apellido</th>
              <th className="pb-3 px-4">Monto abonado (fecha)</th>
              <th className="pb-3 px-4">Monto faltante</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r, i) => {
              const missing = Math.max(0, r.totalDue - r.paidAmount);
              const fullName = `${r.firstName} ${r.lastName}`;
              return (
                <tr key={r.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{fullName}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700">{formatCurrency(r.paidAmount)}</div>
                    <div className="text-xs text-slate-500 mt-1">{formatDate(r.paidDate)}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className={`font-semibold ${missing === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {formatCurrency(missing)}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {missing === 0 ? 'Completado' : `Falta ${formatCurrency(missing)}`}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-sm text-slate-500">Total registros: {items.length}</div>
    </div>
  );
}
