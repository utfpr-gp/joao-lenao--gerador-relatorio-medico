export class User {
  constructor(name, cpf, cep, genre, birthday, healthPlan) {
    this.name = name;
    this.cpf = cpf;
    this.cep = cep;
    this.genre = genre;
    this.birthday = birthday;
    this.healthPlan = healthPlan;
  }

  calculateAge() {
    const today = new Date();
    const birthDate = new Date(this.birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  async getCityFromCep() {
    const response = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`);
    const data = await response.json();
    return data.localidade;
  }
}
