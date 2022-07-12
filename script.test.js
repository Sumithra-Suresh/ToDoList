

// Add tasks to a list so that I can keep track of them

test("Submitting a new task adds it to the list", () => {
  
  let title = document.querySelector("#form-task-name");
  title.value = "Testing Tasks";

  document.querySelector(".form-task").click();

  let  task = new Task(title.value);

  UI.addTaskToList(task);

  Store.addTask(task);


  task = new Task(title.value);

  UI.addTaskToList(task);

  //  console.log(Store.getTasks().length);
  
  console.log(document.getElementById("tableId").rows.length);
});




  // equal(newTask, title.value);


