import { NextRequest, NextResponse } from 'next/server';
import { payments } from '../../../../data/payments';
import type { Payment } from '../../../../data/payments';

// Helper to check admin cookie
function isAdmin(req: NextRequest) {
  const adminCookie = req.cookies.get('admin');
  return adminCookie?.value === '1';
}

// PUT /api/payments/[id] - Update payment (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const id = params.id;
  const body = await req.json().catch(() => ({}));
  const { firstName, lastName, totalDue, paidAmount, paidDate } = body;

  const index = payments.findIndex(p => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Pago no encontrado' }, { status: 404 });
  }

  if (firstName !== undefined) payments[index].firstName = firstName;
  if (lastName !== undefined) payments[index].lastName = lastName;
  if (totalDue !== undefined) payments[index].totalDue = Number(totalDue);
  if (paidAmount !== undefined) payments[index].paidAmount = Number(paidAmount);
  if (paidDate !== undefined) payments[index].paidDate = paidDate;

  return NextResponse.json({ payment: payments[index] });
}

// DELETE /api/payments/[id] - Delete payment (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const id = params.id;
  const index = payments.findIndex(p => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Pago no encontrado' }, { status: 404 });
  }

  const deleted = payments.splice(index, 1)[0];
  return NextResponse.json({ payment: deleted });
}
