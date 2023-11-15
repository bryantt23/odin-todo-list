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
  getTodos = projectName => {
    if (projectName === CATEGORIES.all) {
      const todos = [];
      for (const key in this.projects) {
        const val = this.projects[key];
        if (key === CATEGORIES.all) {
          continue;
        }
        todos.push(...val.getTodos());
      }
      return todos;
    }
    return this.projects[projectName].getTodos();
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
    const newTodo = new Todo(
      title,
      description,
      dueDate,
      isCompleted,
      this.projectName
    );
    this.todos.push(newTodo);
  };
  deleteTodo = todoId => {
    const index = this.todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) this.todos.splice(index, 1);
  };

  editTodo = (todoId, updatedTodo) => {
    const index = this.todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) this.todos[index] = updatedTodo;
  };
  getTodo = pos => {
    return this.todos[pos];
  };
  toggleTodoIsComplete = todo => {
    todo.isCompleted = !todo.isCompleted;
  };
}

class Todo {
  constructor(title, description, dueDate, isCompleted, projectName) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
    this.projectName = projectName;
  }
}

const CATEGORIES = {
  all: 'All',
  physical: 'Physical',
  mental: 'Mental',
  social: 'Social'
};
let currentProject = CATEGORIES.all; // Use the key directly
let editTodoProjectName;

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
let editTodoId;

const displayTodos = () => {
  ul.innerHTML = '';
  const todos = toDoList.getTodos(currentProject);
  const length = todos.length;
  for (let i = 0; i < length; i++) {
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
  const { title, description, dueDate, isCompleted, projectName } = todo;
  titleInput.value = title;
  descriptionInput.value = description;
  dueDateInput.value = dueDate;
  isCompletedInput.checked = isCompleted;
  formHeader.textContent = 'Edit Todo';
  editTodoId = todo.id;
  editTodoProjectName = projectName;
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

show projects x
can switch projects x
add project to todo in ui x
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
  dropdown.value = CATEGORIES.all;
  dropdownContainer.appendChild(dropdown);
}

// Call the function to create the dropdown
createDropDown();

dropdownContainer.addEventListener('change', e => {
  console.log(e.target.value);
  currentProject = e.target.value;
  displayTodos();
});
