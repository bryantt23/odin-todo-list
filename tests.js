const toDoList = new ToDoList();

function testDefaultProjectExists() {
  const defaultProjectExists = !!toDoList.getProjectByName('Default');
  console.log(
    'Test defaultProjectExists:',
    defaultProjectExists ? 'PASS' : 'FAIL'
  );
}

function testGetTodos() {
  const defaultProject = toDoList.getProjectByName('Default');
  const titles = defaultProject.getTodos();
  console.log(
    'Test getTodos:',
    Array.isArray(titles) && titles.every(title => typeof title === 'string')
      ? 'PASS'
      : 'FAIL'
  );
}

function testAddTodo() {
  const defaultProject = toDoList.getProjectByName('Default');
  const initialCount = defaultProject.todos.length;
  defaultProject.addTodo(
    new Todo('New Todo', 'Description', '2023-11-08', true)
  );
  const todoAddedToDefaultProject = defaultProject.todos.some(
    todo => todo.title === 'New Todo'
  );
  console.log(
    'Test addTodo:',
    defaultProject.todos.length === initialCount + 1 &&
      todoAddedToDefaultProject
      ? 'PASS'
      : 'FAIL'
  );
}

function testDeleteTodo() {
  const defaultProject = toDoList.getProjectByName('Default');
  const initialCount = defaultProject.todos.length;
  defaultProject.addTodo(
    new Todo('Temp Todo', 'Description', '2023-11-08', true)
  );
  const addedTodoIndex = defaultProject.todos.length - 1;
  defaultProject.deleteTodo(addedTodoIndex);
  console.log(
    'Test deleteTodo:',
    defaultProject.todos.length === initialCount ? 'PASS' : 'FAIL'
  );
}

function testEditTodo() {
  const defaultProject = toDoList.getProjectByName('Default');
  defaultProject.addTodo(
    new Todo('Edit Me', 'Initial Description', '2023-11-08', false)
  );
  const initialTodo = defaultProject.todos.find(
    todo => todo.title === 'Edit Me'
  );
  defaultProject.editTodo(initialTodo, {
    title: 'Edited Todo',
    description: 'Updated Description'
  });
  const editedTodo = defaultProject.todos.find(
    todo => todo.title === 'Edited Todo'
  );
  console.log(
    'Test editTodo:',
    editedTodo && editedTodo.description === 'Updated Description'
      ? 'PASS'
      : 'FAIL'
  );
}

function testGetTodo() {
  const defaultProject = toDoList.getProjectByName('Default');
  const todo = defaultProject.getTodo(0);
  console.log(
    'Test getTodo:',
    todo && todo.title && todo.description && todo.dueDate ? 'PASS' : 'FAIL'
  );
}

function testToggleTodoIsComplete() {
  const defaultProject = toDoList.getProjectByName('Default');
  defaultProject.addTodo(
    new Todo('Complete Me', 'Some Description', '2023-11-08', true)
  );
  const todoToToggle = defaultProject.todos.find(
    todo => todo.title === 'Complete Me'
  );
  const initialStatus = todoToToggle.isComplete;
  defaultProject.toggleTodoIsComplete(todoToToggle);
  const newStatus = todoToToggle.isComplete;
  console.log(
    'Test toggleTodoIsComplete:',
    newStatus !== initialStatus ? 'PASS' : 'FAIL'
  );
}

function testAddProject() {
  const projectName = 'New Project';
  toDoList.addProject(projectName);
  const newProject = toDoList.getProjectByName(projectName);
  console.log(
    'Test addProject:',
    newProject && newProject.name === projectName ? 'PASS' : 'FAIL'
  );
}

function testAddTodoToProject() {
  const projectName = 'New Project';
  toDoList.addProject(projectName);
  const newProject = toDoList.getProjectByName(projectName);
  const initialTodoCount = newProject.todos.length;
  newProject.addTodo(
    new Todo('Todo for New Project', 'Description', '2023-11-08', false)
  );
  const newTodoCount = newProject.todos.length;
  console.log(
    'Test addTodoToProject:',
    newTodoCount === initialTodoCount + 1 ? 'PASS' : 'FAIL'
  );
}

function runTests() {
  console.log('Running tests...');
  testDefaultProjectExists();
  testGetTodos();
  testAddTodo();
  testDeleteTodo();
  testEditTodo();
  testGetTodo();
  testToggleTodoIsComplete();
  testAddProject();
  testAddTodoToProject();
  console.log('Tests finished.');
}

// Replace 'toDoList' with your actual toDoList object that includes the todos and the methods to manipulate them.
// Also, make sure that the Todo class and Project class are correctly implemented.

// Run the tests by calling
runTests();
