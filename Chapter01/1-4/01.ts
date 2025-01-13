import { Invoice, Play, Performance } from '../types';

export function statement(invoice: Invoice, plays: Record<string, Play>) {
  //
  // 1. switch문을 별도 함수로 추출
  function amountFor(aPerformance: Performance, play: Play) {
    // 3. 변수의 이름을 명확하게.
    // 함수의 반환값인 thisAmount를 result로 변경한다.
    // 첫 번째 인수인 perf를 aPerformance로 바꾼다.
    let result = 0;

    switch (play.type) {
      case 'tragedy':
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;

      case 'comedy':
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 1000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르 : ${play.type}`);
    }

    return result;
  }

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
    // 2. 추출한 함수를 사용
    let thisAmount = amountFor(perf, play);

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
