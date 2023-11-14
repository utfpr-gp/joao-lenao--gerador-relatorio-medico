export class ReportService {
  constructor() {}

  // Constante para a chave do armazenamento local
  LOCAL_STORAGE_KEY = 'reports';

  saveLocal(report) {
    // Obtendo relatórios do armazenamento local
    let reports = localStorage.getItem(this.LOCAL_STORAGE_KEY);

    // Verificando se há relatórios existentes
    reports = reports ? JSON.parse(reports) : [];

    // Adicionando o novo relatório ao array
    reports.push(report);

    // Salvando os relatórios atualizados no armazenamento local
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(reports));

    // Retornando os relatórios atualizados
    return reports;
  }
}
