Task Management Application

Overview

This is a Task Management Application that allows users to manage their tasks through a web interface. It provides functionalities to create, read, update, and delete tasks. The application is built with a Node.js backend using Express and a simple front-end with HTML, CSS, and JavaScript.

**Getting Started**

**Prerequisites**

- [Node.js](https://nodejs.org/) (version 12.x or later)
- [npm](https://www.npmjs.com/) (version 6.x or later)

**Installing**

1. **Clone the repository**
   git clone https://github.com/your-username/task-manager.git
   
2.**Install dependencies**
Navigate to the task-manager-backend directory and install dependencies:

cd task-manager-backend
npm install

**Running the Application**
**1.Running the Backend**
Start the backend server
node server.js

**node server.js**
The server will start on http://localhost:3000.

**2.Running the Frontend**
**1.By file**
Open the index.html
Navigate and open the index.html file in your web browser. 

**2.Using a local server**
Install http-server globally if you haven't already:

npm install -g http-server
Navigate to the Task-Manager directory and start the server:

cd Task-Manager
http-server

Open link of server or http://localhost:8080 in your web browser.

**API Endpoints**
The backend provides the following RESTful API endpoints:

**Get All Tasks**
URL: /api/tasks
Method: GET
Description: Retrieves all tasks.
Response: JSON array of tasks.

**Create a New Task**
URL: /api/tasks
Method: POST
Description: Creates a new task.
Request Body: JSON object with title, description, and dueDate.
Response: JSON object of the created task.

**Get a Single Task by ID**
URL: /api/tasks/:id
Method: GET
Description: Retrieves a single task by its ID.
Response: JSON object of the task.

**Update an Existing Task**
URL: /api/tasks/:id
Method: PUT
Description: Updates an existing task by its ID.
Request Body: JSON object with title, description, and dueDate.
Response: JSON object of the updated task.

**Delete a Task**
URL: /api/tasks/:id
Method: DELETE
Description: Deletes a task by its ID.
Response: No content.

**Frontend Functionality**
The front-end provides the following functionalities:

View Tasks: Display a list of all tasks.
Add Task: Form to add a new task.
Edit Task: Form to edit an existing task.
View Task Details: Detailed view of a specific task.
Delete Task: Delete a task from the list.
