export class UserService {
  constructor() {}

  /**
   * Função assíncrona que busca a cidade com base em um CEP fornecido, fazendo uma solicitação à API do ViaCEP.
   * @param {string} cep - O CEP a partir do qual a cidade será obtida.
   * @returns {Promise<string>} Uma promessa que resolve com o nome da cidade obtido do CEP.
   */
  async getCityFromCep(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data.localidade;
  }

  /**
   * Calcula a idade com base na data de nascimento fornecida.
   * @param {Date} birthday - A data de nascimento a partir da qual a idade será calculada.
   * @returns {number} A idade calculada com base na data de nascimento.
   */
  calculateAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
