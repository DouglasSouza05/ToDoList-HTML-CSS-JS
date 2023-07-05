// Código JavaScript

// Criando as variáveis inputText e addTaskButton para receber as entradas
const inputText = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

// const validateInputs = () => {
//   if (inputText.value.trim() > 0) {
//     return true;
//   } else {
//     return false;
//   }
//   ou
//   return inputText.value.trim().length > 0;
// };

// Criando função para validar o Input, pegando a entrada (value), usando o "trim()" para retirar os espaços em brancos e usando .length para pegar o comprimento da String
function inputValidation(input) {
  if (input.value.trim().length > 0) {
    return true;
  } else {
    return false;
  }
}

// Usando uma arrow function
const handleAddTask = () => {
  // Criando uma variável para armazenar "True" ou "False" da função InputValidation
  const validInput = inputValidation(inputText);

  // Caso receba "False", será adicionada uma classe "error" no elemento
  // Usando return pois caso a validação fracasse, a task não será adicionada
  if (!validInput) {
    return inputText.classList.add("error");
  }
};

// Arrow function usada para verificar a mudança na entrada de dados do elemento inputText
const inputChange = () => {
  const validInput = inputValidation(inputText);

  // Caso receba "True", será removida a classe "error" criada no elemento
  if (validInput) {
    return inputText.classList.remove("error");
  }
};

// Usando o método addEventListener em JS para vincular um manipulador de eventos ao elemento Button
addTaskButton.addEventListener("click", () => handleAddTask());

// Criando um EventListener para o inputText para caso haja mudança da entrada
inputText.addEventListener("change", () => inputChange());
