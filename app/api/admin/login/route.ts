import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const key = body?.key ?? '';
  const ADMIN_KEY = process.env.ADMIN_KEY ?? 'miClaveSecreta';

  if (key !== ADMIN_KEY) {
    return NextResponse.json({ ok: false, message: 'Clave incorrecta' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  // Set cookie 'admin' httpOnly
  res.cookies.set({
    name: 'admin',
    value: '1',
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 días
  });

  return res;
}
