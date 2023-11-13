class ToDoList {
  constructor() {
    this.projects = { Default: new Project('Default') };
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
  editTodo = (currentTodo, updatedTodo) => {
    const pos = this.todos.indexOf(currentTodo);
    this.todos[pos] = updatedTodo;
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

const toDoList = new ToDoList();
const defaultProject = toDoList.getProjectByName('Default');
defaultProject.addTodo(
  'Get sleep',
  'Lie in bed and count my breaths',
  '2023-11-12',
  false
);
defaultProject.addTodo(
  'Stretch',
  'Lengthen my arms, neck, shoulders, forearms, chest, lats',
  '2023-11-30',
  true
);

const todosDiv = document.querySelector('.todos');
const ul = document.querySelector('ul');
const addTodoBtn = document.querySelector('.add-todo');
const form = document.querySelector('form');

const displayTodos = () => {
  ul.innerHTML = '';
  const todos = defaultProject.getTodos();
  console.log('🚀 ~ file: script.js:82 ~ displayTodos ~ todos:', todos);
  const length = todos.length;
  for (let i = 0; i < length; i++) {
    const todo = todos[i];
    const li = document.createElement('li');
    li.textContent = todo.title;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.isCompleted;
    checkbox.addEventListener('click', () =>
      defaultProject.toggleTodoIsComplete(todo)
    );
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => {
      defaultProject.deleteTodo(i);
      displayTodos();
    });
    li.appendChild(checkbox);
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

  defaultProject.addTodo(title, description, dueDate, isCompleted);

  hideAddTodoForm();
  displayTodos();
});

function showAddTodoForm() {
  form.style.visibility = 'visible';
  todosDiv.style.display = 'none';
}

function hideAddTodoForm() {
  form.style.visibility = 'hidden';
  todosDiv.style.display = 'block';
}

// ul.addEventListener('click', e => {
//   if (e.target.classList.contains('delete-btn')) {
//     console.log(e);
//     defaultProject.deleteTodo(this);
//   }
// });

displayTodos();

/*
first show todos x
have ability to toggle x
then delete x
then create, edit, see details (using the form)

then switch projects in terms of showing
then add todo can select project or add a new project
*/
