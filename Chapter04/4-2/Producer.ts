import { Province } from './Province.ts';

export class Producer {
  private _province: Province;
  private _cost: number;
  private _name: string;
  private _production: number;

  constructor(
    aProvince: Province,
    data: { cost: number; name: string; production: number },
  ) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production || 0;
  }

  get name() {
    return this._name;
  }

  get cost(): number {
    return this._cost;
  }

  set cost(arg: number | string) {
    this._cost = parseInt(arg as string);
  }

  get production(): number {
    return this._production;
  }

  set production(amountStr: string) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;

    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}
