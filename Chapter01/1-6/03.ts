import {
  Invoice,
  EnrichedInvoice,
  Performance,
  EnrichedPerformance,
  Play,
} from '../types';

// 포맷 함수를 공유하기 위해 최상단으로 이동
function usd(aNumber: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber);
}

// 중간 데이터 생성을 전담
function createStatementData(invoice: Invoice, plays: Record<string, Play>) {
  const statementData = {} as EnrichedInvoice;
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  statementData.totalAmount = totalAmount(statementData);

  return statementData;

  function enrichPerformance(aPerformance: Performance): EnrichedPerformance {
    let result = Object.assign({}, aPerformance) as EnrichedPerformance;
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);

    return result;
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playId];
  }

  function amountFor(aPerformance: EnrichedPerformance) {
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

  function volumeCreditsFor(aPerformance: EnrichedPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if ('comedy' === aPerformance.play.type) {
      result += Math.floor(aPerformance.audience / 5);
    }

    return result;
  }

  // **** 반복문을 파이프라인으로 바꾸기 ****
  //
  // ** Before **
  // let result = 0;
  // for ( ... ) { result += ... }
  // return result;
  //
  function totalVolumeCredits(data: EnrichedInvoice) {
    // ** After **
    return data.performances.reduce((acc, cur) => acc + cur.volumeCredits, 0);
  }

  function totalAmount(data: EnrichedInvoice) {
    // ** After **
    return data.performances.reduce((acc, cur) => acc + cur.amount, 0);
  }
  // **** 반복문을 파이프라인으로 바꾸기 ****
}

// invoice 데이터를 가공
export function statement(invoice: Invoice, plays: Record<string, Play>) {
  return renderPlainText(createStatementData(invoice, plays));
}

// 텍스트로 반환
function renderPlainText(data: EnrichedInvoice) {
  let result = `청구 내역 (고객명 : ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount / 100)} (${perf.audience}석)\n`;
  }

  result += `총액 : ${usd(data.totalAmount / 100)}\n`;
  result += `적립 포인트 : ${data.totalVolumeCredits}점\n`;

  return result;
}

// 중간 데이터 생성 함수를 공유
export function htmlStatement(invoice: Invoice, plays: Record<string, Play>) {
  return renderHtml(createStatementData(invoice, plays));
}

// html 로 반환
function renderHtml(data: EnrichedInvoice) {
  let result = `<h1>청구 내역 (고객명 : ${data.customer})</h1>\n`;

  result += '<table>\n';
  result += '<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n';
  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>${perf.audience}석</td>`;
    result += `<td>${usd(perf.amount / 100)}</td></tr>\n`;
  }
  result += '</table>\n';
  result += `<p>총액 : ${usd(data.totalAmount / 100)}</p>\n`;
  result += `<p>적립 포인트 : ${data.totalVolumeCredits}점</p>\n`;

  return result;
}
