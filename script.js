class ToDoList {
  constructor() {
    this.projects = {};
  }
  getProjectByName = name => {
    return this.projects[name];
  };
  addProject = projectName => {
    this.projects[projectName] = new Project(projectName);
  };
}

class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.todos = [];
    this.name = projectName;
  }
  getTodos = () => {
    return this.todos;
  };
  addTodo = (title, description, dueDate, isCompleted) => {
    const newTodo = new Todo(title, description, dueDate, isCompleted);
    this.todos.push(newTodo);
  };
  deleteTodo = pos => {
    this.todos.splice(pos, 1);
  };
  editTodo = (index, updatedTodo) => {
    this.todos[index] = updatedTodo;
  };
  getTodo = pos => {
    return this.todos[pos];
  };
  toggleTodoIsComplete = todo => {
    todo.isCompleted = !todo.isCompleted;
  };
}

class Todo {
  constructor(title, description, dueDate, isCompleted) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
  }
}

const CATEGORIES = { physical: 'Physical', mental: 'Mental', social: 'Social' };
let currentProject = CATEGORIES.physical; // Use the key directly

const toDoList = new ToDoList();
Object.values(CATEGORIES).forEach(category => toDoList.addProject(category));
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
console.log('🚀 ~ file: script.js:53 ~ toDoList:', toDoList);

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
let todoPos;

const displayTodos = () => {
  ul.innerHTML = '';
  const project = toDoList.getProjectByName(currentProject);
  const todos = project.getTodos();
  const length = todos.length;
  for (let i = 0; i < length; i++) {
    const todo = todos[i];
    const { title, description, dueDate } = todo;
    const li = document.createElement('li');
    li.textContent = `Title: ${title}, Description: ${description}, Due Date: ${dueDate}`;
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
      todoPos = i;
      editTodoFromDom(todo);
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => {
      project.deleteTodo(i);
      displayTodos();
    });
    li.appendChild(checkbox);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    ul.appendChild(li);
  }
};

addTodoBtn.addEventListener('click', showAddTodoForm);

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);
  const title = formData.get('title');
  const description = formData.get('description');
  const dueDate = formData.get('dueDate');
  const isCompleted = formData.has('isCompleted');
  const currentProjectTodos = toDoList.getProjectByName(currentProject);

  if (formHeader.textContent === 'Add Todo') {
    currentProjectTodos.addTodo(title, description, dueDate, isCompleted);
  } else {
    currentProjectTodos.editTodo(todoPos, {
      title,
      description,
      dueDate,
      isCompleted
    });
  }

  hideAddTodoForm();
  displayTodos();
});

cancelBtn.addEventListener('click', e => {
  e.preventDefault();
  hideAddTodoForm();
});

function showAddTodoForm() {
  form.style.visibility = 'visible';
  todosDiv.style.display = 'none';
  formHeader.textContent = 'Add Todo';
  addTodoBtn.style.display = 'none';
  titleInput.value = 'title';
  descriptionInput.value = 'desc';
  dueDateInput.value = '2023-11-12';
  isCompletedInput.checked = true;
}

function hideAddTodoForm() {
  form.style.visibility = 'hidden';
  todosDiv.style.display = 'block';
  addTodoBtn.style.display = 'block';
}

function editTodoFromDom(todo) {
  showAddTodoForm();
  const { title, description, dueDate, isCompleted } = todo;
  titleInput.value = title;
  descriptionInput.value = description;
  dueDateInput.value = dueDate;
  isCompletedInput.checked = isCompleted;
  formHeader.textContent = 'Edit Todo';
}

// ul.addEventListener('click', e => {
//   if (e.target.classList.contains('delete-btn')) {
//     console.log(e);
//     physicalProject.deleteTodo(this);
//   }
// });

displayTodos();

/*
first show todos x
have ability to toggle x
then delete x
then create x
edit x

show projects
can switch projects
show all projects, make all the default
get rid of the physicalProject variable

add project to to do

then add todo can select project on add or edit
*/

function createDropDown() {
  const dropdown = document.createElement('select');
  for (const [key, value] of Object.entries(CATEGORIES)) {
    const option = document.createElement('option');
    option.value = value;
    option.text = value;
    dropdown.appendChild(option);
  }
  dropdownContainer.appendChild(dropdown);
}

// Call the function to create the dropdown
createDropDown();

dropdownContainer.addEventListener('change', e => {
  console.log(e.target.value);
  currentProject = e.target.value;
  displayTodos();
});
