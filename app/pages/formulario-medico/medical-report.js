import {
  currentHour,
  currenteDate,
  dateFormatter,
  dateISOtoStringFormatter,
} from "../../util/formatter.js";

import { Gender } from "../../model/gender.js";
import { Report } from "../../model/report.js";
import { User } from "../../model/user.js";
import { UserService } from "../../service/user.service.js";

//função auto-executável para implementar o Module Pattern
(function () {
  //Trata o evento de clique no botão limpar para apagar os campos do formulário
  document
    .querySelector("#reset-button")
    .addEventListener("click", function () {
      document.getElementById("report-form").reset();
    });

  /**
   * Validação antecipada realizada antes da submissão do formulário.
   */
  // Faz a validação e apresenta uma mensagem customizada de erro quando o campo perde o foco
  document.querySelector("#input-name").addEventListener("blur", function () {
    validateNameField();
  });

  //Faz a validação e apresenta uma mensagem customizada de erro à medida em que se vai digitando
  document.querySelector("#input-cpf").addEventListener("input", function () {
    validateCPF();
  });

  //Faz a validação via evento invalid, disparado apenas quando pressionado o botão de submit
  //O evento não é disparado quando o formulário tem a diretiva novalidate
  // document.querySelector('#input-cep').addEventListener('invalid', function () {
  //   validateCEP();
  // });

  //Habilita ou desabilita o botão de envio com base nas mudanças no formulário.
  enableSubmitButtonOnFormChange();

  /**
   * Trata do evento de submissão do formulário
   */
  document.getElementById("report-form").onsubmit = function (event) {
    // Previne o envio padrão do formulário, evitando a recarga da página
    event.preventDefault();

    if (!isFormValid()) {
      alertify.error("Por favor, verifique os campos destacados.");
      return;
    }

    //Faz a leitura dos dados do formulário
    const user = readFormDataAndCreateUser();

    //debugger;

    //Faz a leitura dos sintomas
    const symptoms = readSelectedSymptoms();

    // Cria uma instância da classe Report com os dados do usuário e sintomas
    let report = new Report(user, symptoms);

    //solicita a impressão das informações na tela
    updateTextWithReportInfo(report);

    //mostra o modal com o relatório
    let modal = M.Modal.getInstance(
      document.getElementById("medical-report-modal")
    );
    modal.open();
  };

  /**
   * Lê os sintomas selecionados no formulário e retorna um array de sintomas.
   * @returns {Array} Um array contendo os sintomas selecionados.
   */
  function readSelectedSymptoms() {
    let symptoms = [];
    for (let elem of document.getElementsByName("symptom-group")) {
      if (elem.checked) {
        symptoms.push(elem.value);
      }
    }
    return symptoms;
  }

  /**
   * Lê os dados do formulário e retorna um objeto de usuário.
   * @returns {User} O objeto de usuário com os dados lidos do formulário.
   */
  function readFormDataAndCreateUser() {
    // Coleta dados do formulário
    let name = document.getElementById("input-name").value;
    let cpf =
      document.getElementById("report-form").elements["input-cpf"].value;
    let cep = document.forms[0].elements["input-cep"].value;
    let insurance = document.querySelector("#select-insurance").value;

    // Obtém o gênero com base na seleção do usuário
    let gender = document.querySelector("#input-gender-masculine").checked
      ? Gender.MALE
      : Gender.FEMALE;

    // Obtém a data de nascimento do input
    let birthday = document.querySelector("#input-date").value;

    // Cria e retorna uma instância da classe User com os dados coletados
    return new User(name, cpf, cep, gender, birthday, insurance);
  }

  /**
   * Atualiza o texto do painel com as informações do relatório e do usuário.
   * @param {object} report - O objeto de relatório contendo informações a serem exibidas.
   */
  function updateTextWithReportInfo(report) {
    // Inicializa o serviço do usuário
    let userService = new UserService();

    // Obtém informações do usuário a partir do relatório
    let user = report.user;

    // Atualiza o campo CPF no formulário
    document.querySelector("#span-cpf").textContent = user.cpf;

    // Atualiza o campo Data de Nascimento no formulário
    document.querySelector("#span-birthday").textContent =
      dateISOtoStringFormatter(user.birthday);

    // Calcula a idade do usuário e atualiza o campo correspondente
    document.querySelector("#span-age").textContent = userService.calculateAge(
      user.birthday
    );

    // Atualiza o campo CEP no formulário
    document.querySelector("#span-cep").textContent = user.cep;

    // TODO: Habilitar para explicar requisições assíncronas
    // Atualiza o campo Cidade no formulário usando requisição assíncrona
    // async function updateCity() {
    //   const city = await userService.getCityFromCep();
    //   document.querySelector('#span-city').textContent = city;
    // }
    // updateCity(); // Chama a função para buscar a cidade

    // Atualiza o campo Gênero no formulário
    document.querySelector("#span-genre").textContent =
      user.genre == Gender.MALE ? "ELE" : "ELA";

    // Atualiza o campo Paciente no formulário
    document.querySelector(
      "#span-patient"
    ).innerHTML = `<strong>${user.name}</strong>`;

    // Atualiza o campo Plano de Saúde no formulário
    document.querySelector("#span-insurance").textContent = user.healthPlan;

    // TODO: Esconder o texto 'Os seus sintomas incluem' via jQuery quando não há sintomas.
    if (report.symptoms && report.symptoms.length > 0) {
      document.querySelector("#span-symptoms").textContent =
        report.symptoms.join(", ");
    }

    // Atualiza a data e hora atuais no formulário
    document.getElementById("span-now-date").textContent = currenteDate();
    document.getElementById("span-now-hour").textContent = currentHour();
  }

  function isFormValid() {
    return (
      validateNameField() &&
      validateCPF() &&
      validateCEP() &&
      validateGender() &&
      validateSymptoms()
    );
  }

  /**
   * Valida o campo de Nome
   * @returns
   */
  function validateNameField() {
    const nameInput = document.getElementById("input-name");
    const nameError = document.getElementById("name-error");
    if (nameInput.validity.valueMissing) {
      nameError.textContent = "O campo é obrigatório.";
      nameError.style.display = "block";
      return false;
    }
    if (nameInput.validity.patternMismatch) {
      nameError.textContent = "O valor não corresponde a um nome válido.";
      nameError.style.display = "block";
      return false;
    }
    nameError.style.display = "none";
    return true;
  }

  /**
   * Valida o campo de CPF
   * @returns
   */
  function validateCPF() {
    const cpfInput = document.getElementById("input-cpf");
    const cpfError = document.getElementById("cpf-error");

    // Verifica se o campo está em branco
    if (cpfInput.validity.valueMissing) {
      cpfError.textContent = "O campo é obrigatório.";
      cpfError.style.display = "block";
      return false;
    }

    // Verifica se o valor não corresponde a um CPF válido (exemplo: 123.456.789-00)
    if (cpfInput.validity.patternMismatch) {
      cpfError.textContent = "O valor não corresponde a um CPF válido.";
      cpfError.style.display = "block";
      return false;
    }

    // TODO Adicionalmente, você pode adicionar uma função para verificar a validade do CPF
    cpfError.style.display = "none";
    return true;
  }

  /**
   * Valida o campo de CEP
   * @returns
   */
  function validateCEP() {
    const cepInput = document.getElementById("input-cep");
    const cepError = document.getElementById("cep-error");

    // Verifica se o campo está em branco
    if (cepInput.validity.valueMissing) {
      //Apresenta o texto no span logo abaixo do input
      cepError.textContent = "O campo é obrigatório.";
      cepError.style.display = "block";
      //Também apresenta o texto no balão do input.
      cepInput.setCustomValidity("O campo é obrigatório.");
      return false;
    }

    // Verifica se o valor não corresponde a um CEP válido (exemplo: 12345-678)
    if (cepInput.validity.patternMismatch) {
      cepError.textContent = "O valor não corresponde a um CEP válido.";
      cepError.style.display = "block";
      cepInput.setCustomValidity("O valor não corresponde a um CEP válido.");
      return false;
    }

    cepError.style.display = "none";
    return true;
  }

  /**
   * Valida a seleção do gênero.
   * @returns
   */
  function validateGender() {
    const masculineInput = document.getElementById("input-gender-masculine");
    const feminineInput = document.getElementById("input-gender-feminine");
    const genderError = document.getElementById("gender-error");

    // Verifica se ambos os botões de rádio não estão marcados
    if (!masculineInput.checked && !feminineInput.checked) {
      genderError.textContent = "Selecione um gênero.";
      genderError.style.display = "block";
      return false;
    }

    genderError.style.display = "none";
    return true;
  }

  /**
   * Esta função adiciona um ouvinte de eventos 'change' ao formulário para monitorar
   * as mudanças nos campos de sintomas. Ela atualiza o estado de validação do formulário
   * para permitir ou não a submissão com base se pelo menos um dos sintomas está marcado.
   * @function
   */
  function validateCustomFieldsOnFormChange() {
    const symptomCheckboxes = document.querySelectorAll(
      '[name="symptom-group"]'
    );

    const reportForm = document.getElementById("report-form");

    // Adicione um ouvinte de eventos 'change' ao formulário
    reportForm.addEventListener("change", function () {
      //checkboxes
      const isAtLeastOneSymptomChecked = [...symptomCheckboxes].some(
        (checkbox) => checkbox.checked
      );

      // Use setCustomValidity para definir a mensagem de erro personalizada
      if (!isAtLeastOneSymptomChecked) {
        // Defina a validade personalizada para o erro
        symptomCheckboxes[0].setCustomValidity(
          "Por favor, marque pelo menos um dos sintomas."
        );
      } else {
        // Se tudo estiver correto, limpe a validade personalizada
        symptomCheckboxes[0].setCustomValidity("");
      }
    });
  }

  /**
   * Valida se pelo menos um sitoma foi marcado.
   */
  function validateSymptoms() {
    // Seleciona todos os checkboxes com name="symptom-group"
    const checkboxes = document.querySelectorAll('input[name="symptom-group"]');
    const symptomError = document.getElementById("symptom-error");

    // Define uma variável para rastrear se pelo menos um checkbox está marcado
    let atLeastOneChecked = false;

    // Itera sobre os checkboxes usando um loop for
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        atLeastOneChecked = true;
        break; // Sai do loop assim que encontrar um checkbox marcado
      }
    }

    // Se nenhum checkbox estiver marcado, mostra uma mensagem de erro
    if (!atLeastOneChecked) {
      symptomError.style.display = "block";
    }

    symptomError.style.display = "none";
    return atLeastOneChecked;
  }

  /**
   * Habilita ou desabilita o botão de envio com base nas mudanças no formulário.
   */
  function enableSubmitButtonOnFormChange() {
    const submitButton = document.getElementById("submit-button");
    submitButton.disabled = true; // Desativa o botão inicialmente

    //monitora as mudanças nos campos de gênero e sintomas para atualizar o estado de validação do formulário para permitir ou
    //não a submissão com base se pelo menos um dos sintomas ou gênero está marcado.
    validateCustomFieldsOnFormChange();

    // Ouve as mudanças nos campos do formulário e habilita o botão quando o formulário for válido
    document
      .getElementById("report-form")
      .addEventListener("change", function () {
        if (this.checkValidity()) {
          submitButton.disabled = false;
        } else {
          submitButton.disabled = true;
        }
      });
  }
})();
