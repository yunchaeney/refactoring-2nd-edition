import {
  Invoice,
  InvoiceWithPlay,
  Performance,
  PerformanceWithPlay,
  Play,
} from '../types';

export function statement(invoice: Invoice, plays: Record<string, Play>) {
  const statementData: InvoiceWithPlay = {} as InvoiceWithPlay;

  // ***
  // 1. invoice 데이터를 중간 데이터로 옮긴다.
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  statementData.totalAmount = totalAmount(statementData);

  return renderPlainText(statementData, plays);

  function enrichPerformance(aPerformance: Performance): PerformanceWithPlay {
    let result = Object.assign({}, aPerformance) as PerformanceWithPlay;
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);

    return result;
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playId];
  }

  function amountFor(aPerformance: PerformanceWithPlay) {
    let result = 0;

    switch (aPerformance.play.type) {
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
        throw new Error(`알 수 없는 장르 : ${aPerformance.play.type}`);
    }

    return result;
  }

  function volumeCreditsFor(aPerformance: PerformanceWithPlay) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if ('comedy' === aPerformance.play.type) {
      result += Math.floor(aPerformance.audience / 5);
    }

    return result;
  }

  function totalVolumeCredits(data: InvoiceWithPlay) {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.volumeCredits;
    }

    return result;
  }

  function totalAmount(data: InvoiceWithPlay) {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.amount;
    }

    return result;
  }
}

export function renderPlainText(
  data: InvoiceWithPlay,
  plays: Record<string, Play>,
) {
  // ***
  // 1. 고객 정보를 중간 데이터 구조로부터 얻는다.
  let result = `청구 내역 (고객명 : ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience}석)\n`;
  }

  result += `총액 : ${usd(data.totalAmount / 100)}\n`;
  result += `적립 포인트 : ${data.totalVolumeCredits}점\n`;

  return result;

  function usd(aNumber: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber);
  }
}
