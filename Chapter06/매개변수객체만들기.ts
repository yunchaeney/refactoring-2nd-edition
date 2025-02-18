interface IStation {
  name: string;
  readings: {
      temp: number;
      time: string;
  }[];
}

const station = {
  name: 'ZB1',
  readings: [
    { temp: 47, time: '2016-11-10 09:10' },
    { temp: 53, time: '2016-11-10 09:20' },
    { temp: 58, time: '2016-11-10 09:30' },
    { temp: 53, time: '2016-11-10 09:40' },
    { temp: 51, time: '2016-11-10 09:50' },
  ],
};

// 정상 범위를 벗어난 측정값 찾기
function readingsOutsideRange1(station: IStation, min: number, max: number) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

const operatingPlan = {
  temperatureFloor: 50,
  temperatureCeil: 55
}

// 호출문
export const alerts1 = readingsOutsideRange1(
  station, 
  operatingPlan.temperatureFloor, // 최저 온도
  operatingPlan.temperatureCeil   // 최고 온도
);

//============

// 1. 묶은 데이터를 표현하는 클래스 선언
class NumberRange {
  private _data: {min: number, max: number};

  constructor (min: number, max: number) {
    this._data = {min: min, max: max}
  }

  get min() {return this._data.min};
  get max() {return this._data.max};
}

// 2. 새로 만든 객체를 매개변수로 추가
function readingsOutsideRange2(station: IStation, min: number, max: number, range: NumberRange) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

// 3. 온도 범위를 객체 형태로 전달하도록 호출문 변경
const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeil)
export const alerts2 = readingsOutsideRange2(
  station, 
  operatingPlan.temperatureFloor,
  operatingPlan.temperatureCeil, 
  range
);

// 4. 기존 매개변수 사용 부분을 변경하고 매개변수를 제거
function readingsOutsideRange3(station: IStation, range: NumberRange) {
  return station.readings.filter((r) => r.temp < range.min || r.temp > range.max);
}

export const alerts3 = readingsOutsideRange3(
  station, 
  range
);


// 추가
// 온도가 허용 범위 안에 있는지 검사하는 메서드를 클래스에 추가할 수 있다.

class NumberRangePlus {
  private _data: {min: number, max: number};

  constructor (min: number, max: number) {
    this._data = {min: min, max: max}
  }

  get min() {return this._data.min};
  get max() {return this._data.max};

  contains(arg: number) {return (arg >= this.min && arg <= this.max)}
}

function readingsOutsideRangePlus(station: IStation, range: NumberRangePlus) {
  return station.readings.filter((r) => !range.contains(r.temp));
}

const rangePlus = new NumberRangePlus(operatingPlan.temperatureFloor, operatingPlan.temperatureCeil)

export const alertsPlus = readingsOutsideRangePlus(
  station, 
  rangePlus
);
