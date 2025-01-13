import { Invoice, Play, Performance } from '../types';

export function statement(invoice: Invoice, plays: Record<string, Play>) {
  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playId];
  }

  function amountFor(aPerformance: Performance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
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
        throw new Error(`알 수 없는 장르 : ${playFor(aPerformance).type}`);
    }

    return result;
  }

  function volumnCreditsFor(aPerformance: Performance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if ('comedy' === playFor(aPerformance).type) {
      result += Math.floor(aPerformance.audience / 5);
    }

    return result;
  }

  function usd(aNumber: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format;
  }

  // 1. volumnCredits 누적 로직을 별도로 분리
  // 2. 문장 슬라이드를 통해 volumnCredits 선언부를 사용하는 반복문 앞으로 옮기기
  // 3. 해당하는 부분을 별도 함수로 추출
  // 4. 변수 인라인하여 volumnCredits 변수를 없애기
  function totalVolumnCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumnCreditsFor(perf);
    }

    return result;
  }

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }

    return result;
  }
  // ***

  let result = `청구 내역 (고객명 : ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    result += `${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${perf.audience}석)\n`;
  }

  result += `총액 : ${usd(totalAmount() / 100)}\n`;
  result += `적립 포인트 : ${totalVolumnCredits()}점\n`;

  return result;
}
