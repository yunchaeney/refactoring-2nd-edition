import { invoices, plays } from '../data';
import { statement as statement01 } from './01';
import { statement as statement02 } from './01';
import { statement as statement03 } from './01';

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

  test('고객B 테스트', () => {
    let result = `청구 내역 (고객명 : 고객B)\n`;
    result += `Hamlet: $700.00 (60석)\n`;
    result += `As You Like It: $410.00 (25석)\n`;
    result += `Othello: $600.00 (50석)\n`;
    result += `총액 : $1,710.00\n`;
    result += `적립 포인트 : 55점\n`;

    expect(statement01(invoices[1], plays)).toBe(result);
    expect(statement02(invoices[1], plays)).toBe(result);
    expect(statement03(invoices[1], plays)).toBe(result);
  });

  test('고객C 테스트', () => {
    let result = `청구 내역 (고객명 : 고객C)\n`;
    result += `Hamlet: $550.00 (45석)\n`;
    result += `As You Like It: $450.00 (30석)\n`;
    result += `Othello: $450.00 (35석)\n`;
    result += `총액 : $1,450.00\n`;
    result += `적립 포인트 : 26점\n`;

    expect(statement01(invoices[2], plays)).toBe(result);
    expect(statement02(invoices[2], plays)).toBe(result);
    expect(statement03(invoices[2], plays)).toBe(result);
  });
});
