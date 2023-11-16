class ToDoList {
  constructor() {
    this.todos = [];
  }

  addTodo = (title, description, dueDate, isCompleted, projectName) => {
    const newTodo = new Todo(
      title,
      description,
      dueDate,
      isCompleted,
      projectName
    );
    this.todos.push(newTodo);
  };

  getTodos = projectName => {
    if (projectName === CATEGORIES.all) {
      return this.todos;
    } else {
      return this.todos.filter(todo => todo.projectName === projectName);
    }
  };

  deleteTodo = todoId => {
    const index = this.todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) this.todos.splice(index, 1);
  };

  editTodo = (todoId, updatedTodo) => {
    const index = this.todos.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
    }
  };

  toggleTodoIsComplete = todoId => {
    const todo = this.todos.find(todo => todo.id === todoId);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
    }
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
