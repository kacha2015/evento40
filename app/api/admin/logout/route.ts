import { NextRequest, NextResponse } from 'next/server';

export async function POST(_req: NextRequest) {
  const res = NextResponse.json({ ok: true });
  // borrar cookie
  res.cookies.set({
    name: 'admin',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0
  });
  return res;
}
