// script.js
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const dueDate = document.getElementById('dueDate');
const addTaskBtn = document.querySelector('#taskForm button[type="submit"]');
const taskList = document.getElementById('taskList');
const completedTasks = document.getElementById('completedTasks');
const editTaskModal = document.getElementById('editTaskModal');
const editTaskForm = document.getElementById('editTaskForm');
const editTaskTitle = document.getElementById('editTaskTitle');
const editDueDate = document.getElementById('editDueDate');

const homeSection = document.getElementById('homeSection');
const addTaskSection = document.getElementById('addTaskSection');
const completedTasksSection = document.getElementById('completedTasksSection');

const homeLink = document.getElementById('homeLink');
const addTaskLink = document.getElementById('addTaskLink');
const completedTasksLink = document.getElementById('completedTasksLink');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    completedTasks.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="center-content"><h4>WELCOME</h4> <br> <p>you haven,t added any tasks yet.</p> </div>';
    } else {
        tasks.forEach((task, index) => {
            const taskItem = `
                <div class="card mb-3">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title ${task.completed ? 'completed' : ''}">${task.title}</h5>
                            <p class="card-text">Due Date: ${task.dueDate}</p>
                        </div>
                        <div>
                            <button class="btn btn-primary btn-sm me-2" onclick="editTask(${index})">Edit</button>
                            <button class="btn btn-danger btn-sm me-2" onclick="deleteTask(${index})">Delete</button>
                            <button class="btn btn-success btn-sm" onclick="toggleTaskCompletion(${index})">
                                ${task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                            </button>
                        </div>
                    </div>
                </div>
            `;

            if (task.completed) {
                completedTasks.innerHTML += taskItem;
            } else {
                taskList.innerHTML += taskItem;
            }
        });
    }
}

function addTask() {
    const taskTitleValue = taskTitle.value.trim();
    const dueDateValue = dueDate.value.trim();

    if (taskTitleValue && dueDateValue) {
        const newTask = { title: taskTitleValue, dueDate: dueDateValue, completed: false };
        tasks.push(newTask);
        saveTasksToLocalStorage();
        renderTasks();
        taskTitle.value = '';
        dueDate.value = '';
    }
}


addTaskBtn.addEventListener('click', addTask);
renderTasks();
showSection('homeSection');

function editTask(index) {
    const task = tasks[index];
    editTaskTitle.value = task.title;
    editDueDate.value = task.dueDate;

    const saveEditedTaskBtn = document.getElementById('saveEditedTask');
    saveEditedTaskBtn.addEventListener('click', () => {
        const updatedTitle = editTaskTitle.value;
        const updatedDueDate = editDueDate.value;

        if (updatedTitle && updatedDueDate) {
            tasks[index] = { title: updatedTitle, dueDate: updatedDueDate, completed: task.completed };
            saveTasksToLocalStorage();
            renderTasks();
            const editTaskModal = bootstrap.Modal.getInstance('#editTaskModal');
            editTaskModal.hide();
        }
    });

    const editTaskModalInstance = new bootstrap.Modal(editTaskModal);
    editTaskModalInstance.show();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks();
}

function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage();
    renderTasks();
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showSection(sectionId) {
    homeSection.classList.add('d-none');
    addTaskSection.classList.add('d-none');
    completedTasksSection.classList.add('d-none');

    document.getElementById(sectionId).classList.remove('d-none');
}

homeLink.addEventListener('click', () => {
    showSection('homeSection');
    renderTasks();
});

addTaskLink.addEventListener('click', () => {
    showSection('addTaskSection');
});

completedTasksLink.addEventListener('click', () => {
    showSection('completedTasksSection');
    renderTasks();
});

taskForm.addEventListener('submit', addTask);
renderTasks();
showSection('homeSection');