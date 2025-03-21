const input = document.getElementById("newTD");
const todoList = document.getElementById("todos");


//todo
//todolist.value == 0 then say "Nothing to see here"
//empty input
//save to local storage
//add checked property


let todos = [];

document.body.addEventListener('keypress', e => {
  e == 'Enter' ? addTodo() : null;
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
  if (todos.length === 0) {
    todoList.innerHTML = "<div class='todo'>Nothing to see here!<div>";
  } else {
    let str = ``;

    todos.forEach(t => {
      str += `
        <div class="todo">
          <input type="checkbox">
          <p>${t.name}</p>
          <button onclick="removeTodo('${t.id}')">Delete</button>
        </div>
      `;
      todoList.innerHTML = str;
    })
  }
}

function removeTodo (id) {
  todos = todos.filter(todo => {
    if (todo.id != id) {
      return todo;
    }
  })
  renderTodo();
}