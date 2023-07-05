// Código JavaScript

// Criando as variáveis inputText e addTaskButton para receber as entradas. OBS: usar o "." e os nomes devem ser os mesmos criados no HTML
const inputText = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");

// Criando a variável do .task-container para adicionar os elementos de input dentro
const taskContainer = document.querySelector(".task-container");

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

  // Criando o ".tasks-container". Usando document.createElemente para criar os elementos
  // Nesse caso, criando uma "div"
  const taskItemContainer = document.createElement("div");
  // Adicionando a classe do elemento div
  taskItemContainer.classList.add("task-item");

  // Criando o parágrafo, conteúdo em si, que irá dentro da div. Não necessário criar uma classe pois não será estilizado
  const taskContent = document.createElement("p");
  // Definindo o innerText do parágrafo como sendo o "value" da entrada inputText
  taskContent.innerText = inputText.value;

  // Criando o ícone do delete, usando Font Awesome
  const deleteItem = document.createElement("i");
  deleteItem.classList.add("fa-solid");
  deleteItem.classList.add("fa-trash");

  // Colocando o parágrafo e o ícone criados dentro da div .task-item
  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  taskContainer.appendChild(taskItemContainer);

  inputText.value = "";
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
