// Importa a classe User do arquivo user.js no diretório model
// É preciso usar a extensão .js no final do nome do arquivo.

import { User } from '../../model/user.js';

// Define uma função para modularizar o código da aplicação, simulando a visibilidade private
//para os outros arquivos.
let main = function () {
  // Obtém o elemento do formulário com o id 'form-report' e define seu evento 'onsubmit'
  //A função somente será chamada depois que o usuário clicar no botão "Enviar"
  document.getElementById('form-report').onsubmit = function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário, evitando recarregar a página

    // Obtém os valores dos elementos de entrada do formulário
    let name = document.getElementById('input-name').value;
    let insurance = document.querySelector('#select-insurance').value;
    let isMasculine = document.querySelector('#input-gender-masculine').checked;

    // Define o conteúdo do elemento com id 'span-genre' com base no gênero
    document.querySelector('#span-genre').textContent =
      isMasculine == true ? 'ELE' : 'ELA';

    // Cria uma instância da classe User com os valores obtidos do formulário
    let user = new User(name, '', '', '', '', insurance);

    // Define o conteúdo do elemento com id 'span-patient' com o nome do usuário
    document.querySelector('#span-patient').textContent = user.name;
    // Define o conteúdo do elemento com id 'span-insurance' com o plano de saúde do usuário
    document.querySelector('#span-insurance').textContent = user.healthPlan;
  };
};

// Chama a função main para iniciar a funcionalidade quando a página carregar
main();
