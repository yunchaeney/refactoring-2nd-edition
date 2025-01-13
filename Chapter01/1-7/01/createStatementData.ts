import {
  Invoice,
  EnrichedInvoice,
  Performance,
  EnrichedPerformance,
  Play,
} from '../../types';

// 생성자를 팩터리 함수로 바꾸기
function createPerformanceCalculator(aPerformance: Performance, aPlay: Play) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르 : ${aPlay.type}`);
  }
}

// 공연료 계산기 클래스
class PerformanceCalculator {
  performance: Performance;
  play: Play;

  constructor(aPerformance: Performance, aPlay: Play) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount(): number {
    throw new Error(`서브클래스에서 처리하도록 설계되었음`);
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 1000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

// 함수

export function createStatementData(
  invoice: Invoice,
  plays: Record<string, Play>,
) {
  const statementData = {} as EnrichedInvoice;
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  statementData.totalAmount = totalAmount(statementData);

  return statementData;

  function enrichPerformance(aPerformance: Performance): EnrichedPerformance {
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance),
    );

    let result = Object.assign({}, aPerformance) as EnrichedPerformance;
    result.play = playFor(result);
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;

    return result;
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playId];
  }

  function totalVolumeCredits(data: EnrichedInvoice) {
    return data.performances.reduce((acc, cur) => acc + cur.volumeCredits, 0);
  }

  function totalAmount(data: EnrichedInvoice) {
    return data.performances.reduce((acc, cur) => acc + cur.amount, 0);
  }
}
