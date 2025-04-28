let tasks = [];

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const priority = document.getElementById('priority').value;

    if (taskName.trim() === '') {
        alert('Please enter a task name.');
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        priority: priority
    };

    tasks.push(task);
    document.getElementById('taskName').value = '';
    renderTasks();
}

function renderTasks(filteredTasks = tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            <strong>${task.name}</strong> - Priority: ${task.priority}
            <br>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskDiv);
    });
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function editTask(id) {
    const newName = prompt('Enter new task name:');
    if (newName) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, name: newName };
            }
            return task;
        });
        renderTasks();
    }
}

function filterTasks() {
    const selectedPriority = document.getElementById('filter').value;
    if (selectedPriority === 'All') {
        renderTasks();
    } else {
        const filtered = tasks.filter(task => task.priority === selectedPriority);
        renderTasks(filtered);
    }
}