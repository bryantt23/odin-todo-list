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
Object.values(CATEGORIES).forEach(category => toDoList.addProject(category));

// Adding initial todos
const physicalProject = toDoList.getProjectByName(CATEGORIES.physical);
physicalProject.addTodo(
  'Get sleep',
  'Lie in bed and count my breaths',
  '2023-11-12',
  false
);
physicalProject.addTodo(
  'Stretch',
  'Lengthen my arms, neck, shoulders, forearms, chest, lats',
  '2023-11-30',
  true
);
const mentalProject = toDoList.getProjectByName(CATEGORIES.mental);
mentalProject.addTodo('Read', 'Lots of books', '2024-12-12', false);
const socialProject = toDoList.getProjectByName(CATEGORIES.social);
socialProject.addTodo(
  'Make friends',
  'And influence people',
  '2023-12-12',
  false
);

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
const dropdownContainer = document.querySelector('.dropdown-container');

// Display Todos Function
const displayTodos = () => {
  ul.innerHTML = '';
  const todos = toDoList.getTodos(currentProject);
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const { title, description, dueDate, projectName } = todo;
    const project = toDoList.getProjectByName(projectName);
    const li = document.createElement('li');
    li.textContent = `Project: ${projectName}, Title: ${title}, Description: ${description}, Due Date: ${dueDate}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.isCompleted;
    checkbox.addEventListener('click', () =>
      project.toggleTodoIsComplete(todo)
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
      project.deleteTodo(todo.id);
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

  if (formHeader.textContent === 'Add Todo') {
    const currentProjectTodos = toDoList.getProjectByName(currentProject);
    currentProjectTodos.addTodo(title, description, dueDate, isCompleted);
  } else {
    const editProject = toDoList.getProjectByName(editTodoProjectName);
    const updatedTodo = new Todo(
      title,
      description,
      dueDate,
      isCompleted,
      editTodoProjectName
    );
    updatedTodo.id = editTodoId;
    editProject.editTodo(editTodoId, updatedTodo);
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
}

function hideAddTodoForm() {
  form.style.visibility = 'hidden';
  todosDiv.style.display = 'block';
  addTodoBtn.style.display = 'block';
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
}

// Dropdown Initialization and Event
function createDropDown() {
  const dropdown = document.createElement('select');
  for (const [key, value] of Object.entries(CATEGORIES)) {
    const option = document.createElement('option');
    option.value = value;
    option.text = value;
    dropdown.appendChild(option);
  }
  dropdown.value = CATEGORIES.all;
  dropdownContainer.appendChild(dropdown);
}

createDropDown();

dropdownContainer.addEventListener('change', e => {
  currentProject = e.target.value;
  displayTodos();
});

// Initial Display Call
displayTodos();
