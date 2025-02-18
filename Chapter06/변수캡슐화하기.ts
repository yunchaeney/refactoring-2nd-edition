let defaultOwner = { firstName: '마틴', lastName: '파울러' };

let spaceship: any = {};

function getDefaultOwner() {
  return defaultOwner;
}
function setDefaultOwner(arg: any) {
  defaultOwner = arg;
}

spaceship.owner = getDefaultOwner();
setDefaultOwner({ firstName: '레베카', lastName: '파슨스' });

class Person {
  private _firstName: string;
  private _lastName: string;

  constructor(data: { firstName: string; lastName: string }) {
    this._lastName = data.lastName;
    this._firstName = data.firstName;
  }

  get firstName() {
    return this._firstName;
  }
  get lastName() {
    return this._lastName;
  }
}
