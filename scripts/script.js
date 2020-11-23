// Variables
const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
const todos = JSON.parse(localStorage.getItem('todos'));

// Check if there are todos
if (todos) {
    todos.forEach(todo => {
        addTodo(todo);
    });
}

// Enter the todo
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    // If there are todo from localstorage, show them!
    if (todo) {
        todoText = todo.text;
    }

    // If not, show the blank app
    if (todoText) {
        const todoEl = document.createElement('li');

        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }

        todoEl.innerHTML = todoText;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });

        todosUL.appendChild(todoEl);
        input.value = '';

        updateLS();
    }

}

// LocalStorage
function updateLS() {
    const todosEl = document.querySelectorAll('li');
    const todos = [];
    
    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed'),
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}