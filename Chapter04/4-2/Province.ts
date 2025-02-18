import { ProducerDocType, ProvinceDocType } from './01.ts';
import { Producer } from './Producer.ts';

export class Province {
  private _name: string;
  private _producers: any[];
  private _totalProduction: number;
  private _demand: number;
  private _price: number;

  constructor(doc: ProvinceDocType) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;

    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }

  get name() {
    return this._name;
  }

  get producers() {
    return this._producers.slice();
  }

  get totalProduction() {
    return this._totalProduction;
  }

  set totalProduction(arg) {
    this._totalProduction = arg;
  }

  get demand(): number {
    return this._demand;
  }

  set demand(arg: string) {
    this._demand = parseInt(arg);
  }

  get price(): number {
    return this._price;
  }

  set price(arg: string) {
    this._price = parseInt(arg);
  }

  get shortfall() {
    return this._demand - this.totalProduction;
  }

  get profit() {
    return this.demandValue - this.demandCost;
  }

  get demandValue() {
    return this.satisfiedDemand * this.price;
  }

  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }

  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;

    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach((p) => {
        const contribution = Math.min(remainingDemand, p.production);

        remainingDemand -= contribution;
        result += contribution * p.cost;
      });

    return result;
  }

  addProducer(arg: Producer) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }
}
