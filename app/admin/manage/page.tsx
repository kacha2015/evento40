import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminManager from '../../../components/AdminManager';

export default async function AdminManagePage() {
  const cookieStore = await cookies();
  const adminCookie = cookieStore.get('admin');

  if (!adminCookie || adminCookie.value !== '1') {
    redirect('/admin');
  }

  return <AdminManager />;
}
