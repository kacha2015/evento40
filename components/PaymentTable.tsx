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
    <div className="table-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-primary to-secondary">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nombre y Apellido
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Monto Abonado
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Fecha de Pago
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Monto Faltante
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((payment) => {
              const remaining = Math.max(0, payment.totalDue - payment.paidAmount);
              const isCompleted = remaining === 0;

              return (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.firstName} {payment.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {formatCurrency(payment.paidAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(payment.paidDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(remaining)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isCompleted ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completado
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pendiente
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
