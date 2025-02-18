
const reading = {
    customer: 'ivan',
    quantity: 10,
    month: 5,
    year: 2017
}

function acquireReading() {
    return reading;
}

export function baseRate(month: number, year: number) {
    if (year === 2017 && month === 5) return 0.1;
    return 0.2;
}

export function taxThreshold(year: number) {
    return 0.1;
}

// Client1
const aReading1 = acquireReading();
const baseCharge = baseRate(aReading1.month, aReading1.year) * aReading1.quantity;

// Client2
const aReading2 = acquireReading();
const base = (baseRate(aReading2.month, aReading2.year) * aReading2.quantity);
const texableCharge = Math.max(0, base - taxThreshold(aReading2.year));

// Client3
const aReading3 = acquireReading();
const basicChargeAmount = calculateBaseChare(aReading3);

function calculateBaseChare(aReading: typeof reading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

//=================

// 1. 레코드를 캡슐화
export class Reading {
    private _customer: string;
    private _quantity: number;
    private _month: number;
    private _year: number;


    constructor(data: typeof reading) {
        this._customer = data.customer;
        this._quantity = data.quantity;
        this._month = data.month;
        this._year = data.year;
    }

    get customer() {return this._customer;}
    get quantity() {return this._quantity;}
    get month()    {return this._month;}
    get year()     {return this._year;}

    get baseChare() {
        return baseRate(this.month, this.year) * this.quantity;
    }
}

// Client3...
const rawReading = acquireReading();
const aReadingNew = new Reading(rawReading)

const basicChargeAmount = aReadingNew.baseChare;


    get baseCharge() {
        return  baseRate(this.month, this.year) * this.quantity;
    }

    get taxableCharge() {
        return Math.max(0, this.baseCharge - taxThreshold(reading.year));
    }
