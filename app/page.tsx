import PaymentTable from '../components/PaymentTable';
import { payments } from '../data/payments';

export default function Page() {
  return (
    <section className="space-y-6">
      <div>
        <PaymentTable items={payments} />
      </div>
      <footer className="text-xs text-slate-500">
        Nota: los datos son de ejemplo. Puedes conectarlo a una API, una base de datos o añadir formularios para crear/editar registros.
      </footer>
    </section>
  );
}
