// Código JavaScript

const inputText = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const taskContainer = document.querySelector(".task-container");

// Criando função para validar o Input, pegando a entrada (value), usando o "trim()" para retirar os espaços em brancos e usando .length para pegar o comprimento da String
function inputValidation(input) {
  if (input.value.trim().length > 0) {
    return true;
  } else {
    return false;
  }
}

const updateLocalStorage = () => {
  const tasks = taskContainer.children;

  // Lista contendo todos as tasks criadas (taskContainer.children) e utilizando função "map()" nessa lista para cada uma das tasks No FOR é possível usar taskContainer.children normalmente mas no map() não, por isso usa-se a lista ([...tasks])
  const tasksLocalStorage = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, status: isCompleted };
  });

  // localStorage é variável Global. Usando função setItem() e etiquetando como "tasks". Após isso, é feita a conversão do return da função tasksLocalStorage (JSON) para string. Necessário pois o armazenamento local do navegador aceita somente strings como valores.
  localStorage.setItem("tasks", JSON.stringify(tasksLocalStorage));
};

const refreshToDoList = () => {
  const tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));

  if (!tasksFromStorage) {
    return null;
  }

  for (const savedTask of tasksFromStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.classList.add("task-on");

    // Definindo o innerText do parágrafo como sendo o "description" da task salva no Local Storage
    taskContent.innerText = savedTask.description;

    // Se o dado salvo em "status" da task salva for true, então adicionar a classe "completed" a essa mesma task ao acontecer o refresh
    if (savedTask.status === true) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () =>
      handleClick(taskContent)
    );

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid");
    deleteIcon.classList.add("fa-trash");

    deleteIcon.addEventListener("click", () =>
      handleDeleteTask(taskContent, taskItemContainer)
    );

    // Colocando o parágrafo e o ícone criados dentro da div .task-item
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteIcon);

    // Colocando o taskItemContainer dentro do taskContainer, div que irá armazenar tudo
    taskContainer.appendChild(taskItemContainer);
  }
};

const handleClick = (taskContent) => {
  // Constante que pega todos os "task-item" dentro do taskContainer
  // OBS: Por algum motivo a função .childNodes não funcionou, somente .children forneceu a solução para o problema. Nesse caso o erro era:
  // Uncaught TypeError: Cannot read properties of null (reading 'isSameNode')
  //   at handleClick (scripts.js:40:25)
  //   at HTMLParagraphElement.<anonymous> (scripts.js:71:5)
  const tasks = taskContainer.children;

  // Percorrendo todos os "task-item" e conferindo se é igual ao taskContent que recebeu o click
  for (const item of tasks) {
    if (item.firstChild && item.firstChild.isSameNode(taskContent)) {
      // Se igual, vai mudar a class do taskContent para "completed" e vice-versa (toggle)
      item.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
};

const handleDeleteTask = (taskContent, taskItemContainer) => {
  const tasks = taskContainer.children;

  // Percorrendo todos os "task-item" e conferindo se é igual ao taskContent que recebeu o click
  for (const item of tasks) {
    if (item.firstChild && item.firstChild.isSameNode(taskContent)) {
      taskItemContainer.remove();
    }
  }

  updateLocalStorage();
};

// Usando uma Arrow Function
const handleAddTask = () => {
  const validInput = inputValidation(inputText);

  // Caso receba "False", será adicionada uma classe "error" no elemento
  if (!validInput) {
    return inputText.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.classList.add("task-on");
  // Definindo o innerText do parágrafo como sendo o "value" da entrada inputText
  taskContent.innerText = inputText.value;

  taskContent.addEventListener("click", () =>
    handleClick(taskContent)
  );

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid");
  deleteIcon.classList.add("fa-trash");

  deleteIcon.addEventListener("click", () =>
    handleDeleteTask(taskContent, taskItemContainer)
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteIcon);

  taskContainer.appendChild(taskItemContainer);

  // Limpando o campo de "Add The Text Here" após a criação da task
  inputText.value = "";

  updateLocalStorage();
};

// Arrow function usada para verificar a mudança na entrada de dados do elemento inputText
const inputChange = () => {
  const validInput = inputValidation(inputText);

  // Caso receba "True", será removida a classe "error" criada no elemento
  if (validInput) {
    return inputText.classList.remove("error");
  }
};

refreshToDoList();

// Usando o método addEventListener em JS para vincular um manipulador de eventos ao elemento Button
addTaskButton.addEventListener("click", () => handleAddTask());

// Criando um EventListener para o inputText para caso haja mudança da entrada
inputText.addEventListener("change", () => inputChange());
