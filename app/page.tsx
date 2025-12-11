import PaymentTable from '../components/PaymentTable';
import { payments } from '../data/payments';

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Tabla de Pagos
        </h1>
        <PaymentTable items={payments} />
      </div>
    </main>
  );
}
