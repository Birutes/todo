var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//New Task List Item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");

  var checkBox = document.createElement("input"); // checkbox
  var label = document.createElement("label");
  var editInput = document.createElement("input"); // text
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
    
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// Add a new task
var addTask = function() {
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);  
  
  taskInput.value = "";   
}

// Edit an existing task
var editTask = function() {  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]")
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  if(containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  
  listItem.classList.toggle("editMode");
 
}


// Delete an existing task
var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  ul.removeChild(listItem);
}

// Mark a task as complete 
var taskCompleted = function() {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark a task as incomplete
var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  editButton.onclick = editTask;
  
  deleteButton.onclick = deleteTask;
  
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

// Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


for(var i = 0; i <  incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
for(var i = 0; i <  completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete); 

}

// Count incompleted list items

function countItems(){

  var items = incompleteTasksHolder.getElementsByTagName("li");
  for (var i = 0; i < items.length; ++i) {
    if items[i] {
      document.getElementById("count").innerHTML = "i";
    };
}

// Delete All

function deleteAll() {
    var list = document.getElementById("completed-tasks");
    list.parentNode.removeChild(list);
}

// Only todos left

function todo() {
  var elem = document.getElementById('completed');
  elem.parentNode.removeChild(elem);
}

// Only completed left

function completed() {
  var elem = document.getElementById('todos');
  elem.parentNode.removeChild(elem);
}