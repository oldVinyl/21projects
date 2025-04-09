const input = document.getElementById("newTD");
const todoList = document.getElementById("todos");


let todos = JSON.parse(localStorage.getItem("TODOS")) || [];
renderTodo();
console.log("Memory: ", todos);

document.body.addEventListener('keypress', e => {
  e.key == 'Enter' ? addTodo() : null;
})

function addTodo () {
  if (input.value) {
    todos.push({
      name: input.value,
      id: crypto.randomUUID(),
      checked: false
    });
    renderTodo();
    input.value = "";
  }
}

function renderTodo () {
  todoList.innerHTML = ""; // clear previous todo elems

  if (todos.length === 0) {
    const msg = document.createElement('div');
    msg.classList.add("todo");
    msg.textContent = "Nothing to see here!";
    todoList.appendChild(msg);
  } else {
    todos.forEach(t => {
      const elem = document.createElement('div');
      elem.classList.add("todo");
      elem.innerHTML = `
        <input type="checkbox" ${t.checked ? 'checked' : ''} onChange="toggleTodo('${t.id}')">
        <p>${t.name}</p>
        <button onclick="removeTodo('${t.id}')">Delete</button>
      `;    
      todoList.appendChild(elem);
    })
  }
  localStorage.setItem("TODOS", JSON.stringify(todos));
}

function removeTodo (id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodo();
}

function toggleTodo (id) {    
  todos = todos.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
        checked: !todo.checked
      };
    }
    return todo;
  });
  renderTodo();
}
