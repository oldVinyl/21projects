const input = document.getElementById("newTD");
const todoList = document.getElementById("todos");


let todos = JSON.parse(localStorage.getItem("TODOS")) || [];
renderTodo();
console.log("Memory: ", todos);

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
  if (todos.length == 0) {
    todoList.innerHTML = "<div class='todo'>Nothing to see here!<div>";
  } else {
    let str = ``;

    todos.forEach(t => {
      str += `
        <div class="todo">
          <input type="checkbox" ${t.checked ? 'checked' : ''} onChange="toggleTodo('${t.id}')">
          <p>${t.name}</p>
          <button onclick="removeTodo('${t.id}')">Delete</button>
        </div>
      `;
      todoList.innerHTML = str;
    })
  }
  localStorage.setItem("TODOS", JSON.stringify(todos));
}

function removeTodo (id) {
  todos = todos.filter(todo => {
    if (todo.id != id) {
      return todo;
    }
  })
  renderTodo();
}

function toggleTodo (id) {
  todos = todos.map(todo => {
    let checked = todo.checked;
    if (todo.id === id) {
      Object.defineProperty(todo, "checked", {value: !checked});
      //return { ...todo, checked: !todo.checked };
    }
    return todo;
  })        
  renderTodo();
}