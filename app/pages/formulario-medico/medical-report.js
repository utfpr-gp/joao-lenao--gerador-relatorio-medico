import {
  currentHour,
  currenteDate,
  dateFormatter,
  dateISOtoStringFormatter,
} from '../../util/formatter.js';

import { Gender } from '../../model/gender.js';
import { Report } from '../../model/report.js';
import { User } from '../../model/user.js';
import { UserService } from '../../service/user.service.js';

let main = function () {
  document
    .querySelector('#reset-button')
    .addEventListener('click', function () {
      document.getElementById('report-form').reset();
    });

  document.getElementById('report-form').onsubmit = function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário, evitando a recarga da página

    // Coleta dados do formulário
    let name = document.getElementById('input-name').value;
    let cpf =
      document.getElementById('report-form').elements['input-cpf'].value;
    let cep = document.forms[0].elements['input-cep'].value;
    let insurance = document.querySelector('#select-insurance').value;

    // Obtém o gênero com base na seleção do usuário
    let gender = document.querySelector('#input-gender-masculine').checked
      ? Gender.MALE
      : Gender.FEMALE;

    // Obtém a data de nascimento do input
    let birthday = document.querySelector('#input-date').value;

    // Cria uma instância da classe User com os dados coletados
    let user = new User(name, cpf, cep, gender, birthday, insurance);

    //debugger;

    // Faz a leitura dos sintomas selecionados
    let symptoms = [];
    for (let elem of document.getElementsByName('symptom-group')) {
      if (elem.checked) {
        symptoms.push(elem.value);
      }
    }

    // Cria uma instância da classe Report com os dados do usuário e sintomas
    let report = new Report(user, symptoms);
    let userService = new UserService();

    // Atualiza o conteúdo das partes do formulário com informações do usuário e relatório
    document.querySelector('#span-cpf').textContent = user.cpf;

    document.querySelector('#span-birthday').textContent =
      dateISOtoStringFormatter(user.birthday);

    document.querySelector('#span-age').textContent = userService.calculateAge(
      user.birthday
    );
    document.querySelector('#span-cep').textContent = user.cep;

    //TODO Habilitar para explicar requisições assíncronas
    // Função assíncrona para buscar a cidade com base no CEP e atualizar o campo
    // async function searchCity() {
    //   const city = await userService.getCityFromCep();
    //   document.querySelector('#span-city').textContent = city;
    // }
    // searchCity(); // Chama a função para buscar a cidade

    document.querySelector('#span-genre').textContent =
      user.genre == Gender.MALE ? 'ELE' : 'ELA';
    document.querySelector(
      '#span-patient'
    ).innerHTML = `<strong>${user.name}</strong>`;
    document.querySelector('#span-insurance').textContent = user.healthPlan;
    //TODO esconder o texto 'Os seus sintomas incluem' via jQuery quando não há sintomas.
    if (report.symptoms && report.symptoms.length > 0) {
      document.querySelector('#span-symptoms').textContent =
        report.symptoms.join(', ');
    }

    // Atualiza a data e a hora atuais
    document.getElementById('span-now-date').textContent = currenteDate();
    document.getElementById('span-now-hour').textContent = currentHour();
  };
};
main();
