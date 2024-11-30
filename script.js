
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', manageTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) {
        alert('Please enter a task!');
        return;
    }
    createTaskElement(taskText);
    saveTask(taskText);
    taskInput.value = '';
}

function manageTask(e) {
    const item = e.target;
    const taskItem = item.parentElement;

    if (item.classList.contains('delete-btn')) {
        removeTask(taskItem);
    } else {
        taskItem.classList.toggle('completed');
        toggleComplete(taskItem.querySelector('span').innerText);
    }
}

function createTaskElement(taskText, completed = false) {
    const li = document.createElement('li');
    li.classList.add('task-item');
    if (completed) li.classList.add('completed');
    li.innerHTML = `
        <span>📌 ${taskText}</span>
        <button class="delete-btn">❌</button>
    `;
    taskList.appendChild(li);
}


function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskItem) {
    const taskText = taskItem.querySelector('span').innerText.trim();
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskItem.remove();
}

function toggleComplete(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.text === taskText.trim()) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
}
