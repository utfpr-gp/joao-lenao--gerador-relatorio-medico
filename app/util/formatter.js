/**
 * Formata a data fornecida em uma string no formato de data brasileiro.
 * @param {Date} date - A data que será formatada.
 * @returns {string} A data formatada no formato "DD/MM/YYYY" (dia/mês/ano).
 */
function dateFormatter(date) {
  return date.toLocaleDateString('pt-BR');
}

/**
 * Converte uma data em formato ISO (AAAA-MM-DD) para uma string formatada no estilo "DD/MM/AAAA".
 * @param {string} date - A data no formato ISO (AAAA-MM-DD) a ser convertida.
 * @returns {string} A data formatada no formato "DD/MM/AAAA" (dia/mês/ano).
 */
function dateToStringFormatter(date) {
  // Divide o valor em ano, mês e dia
  let [year, month, day] = date.split('-');

  // Formate a data no formato "DD/MM/AAAA"
  return `${day}/${month}/${year}`;
}

/**
 * Obtém a data atual e a formata no formato de data brasileiro.
 *
 * @returns {string} A data atual no formato "DD/MM/YYYY" (dia/mês/ano).
 */
function currenteDate() {
  // Obtém o elemento de data e hora atuais
  const now = new Date();

  // Formate a data e a hora conforme necessário
  return now.toLocaleDateString('pt-BR'); // Formato de data brasileiro
}

/**
 * Obtém a hora atual e a formata no formato "hh:mm" (horas:minutos).
 *
 * @returns {string} A hora atual formatada no formato "hh:mm".
 */
function currentHour() {
  // Obtém o elemento de data e hora atuais
  const now = new Date();

  // Formate a hora para mostrar apenas horas e minutos (hh:mm)
  const hours = now.getHours().toString().padStart(2, '0'); // Garante que sempre tenha dois dígitos
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Garante que sempre tenha dois dígitos

  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
}

export {
  dateFormatter,
  currenteDate,
  currentHour,
  dateToStringFormatter as dateISOtoStringFormatter,
};
