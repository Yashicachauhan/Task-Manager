document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("new-task-form");
  const taskList = document.getElementById("tasks");
  const editForm = document.getElementById("edit-task-form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = event.target.title.value;
      const description = event.target.description.value;
      const dueDate = event.target["due-date"].value;

      const task = {
        title,
        description,
        dueDate,
        id: Date.now(),
      };

      addTask(task);
      event.target.reset();
    });

    loadTasks();
  }

  if (editForm) {
    editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const id = document.getElementById("task-id").value;
      const title = document.getElementById("edit-title").value;
      const description = document.getElementById("edit-description").value;
      const dueDate = document.getElementById("edit-due-date").value;

      updateTask({ id, title, description, dueDate });
    });

    loadTaskToEdit();
  }

  if (window.location.pathname.endsWith("task-detail.html")) {
    loadTaskDetail();
  }

  function addTask(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask(task);
  }

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <small>Due: ${task.dueDate}</small>
            </div>
            <div>
                <button onclick="navigateToTaskDetail(${task.id})">View</button>
                <button onclick="navigateToEditTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
    taskList.appendChild(li);
  }

  function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach((task) => renderTask(task));
  }

  function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  window.navigateToTaskDetail = function (id) {
    localStorage.setItem("taskToView", id);
    window.location.href = "task-detail.html";
  };

  function loadTaskDetail() {
    const taskId = localStorage.getItem("taskToView");
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find((task) => task.id === parseInt(taskId, 10));

    if (task) {
      const taskDetailContainer = document.getElementById("task-detail");
      taskDetailContainer.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.description}</p>
                <small>Due: ${task.dueDate}</small>
                <div>
                    <button onclick="navigateToEditTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
    }
  }

  window.navigateToEditTask = function (id) {
    localStorage.setItem("taskToEdit", id);
    window.location.href = "edit-task.html";
  };

  function loadTaskToEdit() {
    const taskId = localStorage.getItem("taskToEdit");
    const tasks = getTasksFromLocalStorage();
    const taskToEdit = tasks.find((task) => task.id === parseInt(taskId, 10));

    if (taskToEdit) {
      document.getElementById("task-id").value = taskToEdit.id;
      document.getElementById("edit-title").value = taskToEdit.title;
      document.getElementById("edit-description").value =
        taskToEdit.description;
      document.getElementById("edit-due-date").value = taskToEdit.dueDate;
    }
  }

  function updateTask(updatedTask) {
    const tasks = getTasksFromLocalStorage();
    const index = tasks.findIndex(
      (task) => task.id === parseInt(updatedTask.id, 10)
    );

    tasks[index] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.removeItem("taskToEdit");
    window.location.href = "index.html";
  }

  window.deleteTask = function (id) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    const taskElement = document.querySelector(`[data-id='${id}']`);
    if (taskElement) {
      taskElement.remove();
    }
    if (window.location.pathname.endsWith("task-detail.html")) {
      window.location.href = "index.html";
    }
  };
});
