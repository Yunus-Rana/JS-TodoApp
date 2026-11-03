


const token = localStorage.getItem('accessToken'); //saved in login.js
const userId = localStorage.getItem('userId');
const role = localStorage.getItem('role');

let currentTodos = [];
let currentCanEdit = false;


if (!token) {
  window.location.href = 'index.html'; //if no token means not logged in, back to login page
}

document.getElementById('whoami').textContent = `Logged in as user #${userId} (role: ${role})`; //displays user id and role

document.getElementById('logout').addEventListener('click', () => {// logout the user
  localStorage.clear();//clear the token and other details
  window.location.href = 'index.html';//land to index.html
});

async function loadTodos() {
  const list = document.getElementById('todoList');
  list.innerHTML = 'Loading...';//shows when fetching is in progress



  // ROLE: "user"
  if (role === 'user') {
    const res = await fetch(`https://dummyjson.com/users/${userId}/todos`);//fetch the todo data
    const data = await res.json();//convert into json
    currentTodos = data.todos;
    currentCanEdit = true;
    renderTodos(currentTodos);
    return;
  }



  // ROLE: "moderator" 
  if (role === 'moderator'){
    const res2 = await fetch('https://dummyjson.com/todos?limit=150')
    const data2 = await res2.json()
    currentTodos = data2.todos;
    currentCanEdit = false;
    renderTodos(currentTodos);
    return
  }


  
  // Role: "admin"
 if(role === 'admin'){
    const res3 = await fetch('https://dummyjson.com/todos?limit=150')
    const data3 = await res3.json()
    currentTodos = data3.todos;
    currentCanEdit = true;
    renderTodos(currentTodos, { canEdit: currentCanEdit });
    return
 }



 //if role is other than user, mod and admin
  list.innerHTML = `Role "${role}" isn't wired up yet — see the TODOs in dashboard.js`;

}

function renderTodos(todos) {
  const list = document.getElementById('todoList');
  list.innerHTML = '';
//clearing list


  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = `${todo.todo} (user ${todo.userId})`;
    if (todo.completed) li.classList.add('completed');
    //building list item, showing task text and owner, striking through if completed


    const isOwnTodo = todo.userId === Number(userId);
    const canEditThis = role === 'admin' || isOwnTodo;
    //edit permission: can edit if admin or own todo


        if (canEditThis) {
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Toggle done';
      async function updatetodo(){
        const res = await fetch(`https://dummyjson.com/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed })
        });
        const data = await res.json()
        todo.completed = !todo.completed
        li.classList.toggle('completed');
      } 
      editBtn.addEventListener('click', updatetodo)
      list.appendChild(editBtn);
      //creates toggle done button, strikes through(not permanent)


      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      async function deletetodo(){
        await fetch(`https://dummyjson.com/todos/${todo.id}`, {
          method: "DELETE"
        });
        currentTodos = currentTodos.filter(t => t.id !== todo.id);
        renderTodos(currentTodos);
      }
      deleteBtn.addEventListener('click', deletetodo)
      list.appendChild(deleteBtn);
      //creates delete button, deletes the todo, effects not permanent
    }

    list.appendChild(li);
  });
}

document.getElementById('addTodoBtn').addEventListener('click', async () => {
  const input = document.getElementById('newTodoInput');
  const text = input.value.trim();
  if (!text) return; // don't add empty todos

  const res = await fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      todo: text,
      completed: false,
      userId: Number(userId)
    })
  });
  const newTodo = await res.json();
  //creates a new todo, effects not permanent


  currentTodos.push(newTodo);
  renderTodos(currentTodos);

  input.value = ''; // clear the input box
});

loadTodos();