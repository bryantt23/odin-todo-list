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
