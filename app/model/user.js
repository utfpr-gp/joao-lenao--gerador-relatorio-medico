import { Gender } from './gender.js';

export class User {
  constructor(name, cpf, cep, genre, birthday, healthPlan) {
    this.name = name;
    this.cpf = cpf;
    this.cep = cep;
    this.genre = genre;
    this._birthday = birthday;
    this.healthPlan = healthPlan;
  }

  get birthday() {
    return this._birthday;
  }

  get birthdayDate() {
    //return new Date(this._birthday + 'GMT-0300');
    return new Date(this._birthday + 'UTC-3');
  }
}
