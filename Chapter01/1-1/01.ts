import { Invoice, Play } from '../types';

export function statement(invoice: Invoice, plays: Record<string, Play>) {
  let totalAmount = 0;
  let volumnCredits = 0;
  let result = `청구 내역 (고객명 : ${invoice.customer})\n`;

  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playId];

    let thisAmount = 0;

    switch (play.type) {
      case 'tragedy':
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;

      case 'comedy':
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 1000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르 : ${play.type}`);
    }

    // 포인트지급
    volumnCredits += Math.max(perf.audience - 30, 0);

    // 희극 관객 5명마다 추가 포인트 제공
    if ('comedy' === play.type) volumnCredits += Math.floor(perf.audience / 5);

    // 청구 내역 출력
    result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액 : ${format(totalAmount / 100)}\n`;
  result += `적립 포인트 : ${volumnCredits}점\n`;

  return result;
}
