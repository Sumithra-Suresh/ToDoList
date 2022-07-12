

// Task Class: Represents a Task
class Task {
    constructor(title) { 
      this.title = title;
    }
}

// UI Class: Handle UI Tasks
class UI{

    static displayTasks(){
        // Clear the UI task list 
        document.querySelector('#task-list').innerHTML="";
        
        const tasks = Store.getTasks();
        
        let msg = "To Do List:";

        if(tasks.length === 0){
            msg = "You have no tasks pending!"
        }
        
        document.querySelector('#task-list-title').innerText = msg;

        tasks.forEach( task => UI.addTaskToList(task) );
    }

    static addTaskToList(task) {

        document.querySelector('#task-list-title').innerText = "To Do List:";
        
        const list = document.querySelector('#task-list');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type=checkbox></td>
            <td>${task.title}</td>
            <td><a href="#" class="delete">X</a></td>
        `;
        list.appendChild(row);

    }

    static deleteTask(element) {
        // console.log(element.parentElement.parentElement.rowIndex);
        if(element.classList.contains('delete')){
            // console.log(element.parentElement.parentElement.rowIndex);
            element.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#form-task-name').value = '';
        // document.querySelector('#task-list').innerHTML = '';
    }

}

// Store Class: Handles Storage
class Store{

    static getTasks(){
        let tasks;
        if(localStorage.getItem('tasks') === null) {
          tasks = [];
        } else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;
    }

    static addTask(a_task){
        const tasks = Store.getTasks();
        // a_task.title = "localStore";
        tasks.push(a_task);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    static removeTask(rowIndex){
    
        const tasks = Store.getTasks();

        tasks.forEach( (task, index) => {
            if(index === rowIndex){
                tasks.splice(index, 1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}


// Event : Display Tasks
document.addEventListener('DOMContentLoaded', UI.displayTasks);

// Event: Add a task
document.querySelector(".form-task").addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("script.js - Add a task event listener");
    // Get form values
    const title = document.querySelector("#form-task-name").value;

    if(title.trim().length === 0){
        alert("Please enter a task name");
    }
    else{

        console.log(title);
        const task = new Task(title);

        // ToDo: Add task to UI
        UI.addTaskToList(task);

        // Add task to store
        Store.addTask(task);

        // Clear fields
        UI.clearFields();
    }

});

// Event: Remove a task
document.querySelector('#task-list').addEventListener('click', (e) => {
    
    const taskId = e.target.parentElement.parentElement.rowIndex;
    // Remove task from UI
    UI.deleteTask(e.target);

    // Remove task from store
    Store.removeTask(taskId);
});

