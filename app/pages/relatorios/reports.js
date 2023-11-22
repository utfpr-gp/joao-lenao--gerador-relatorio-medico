/**
 * Carrega e exibe relatórios do localStorage
 */
function loadAndDisplayReports() {
  // Obtém os relatórios do localStorage
  const reports = JSON.parse(localStorage.getItem('reports')) || [];

  // Obtém a referência ao da lista no HTML
  const reportList = document.getElementById('report-list');

  // Obtém o modelo do card
  const cardModel = document.querySelector('#card-model');
  //cardModel.style.display = 'block';

  // Limpa a lista antes de adicionar os relatórios e depois de salvar a referência em cardModel
  reportList.innerHTML = '';

  // Itera sobre os relatórios e os adiciona à lista no HTML
  for (let i = 0; i < reports.length; i++) {
    const report = reports[i];

    // Clona o modelo do card
    const clonedCard = cardModel.cloneNode(true);

    clonedCard.querySelector('#name-span').textContent = report.user.name;
    clonedCard.querySelector('#name-secondary-span').textContent =
      report.user.name;
    clonedCard.querySelector(
      '.my-card-image'
    ).src = `https://doodleipsum.com/300/avatar-3?n=${i}`;
    clonedCard.querySelector('#cpf-span').textContent = report.user.cpf;
    clonedCard.querySelector('#gender-span').textContent = report.user.genre;
    clonedCard.querySelector('#birthday-span').textContent =
      report.user._birthday;
    clonedCard.querySelector('#insurance-span').textContent =
      report.user.healthPlan;
    clonedCard.querySelector('#cep-span').textContent = report.user.cep;

    reportList.appendChild(clonedCard);

    // Cria um card do Materialize para cada relatório usando string template
    // const cardHtml = `
    //     <div class="col s12 m6 l4">
    //         <div class="card blue-grey darken-1">
    //             <div class="card-content white-text">
    //                 ${report.user.name}
    //                 ${report.user.cpf}
    //             </div>
    //         </div>
    //     </div>
    // `;

    //Adiciona o card à lista no HTML
    // reportList.innerHTML += cardHtml;
  }

  //após a renderização pronta, apenas apresenta os resultados
  const hasResults = reports.length > 0;
  showResultsContainer(hasResults);
}

function showResultsContainer(hasResults) {
  const noResultDiv = document.getElementById('no-result');
  const reportContainerDiv = document.getElementById('report-container');
  const reportContainerSkeleton = document.getElementById(
    'report-container-skeleton'
  );
  reportContainerSkeleton.style.display = 'none';
  if (hasResults) {
    noResultDiv.style.display = 'none';
    reportContainerDiv.style.display = 'block';
  } else {
    noResultDiv.style.display = 'block';
    reportContainerDiv.style.display = 'none';
  }
}

// Chama a função ao carregar a página
window.onload = loadAndDisplayReports;
