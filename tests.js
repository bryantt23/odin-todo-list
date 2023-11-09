// Test to ensure the 'Default' project exists
function testDefaultProjectExists() {
  const defaultProjectExists = !!project.getProjectByName('Default');
  console.log(
    'Test defaultProjectExists:',
    defaultProjectExists ? 'PASS' : 'FAIL'
  );
}

// Test to get todos' titles from the 'Default' project
function testGetTodos() {
  const defaultProject = project.getProjectByName('Default');
  const titles = defaultProject.getTodos();
  console.log(
    'Test getTodos:',
    Array.isArray(titles) && titles.every(title => typeof title === 'string')
      ? 'PASS'
      : 'FAIL'
  );
}

// Test to add a new todo to the 'Default' project
function testAddTodo() {
  const defaultProject = project.getProjectByName('Default');
  const initialCount = defaultProject.todos.length;
  defaultProject.addTodo(
    new Todo('New Todo', 'Description', '2023-11-08', true, false)
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

// Test to delete a todo from the 'Default' project
function testDeleteTodo() {
  const defaultProject = project.getProjectByName('Default');
  const initialCount = defaultProject.todos.length;
  defaultProject.addTodo(
    new Todo('Temp Todo', 'Description', '2023-11-08', true, false)
  ); // Adding a temp todo to delete
  const addedTodoIndex = defaultProject.todos.length - 1; // Get index of the added todo
  defaultProject.deleteTodo(addedTodoIndex); // Delete the added todo
  console.log(
    'Test deleteTodo:',
    defaultProject.todos.length === initialCount ? 'PASS' : 'FAIL'
  );
}

// Test to edit a todo in the 'Default' project
function testEditTodo() {
  const defaultProject = project.getProjectByName('Default');
  defaultProject.addTodo(
    new Todo('Edit Me', 'Initial Description', '2023-11-08', false, false)
  ); // Ensure there's a todo to edit
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

// Test to retrieve all properties of a todo from the 'Default' project
function testGetTodo() {
  const defaultProject = project.getProjectByName('Default');
  const todo = defaultProject.getTodo(0); // Assumes there is at least one todo
  console.log(
    'Test getTodo:',
    todo && todo.title && todo.description && todo.dueDate ? 'PASS' : 'FAIL'
  );
}

// Test to toggle a todo's 'isComplete' status in the 'Default' project
function testToggleTodoIsComplete() {
  const defaultProject = project.getProjectByName('Default');
  defaultProject.addTodo(
    new Todo('Complete Me', 'Some Description', '2023-11-08', true, false)
  ); // Ensure there's a todo to toggle
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

// Test to add a new project and ensure it's not the 'Default'
function testAddProject() {
  const projectName = 'New Project';
  project.addProject(projectName);
  const newProject = project.getProjectByName(projectName);
  console.log(
    'Test addProject:',
    newProject && newProject.name === projectName ? 'PASS' : 'FAIL'
  );
}

// Test to add a todo to a project that is not 'Default'
function testAddTodoToProject() {
  const projectName = 'New Project';
  project.addProject(projectName); // Ensure the project exists
  const newProject = project.getProjectByName(projectName);
  const initialTodoCount = newProject.todos.length;
  newProject.addTodo(
    new Todo('Todo for New Project', 'Description', '2023-11-08', false, false)
  );
  const newTodoCount = newProject.todos.length;
  console.log(
    'Test addTodoToProject:',
    newTodoCount === initialTodoCount + 1 ? 'PASS' : 'FAIL'
  );
}

// Test runner to execute all tests
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

// Replace 'project' with your actual project object that includes the todos and the methods to manipulate them.
// Also, make sure that the Todo class and Project class are correctly implemented.

// Run the tests by calling runTests();
