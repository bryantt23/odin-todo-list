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
const formHeader = document.querySelector('.form-header');
const cancelBtn = document.querySelector('.cancel-btn');
let todoPos;

const displayTodos = () => {
  ul.innerHTML = '';
  const todos = defaultProject.getTodos();
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
      defaultProject.toggleTodoIsComplete(todo)
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
      defaultProject.deleteTodo(i);
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
    defaultProject.addTodo(title, description, dueDate, isCompleted);
  } else {
    defaultProject.editTodo(todoPos, {
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
}

function hideAddTodoForm() {
  form.style.visibility = 'hidden';
  todosDiv.style.display = 'block';
  addTodoBtn.style.display = 'block';
}

function editTodoFromDom(todo) {
  showAddTodoForm();
  const { title, description, dueDate, isCompleted } = todo;
  document.querySelector('#title').value = title;
  document.querySelector('#description').value = description;
  document.querySelector('#dueDate').value = dueDate;
  document.querySelector('#isCompleted').checked = isCompleted;
  formHeader.textContent = 'Edit Todo';
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
then create x
edit

then switch projects in terms of showing
then add todo can select project or add a new project
*/
