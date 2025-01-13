import { Invoice, Play, Performance } from '../types';

export function statement(invoice: Invoice, plays: Record<string, Play>) {
  const statementData = {}; // 중간 데이터 구조를 인수로 전달
  return renderPlainText(statementData, invoice, plays);
}

export function renderPlainText(
  data: any,
  invoice: Invoice,
  plays: Record<string, Play>,
) {
  let result = `청구 내역 (고객명 : ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    result += `${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${perf.audience}석)\n`;
  }

  result += `총액 : ${usd(totalAmount() / 100)}\n`;
  result += `적립 포인트 : ${totalVolumeCredits()}점\n`;

  return result;

  // 중첩함수 시작
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

  function volumeCreditsFor(aPerformance: Performance) {
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
    }).format(aNumber);
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
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
}
