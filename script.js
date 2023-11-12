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
    return [];
  };
  addTodo = todo => {
    this.todos.push(todo);
  };
  deleteTodo = pos => {
    this.todos = this.todos.splice(pos, 1);
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
  constructor(title, description, dueDate, isUrgent, isComplete) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.isUrgent = isUrgent;
    this.isCompleted = isComplete;
  }
}
