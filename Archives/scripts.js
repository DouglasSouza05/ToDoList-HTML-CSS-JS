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

// Função para estilizar a task concluída. Usando classe "completed"
const handleClick = (taskContent) => {
  // Constante que pega todos os "task-item" dentro do taskContainer
  // OBS: Por algum motivo a função .childNodes não funcionou, somente .children forneceu a solução para o problema. Nesse caso o erro era:
  // Uncaught TypeError: Cannot read properties of null (reading 'isSameNode')
  //   at handleClick (scripts.js:40:25)
  //   at HTMLParagraphElement.<anonymous> (scripts.js:71:5)
  const tasks = taskContainer.children;

  // Somente essa linha de código não funciona. É necessário usar do For para percorrer todos os elementos.
  // taskContent.firstChild.classList.toggle("completed");

  // Percorrendo todos os "task-item" e conferindo se é igual ao taskContent que recebeu o click
  for (const item of tasks) {
    if (item.firstChild && item.firstChild.isSameNode(taskContent)) {
      // Se igual, vai mudar a class do taskContent para "completed" e vice-versa (toggle)
      item.firstChild.classList.toggle("completed");
    }
  }
};

// Função para o delete button
const handleDeleteTask = (taskContent, taskItemContainer) => {
  const tasks = taskContainer.children;
  // const taskClicked =
  //   item.firstChild && item.firstChild.isSameNode(taskContent);

  // Percorrendo todos os "task-item" e conferindo se é igual ao taskContent que recebeu o click
  for (const item of tasks) {
    if (item.firstChild && item.firstChild.isSameNode(taskContent)) {
      // Se igual, será removido o taskItemContainer
      taskItemContainer.remove();
    }
  }
};

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

  // Criando o parágrafo, conteúdo em si, que irá dentro da div.
  const taskContent = document.createElement("p");
  taskContent.classList.add("task-on");
  // Definindo o innerText do parágrafo como sendo o "value" da entrada inputText
  taskContent.innerText = inputText.value;

  // Criando um EventListener para quando houver um "click" na objeto task criada - Conclusão de tarefa
  // Passando taskContent como parâmetro para usar no FOR
  taskContent.addEventListener("click", () =>
    handleClick(taskContent)
  );

  // Criando o ícone do delete, usando Font Awesome
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid");
  deleteIcon.classList.add("fa-trash");

  // Criando um EventListener para quando houver um "click" no ícone da task criada - Deleção de tarefa
  // Passando taskItemContainer como parâmetro para realizar a exclusão
  deleteIcon.addEventListener("click", () =>
    handleDeleteTask(taskContent, taskItemContainer)
  );

  // Colocando o parágrafo e o ícone criados dentro da div .task-item
  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteIcon);

  // Colocando o taskItemContainer dentro do taskContainer, div que irá armazenar tudo
  taskContainer.appendChild(taskItemContainer);

  // Limpando o campo de "Add The Text Here" após a criação da task
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
