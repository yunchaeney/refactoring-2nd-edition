import { Invoice, EnrichedInvoice, Play } from '../../types';
import { createStatementData } from './createStatementData.ts';

// 숫자형 데이터를 달러로 포맷한다
function usd(aNumber: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(aNumber);
}

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
