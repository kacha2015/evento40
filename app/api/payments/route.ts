import { NextRequest, NextResponse } from 'next/server';
import { payments } from '../../../data/payments';
import type { Payment } from '../../../data/payments';

// Helper to check admin cookie
function isAdmin(req: NextRequest) {
  const adminCookie = req.cookies.get('admin');
  return adminCookie?.value === '1';
}

// GET /api/payments - List all payments
export async function GET(req: NextRequest) {
  return NextResponse.json({ payments });
}

// POST /api/payments - Create new payment (admin only)
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const { firstName, lastName, totalDue, paidAmount, paidDate } = body;

  if (!firstName || !lastName || totalDue === undefined || paidAmount === undefined || !paidDate) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
  }

  const newPayment: Payment = {
    id: String(Date.now()),
    firstName,
    lastName,
    totalDue: Number(totalDue),
    paidAmount: Number(paidAmount),
    paidDate
  };

  payments.push(newPayment);
  return NextResponse.json({ payment: newPayment }, { status: 201 });
}
