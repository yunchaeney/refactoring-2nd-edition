import { Invoice, Order, printOwing } from './함수추출하기.ts';

describe('함수 추출하기', () => {
  const order1 = new Order(1);
  const order2 = new Order(2);
  const order3 = new Order(3);
  const order4 = new Order(4);
  const order5 = new Order(5);

  test('1.', () => {
    const invoice = new Invoice(
      '윤채현',
      [order1, order2],
      new Date('2025-01-01T10:00:00'),
    );

    const result =
      '***********\n' +
      '**고객 채무**\n' +
      '***********\n' +
      '고객명: 윤채현\n' +
      '채무액: 3\n' +
      '마감일: 3/20/2025';

    expect(printOwing(invoice)).toEqual(result);
  });

  test('1.', () => {
    const invoice = new Invoice(
      '이브',
      [order3, order4, order5],
      new Date('2025-01-01T10:00:00'),
    );

    const result =
      '***********\n' +
      '**고객 채무**\n' +
      '***********\n' +
      '고객명: 이브\n' +
      '채무액: 12\n' +
      '마감일: 3/20/2025';

    expect(printOwing(invoice)).toEqual(result);
  });
});

describe('변수 캡슐화하기', () => {
  let defaultOwner: any = {};
  let spaceship: any = {};

  beforeEach(() => {
    defaultOwner = { firstName: '마틴', lastName: '파울러' };
  });

  test('1', () => {
    expect(defaultOwner.firstName).toEqual('마틴');

    spaceship.owner = defaultOwner;
    expect(spaceship.owner.firstName).toEqual('마틴');

    defaultOwner = { firstName: '레베카', lastName: '파슨스' };
    expect(defaultOwner.firstName).toEqual('레베카');
  });

  test('2', () => {
    function getDefaultOwner() {
      return defaultOwner;
    }

    function setDefaultOwner(arg: any) {
      defaultOwner = arg;
    }

    expect(defaultOwner.firstName).toEqual('마틴');

    spaceship.owner = getDefaultOwner();
    expect(spaceship.owner.firstName).toEqual('마틴');

    setDefaultOwner({ firstName: '레베카', lastName: '파슨스' });

    expect(defaultOwner.firstName).toEqual('레베카');
  });
});
