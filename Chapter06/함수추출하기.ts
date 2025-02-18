export class Order {
  public amount: number = 0;

  constructor(amount: number) {
    this.amount = amount;
  }
}

export class Invoice {
  public orders: Order[] = [];
  public dueDate: Date = new Date('2025-01-01T10:00:00');
  public customer: string = '';

  constructor(customer: string, orders: Order[], dueDate: Date) {
    this.orders = orders;
    this.dueDate = dueDate;
    this.customer = customer;
  }
}

export function printOwing(invoice: Invoice) {
  const a = printBanner();

  recordDueDate(invoice);

  const outstanding = calculateOutstanding(invoice);

  const b = printDetail(invoice, outstanding);

  return a + '\n' + b;
}

function printBanner() {
  console.log('***********');
  console.log('**고객 채무**');
  console.log('***********');

  return `***********\n` + `**고객 채무**\n` + `***********`;
}

function printDetail(invoice: Invoice, outstanding: number) {
  // 세부사항 출력
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);

  return (
    `고객명: ${invoice.customer}\n` +
    `채무액: ${outstanding}\n` +
    `마감일: ${invoice.dueDate.toLocaleDateString()}`
  );
}

function recordDueDate(invoice: Invoice) {
  const today = new Date('2025-02-18T10:00:00');
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30,
  );
}

function calculateOutstanding(invoice: Invoice) {
  let result = 0;

  for (const o of invoice.orders) {
    result += o.amount;
  }

  return result;
}
