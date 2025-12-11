export type Payment = {
  id: string;
  firstName: string;
  lastName: string;
  totalDue: number; // total a pagar
  paidAmount: number; // abonado hasta la fecha
  paidDate: string; // fecha del último pago (ISO)
};

export const payments: Payment[] = [
  {
    id: "1",
    firstName: "María",
    lastName: "González",
    totalDue: 1000,
    paidAmount: 600,
    paidDate: "2025-11-20"
  },
  {
    id: "2",
    firstName: "Juan",
    lastName: "Pérez",
    totalDue: 750,
    paidAmount: 750,
    paidDate: "2025-11-25"
  },
  {
    id: "3",
    firstName: "Lucía",
    lastName: "Ramírez",
    totalDue: 1200,
    paidAmount: 300,
    paidDate: "2025-10-10"
  },
  {
    id: "4",
    firstName: "Andrés",
    lastName: "Torres",
    totalDue: 500,
    paidAmount: 200,
    paidDate: "2025-11-27"
  }
];
