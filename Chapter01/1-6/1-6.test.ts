import { invoices, plays } from '../data';
import { statement as statement01 } from './01';
import { statement as statement02 } from './02';
import { statement as statement03 } from './03';

describe('statement 함수 테스트', () => {
  test('고객A 테스트.', () => {
    let result = `청구 내역 (고객명 : 고객A)\n`;
    result += `Hamlet: $650.00 (55석)\n`;
    result += `As You Like It: $490.00 (35석)\n`;
    result += `Othello: $500.00 (40석)\n`;
    result += `총액 : $1,640.00\n`;
    result += `적립 포인트 : 47점\n`;

    expect(statement01(invoices[0], plays)).toBe(result);
    expect(statement02(invoices[0], plays)).toBe(result);
    expect(statement03(invoices[0], plays)).toBe(result);
  });
});
