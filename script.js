// Constants and Initializations
const CATEGORIES = {
  all: 'All',
  physical: 'Physical',
  mental: 'Mental',
  social: 'Social'
};

let currentProject = CATEGORIES.all;
let editTodoProjectName;
let editTodoId;
let todoPos;

const toDoList = new ToDoList();

// DOM Element References
const todosDiv = document.querySelector('.todos');
const ul = document.querySelector('ul');
const addTodoBtn = document.querySelector('.add-todo');
const form = document.querySelector('form');
const formHeader = document.querySelector('.form-header');
const cancelBtn = document.querySelector('.cancel-btn');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const dueDateInput = document.querySelector('#dueDate');
const isCompletedInput = document.querySelector('#isCompleted');
const dropdownContainerViewTodos = document.querySelector(
  '.dropdown-container-view-todos'
);
const dropdownContainerAddTodo = document.querySelector(
  '.dropdown-container-add-todo'
);

// Display Todos Function
const displayTodos = () => {
  ul.innerHTML = '';
  const todos = toDoList.getTodos(currentProject);
  for (const element of todos) {
    const todo = element;
    const { title, description, dueDate, projectName } = todo;
    const li = document.createElement('li');
    li.textContent = `Project: ${projectName}, Title: ${title}, Description: ${description}, Due Date: ${dueDate}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.isCompleted;
    checkbox.addEventListener('click', () =>
      toDoList.toggleTodoIsComplete(todo.id)
    );
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
    editButton.addEventListener('click', () => {
      editTodoFromDom(todo);
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => {
      toDoList.deleteTodo(todo.id);
      displayTodos();
    });
    li.appendChild(checkbox);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    ul.appendChild(li);
  }
};

// Event Listeners
addTodoBtn.addEventListener('click', showAddTodoForm);

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const title = formData.get('title');
  const description = formData.get('description');
  const dueDate = formData.get('dueDate');
  const isCompleted = formData.has('isCompleted');
  const projectDropdown = document.querySelector(
    '.dropdown-container-add-todo select'
  );
  let projectName = projectDropdown.value;

  if (formHeader.textContent === 'Add Todo') {
    toDoList.addTodo(title, description, dueDate, isCompleted, projectName);
  } else {
    const updatedTodo = new Todo(
      title,
      description,
      dueDate,
      isCompleted,
      projectName
    );
    updatedTodo.id = editTodoId;
    toDoList.editTodo(editTodoId, updatedTodo);
  }

  hideAddTodoForm();
  displayTodos();
});

cancelBtn.addEventListener('click', e => {
  e.preventDefault();
  hideAddTodoForm();
});

// DOM Manipulation Functions
function showAddTodoForm() {
  form.style.visibility = 'visible';
  todosDiv.style.display = 'none';
  formHeader.textContent = 'Add Todo';
  addTodoBtn.style.display = 'none';
  titleInput.value = '';
  descriptionInput.value = '';
  dueDateInput.value = '';
  isCompletedInput.checked = false;
  dropdownContainerViewTodos.style.display = 'none';
}

function hideAddTodoForm() {
  form.style.visibility = 'hidden';
  todosDiv.style.display = 'block';
  addTodoBtn.style.display = 'block';
  dropdownContainerViewTodos.style.display = 'block';
}

function editTodoFromDom(todo) {
  showAddTodoForm();
  const { title, description, dueDate, isCompleted, projectName } = todo;
  titleInput.value = title;
  descriptionInput.value = description;
  dueDateInput.value = dueDate;
  isCompletedInput.checked = isCompleted;
  formHeader.textContent = 'Edit Todo';
  editTodoId = todo.id;
  editTodoProjectName = projectName;

  const projectDropdown = document.querySelector(
    '.dropdown-container-add-todo select'
  );
  if (projectDropdown) {
    projectDropdown.value = projectName;
  }
}

// Dropdown Initialization and Event
function createDropDown(domElement, options) {
  const dropdown = document.createElement('select');
  for (const value of options) {
    const option = document.createElement('option');
    option.value = value;
    option.text = value;
    dropdown.appendChild(option);
  }
  dropdown.value = CATEGORIES.all;
  domElement.appendChild(dropdown);
}

dropdownContainerViewTodos.addEventListener('change', e => {
  currentProject = e.target.value;
  displayTodos();
});

const initialize = () => {
  // Adding initial todos
  toDoList.addTodo(
    'Get sleep',
    'Lie in bed and count my breaths',
    '2023-11-12',
    false,
    CATEGORIES.physical
  );
  toDoList.addTodo(
    'Stretch',
    'Lengthen my arms, neck, shoulders, forearms, chest, lats',
    '2023-11-30',
    true,
    CATEGORIES.physical
  );
  toDoList.addTodo(
    'Read',
    'Lots of books',
    '2024-12-12',
    false,
    CATEGORIES.mental
  );
  toDoList.addTodo(
    'Make friends',
    'And influence people',
    '2023-12-12',
    false,
    CATEGORIES.social
  );

  // view to dos dropdown
  createDropDown(dropdownContainerViewTodos, Object.values(CATEGORIES));
  // add to do dropdown
  const values = Object.values(CATEGORIES).filter(
    elem => elem !== CATEGORIES.all
  );
  createDropDown(dropdownContainerAddTodo, values);

  // Initial Display Call
  displayTodos();
  // showAddTodoForm();
};

initialize();
