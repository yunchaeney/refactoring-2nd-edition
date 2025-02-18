import { ProvinceDocType, sampleProvinceData } from './01.ts';
import { Province } from './Province.ts';

describe('province', () => {
  let asia: Province;
  beforeEach(() => {
    asia = new Province(sampleProvinceData());
  });

  test('shortfall.', () => {
    expect(asia.shortfall).toEqual(5);
  });

  test('profit.', () => {
    expect(asia.profit).toEqual(230);
  });

  test('change production', () => {
    asia.producers[0].production = 20;

    expect(asia.shortfall).toEqual(-6);
    expect(asia.profit).toEqual(292);
  });

  test('수요 없음 : no demand', () => {
    asia.demand = '0';
    expect(asia.shortfall).toEqual(-25);
    expect(asia.profit).toEqual(0);
  });

  test('음수 : negative demand', () => {
    asia.demand = '-1';
    expect(asia.shortfall).toEqual(-26);
    expect(asia.profit).toEqual(-10);
  });

  test('문자열', () => {
    asia.demand = '애해아';
    expect(asia.shortfall).toBeNaN();
  });
});

describe('no producers', () => {
  let noProducers: Province;
  beforeEach(() => {
    const data = {
      name: 'No producers',
      producers: [],
      demand: 30,
      price: 20,
    };

    noProducers = new Province(data);
  });

  test('shortfall.', () => {
    expect(noProducers.shortfall).toEqual(30);
  });
  test('profit.', () => {
    expect(noProducers.profit).toEqual(0);
  });
});
