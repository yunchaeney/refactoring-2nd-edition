import { Invoice, Play, Performance } from '../types';

export function statement(invoice: Invoice, plays: Record<string, Play>) {
  // 임시 변수를 질의 함수로 바꾸기
  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playId];
  }

  function amountFor(aPerformance: Performance) {
    let result = 0;

    // play를 playFor() 호출로 변경
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

  let totalAmount = 0;
  let volumnCredits = 0;
  let result = `청구 내역 (고객명 : ${invoice.customer})\n`;

  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    // * Before *
    // const play = playFor(perf);
    // let thisAmount = amountFor(perf, play);

    volumnCredits += Math.max(perf.audience - 30, 0);

    // * After : 변수 인라인하기
    if ('comedy' === playFor(perf).type)
      volumnCredits += Math.floor(perf.audience / 5);

    // * After : 변수 인라인하기 *
    result += `${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }

  result += `총액 : ${format(totalAmount / 100)}\n`;
  result += `적립 포인트 : ${volumnCredits}점\n`;

  return result;
}
