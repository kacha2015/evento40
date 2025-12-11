'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Payment } from '../data/payments';

export default function AdminManager() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    totalDue: '',
    paidAmount: '',
    paidDate: ''
  });
  const router = useRouter();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/payments');
      const data = await res.json();
      setPayments(data.payments || []);
    } catch (err) {
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
    router.refresh();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          totalDue: Number(formData.totalDue),
          paidAmount: Number(formData.paidAmount),
          paidDate: formData.paidDate
        })
      });

      if (res.ok) {
        setFormData({ firstName: '', lastName: '', totalDue: '', paidAmount: '', paidDate: '' });
        fetchPayments();
      } else {
        const data = await res.json();
        alert(data.error || 'Error al crear');
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/payments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          totalDue: Number(formData.totalDue),
          paidAmount: Number(formData.paidAmount),
          paidDate: formData.paidDate
        })
      });

      if (res.ok) {
        setEditing(null);
        setFormData({ firstName: '', lastName: '', totalDue: '', paidAmount: '', paidDate: '' });
        fetchPayments();
      } else {
        const data = await res.json();
        alert(data.error || 'Error al actualizar');
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que deseas eliminar este registro?')) return;

    try {
      const res = await fetch(`/api/payments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPayments();
      } else {
        const data = await res.json();
        alert(data.error || 'Error al eliminar');
      }
    } catch (err) {
      alert('Error de conexión');
    }
  };

  const startEdit = (payment: Payment) => {
    setEditing(payment.id);
    setFormData({
      firstName: payment.firstName,
      lastName: payment.lastName,
      totalDue: String(payment.totalDue),
      paidAmount: String(payment.paidAmount),
      paidDate: payment.paidDate
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData({ firstName: '', lastName: '', totalDue: '', paidAmount: '', paidDate: '' });
  };

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Gestión de Pagos</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Create Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Crear nuevo registro</h3>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-md text-slate-900"
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-md text-slate-900"
            required
          />
          <input
            type="number"
            placeholder="Total a pagar"
            value={formData.totalDue}
            onChange={(e) => setFormData({ ...formData, totalDue: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-md text-slate-900"
            required
          />
          <input
            type="number"
            placeholder="Monto abonado"
            value={formData.paidAmount}
            onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-md text-slate-900"
            required
          />
          <input
            type="date"
            value={formData.paidDate}
            onChange={(e) => setFormData({ ...formData, paidDate: e.target.value })}
            className="px-4 py-2 border border-slate-300 rounded-md text-slate-900"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
          >
            Crear
          </button>
        </form>
      </div>

      {/* Payments List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Registros existentes</h3>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="border border-slate-200 p-4 rounded-md">
              {editing === payment.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="px-4 py-2 border border-slate-300 rounded-md text-slate-900"
                    />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="px-4 py-2 border border-slate-300 rounded-md text-slate-900"
                    />
                    <input
                      type="number"
                      value={formData.totalDue}
                      onChange={(e) => setFormData({ ...formData, totalDue: e.target.value })}
                      className="px-4 py-2 border border-slate-300 rounded-md text-slate-900"
                    />
                    <input
                      type="number"
                      value={formData.paidAmount}
                      onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                      className="px-4 py-2 border border-slate-300 rounded-md text-slate-900"
                    />
                    <input
                      type="date"
                      value={formData.paidDate}
                      onChange={(e) => setFormData({ ...formData, paidDate: e.target.value })}
                      className="px-4 py-2 border border-slate-300 rounded-md text-slate-900"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(payment.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-md transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-slate-800">
                      {payment.firstName} {payment.lastName}
                    </div>
                    <div className="text-sm text-slate-600">
                      Total: ${payment.totalDue} | Abonado: ${payment.paidAmount} | Fecha: {payment.paidDate}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(payment)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(payment.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
