document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    showConfig();
});

function showConfig() {
    document.getElementById('config-section').classList.remove('hidden');
    document.getElementById('routine-section').classList.add('hidden');
}

function showRoutine() {
    document.getElementById('config-section').classList.add('hidden');
    document.getElementById('routine-section').classList.remove('hidden');
    loadRoutine();
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const daySelect = document.getElementById('day-select');
    const task = taskInput.value;
    const day = daySelect.value;

    if (task) {
        const tasks = JSON.parse(localStorage.getItem(day)) || [];
        tasks.push({ task, completed: false });
        localStorage.setItem(day, JSON.stringify(tasks));
        taskInput.value = '';
        loadTasks();
    }
}

function loadTasks() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const container = document.getElementById('days-container');
    container.innerHTML = '';

    days.forEach(day => {
        const tasks = JSON.parse(localStorage.getItem(day)) || [];
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        const dayTitle = document.createElement('h3');
        dayTitle.textContent = capitalize(day);
        dayDiv.appendChild(dayTitle);
        tasks.forEach((taskObj, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.textContent = taskObj.task;
            if (taskObj.completed) {
                taskDiv.classList.add('completed');
            }
            taskDiv.appendChild(createDeleteButton(day, index));
            dayDiv.appendChild(taskDiv);
        });
        container.appendChild(dayDiv);
    });
}

function loadRoutine() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const container = document.getElementById('routine-container');
    container.innerHTML = '';

    days.forEach(day => {
        const tasks = JSON.parse(localStorage.getItem(day)) || [];
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        const dayTitle = document.createElement('h3');
        dayTitle.textContent = capitalize(day);
        dayDiv.appendChild(dayTitle);
        tasks.forEach((taskObj, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.textContent = taskObj.task;
            if (taskObj.completed) {
                taskDiv.classList.add('completed');
            }
            taskDiv.addEventListener('click', () => toggleTaskCompletion(day, index));
            dayDiv.appendChild(taskDiv);
        });
        container.appendChild(dayDiv);
    });
}

function toggleTaskCompletion(day, index) {
    const tasks = JSON.parse(localStorage.getItem(day));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem(day, JSON.stringify(tasks));
    loadRoutine();
}

function createDeleteButton(day, index) {
    const button = document.createElement('button');
    button.textContent = 'X';
    button.addEventListener('click', () => deleteTask(day, index));
    return button;
}

function deleteTask(day, index) {
    const tasks = JSON.parse(localStorage.getItem(day));
    tasks.splice(index, 1);
    localStorage.setItem(day, JSON.stringify(tasks));
    loadTasks();
    loadRoutine();
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
