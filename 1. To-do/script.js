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
  } else {
    alert("Empty Input Field!")
  }
}

function renderTodo () {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    const msg = document.createElement('div');
    msg.classList.add("todo");
    msg.classList.add("empty-td")
    msg.textContent = "Nothing to see here!";
    todoList.prepend(msg);
  } else {
    todos.forEach(t => {
      const elem = document.createElement('div');
      elem.classList.add("todo");
      elem.innerHTML = `
        <input type="checkbox" ${t.checked ? 'checked' : ''} onChange="toggleTodo('${t.id}')">
        <p>${t.name}</p>
        <button onclick="removeTodo('${t.id}')">Delete</button>
      `;    
      todoList.prepend(elem);
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
