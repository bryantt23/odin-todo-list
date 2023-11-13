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
  addTodo = todo => {
    this.todos.push(todo);
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
    todo.isComplete = !todo.isComplete;
  };
}

class Todo {
  constructor(title, description, dueDate, isComplete) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isCompleted = isComplete;
  }
}

/*
first show todos
have ability to toggle
then delete
then create
then edit

then switch projects
then add todo can select project or add a new project
*/

const toDoList = new ToDoList();
const defaultProject = toDoList.getProjectByName('Default');
defaultProject.addTodo(
  new Todo('Get sleep', 'Lie in bed and count my breaths', '2023-11-12', false)
);
defaultProject.addTodo(
  new Todo(
    'Stretch',
    'Lengthen my arms, neck, shoulders, forearms, chest, lats',
    '2023-11-30',
    true
  )
);
console.log('🚀 ~ file: script.js:62 ~ defaultProject:', defaultProject);

console.log('🚀 ~ file: script.js:61 ~ toDoList:', toDoList);

const todosDiv = document.querySelector('.todos');
const ul = document.querySelector('ul');
const displayTodos = () => {
  ul.innerHTML = '';
  const todos = defaultProject.getTodos();
  const length = todos.length;
  for (let i = 0; i < length; i++) {
    const todo = todos[i];
    const li = document.createElement('li');
    li.textContent = todo.title;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.isCompleted;
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

// ul.addEventListener('click', e => {
//   if (e.target.classList.contains('delete-btn')) {
//     console.log(e);
//     defaultProject.deleteTodo(this);
//   }
// });

displayTodos();
