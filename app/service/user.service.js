export class UserService {
  constructor() {}

  /**
   * Método assíncrono que busca a cidade com base em um CEP fornecido, fazendo uma solicitação à API do ViaCEP.
   * @param {string} cep - O CEP a partir do qual a cidade será obtida.
   * @returns {Promise<string>} Uma promessa que resolve com o nome da cidade obtido do CEP.
   */
  async getCityFromCep(cep) {
    try {
      // Faz uma solicitação à API do ViaCEP usando o Fetch API
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      // Converte a resposta de JSON para objeto
      const data = await response.json();

      // Retorna o nome da cidade obtido do CEP
      return data.localidade;
    } catch (error) {
      // Captura e trata erros durante a requisição
      console.error('Falha ao retornar a cidade:', error);
      throw error; // Propaga o erro para quem chamou a função
    }
  }

  /**
   * Método que busca a cidade com base em um CEP fornecido, fazendo uma solicitação à API do ViaCEP.
   * @param {string} cep - O CEP a partir do qual a cidade será obtida.
   * @returns {Promise<string>} Uma promessa que resolve com o nome da cidade obtido do CEP.
   */
  fetchCityFromCep(cep) {
    // Faz uma solicitação à API do ViaCEP usando o Fetch API
    return fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        // Converte a resposta de JSON para objeto
        return response.json();
      })
      .then((data) => {
        // Retorna o nome da cidade obtido do CEP
        return data.localidade;
      })
      .catch(function (err) {
        // Captura e trata erros durante a requisição
        console.error('Falha ao retornar a cidade', err);
        throw err; // Propaga o erro para quem chamou a função
      });
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
