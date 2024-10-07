const input = document.getElementById("newTD");
const todoList = document.getElementById("todos");

let todos = [];

document.body.addEventListener('keypress', e => {
  e == 'Enter' ? addTodo() : null;
})

function addTodo () {
  if (input.value) {
    todos.push({
      name: input.value,
      id: todos.length
    });
    renderTodo();
  }
}

function renderTodo () {
  let str = ``;
  todos.forEach(t => {
    str += `
      <div class="todo">
        <input type="checkbox">
        <p>${t.name}</p>
        <button onclick="removeTodo('${t.name}', ${t.id})">Delete</button>
      </div>
    `;
    todoList.innerHTML = str;
  })
}

function removeTodo (n, del) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == del && todos[i].name == n) {
      todos.splice(i, 1);
      renderTodo();
    }
  }
}
