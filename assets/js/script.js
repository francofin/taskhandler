// var buttonE1 = document.querySelector("#save-task");
// id counter allows us to create a unique id for the item being added. 
var taskIdCounter = 0;
var listE1 = document.querySelector("#tasks-to-do");
var formE1 = document.querySelector("#task-form");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];


var taskFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
      }
      formE1.reset();

    var isEdit = formE1.hasAttribute("data-task-id");
    

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    
    
    // send it as an argument to createTaskEl
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formE1.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
        };
    
        createTaskEl(taskDataObj);
  }
   
};

var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(taskId)) {
        tasks[i].name = taskName;
        tasks[i].type = taskType;
      }
    };

    alert("Task Updated!");

    formE1.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
  };


var createTaskEl = function(taskDataObj) {
    
    var taskListitem = document.createElement("li");
    taskListitem.className = "task-item";

    // add task id as a custom attribute
    taskListitem.setAttribute("data-task-id", taskIdCounter);
    taskListitem.setAttribute("draggable", "true");
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    var taskActionsEl = createTaskActions(taskIdCounter);
    taskListitem.append(taskInfoEl);
    taskListitem.append(taskActionsEl);
    
    
    listE1.appendChild(taskListitem);
    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);

    // increase task counter for next unique id
    taskIdCounter++;

};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // dropdown information
    var statusSelectEl = document.createElement("select");
    var statusChoices = ["To Do", "In Progress", "Completed"];
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

var taskButtonHandler = function(event) {
    console.log(event.target);
    var targetE1 = event.target

    if (targetE1.matches(".delete-btn")) {
        console.log("you clicked a delete button!");
        var taskId = targetE1.getAttribute("data-task-id");
        deleteTask(taskId);
      }
    else if (targetE1.matches(".edit-btn")) {
    console.log("you clicked an edit button!");
    var taskId = targetE1.getAttribute("data-task-id");
    editTask(taskId);
    };
  };

  var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");
  
    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
  
    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
      } 
    else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
    }

    // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(taskId)) {
        tasks[i].status = statusValue;
      }
    }
  };

  var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id ='" + taskId + "']");
    taskSelected.remove();
    console.log(taskId);

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
      // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
      if (tasks[i].id !== parseInt(taskId)) {
        updatedTaskArr.push(tasks[i]);
      }
    }

    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
  };

  var editTask = function(taskId) {
    console.log("editing task #" + taskId);
  
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";
    formE1.setAttribute("data-task-id", taskId);
  };

  var dragTaskHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
    var getId = event.dataTransfer.getData("text/plain");
    console.log("getId:", getId, typeof getId);
    console.log("Task ID:", taskId);
    console.log("event.target:", event.target); 
    console.log("event.type:", event.type);
    console.log("event", event);
  };

  var dropZoneDragHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
      event.preventDefault();
      taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
      console.dir(taskListEl);
    }
  };

  var dropTaskHandler = function(event) {
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZoneE1 = event.target.closest(".task-list");
    var statusSelectE1 = draggableElement.querySelector("select[name='status-change']");
    var statusType = dropZoneE1.id;

    if (statusType === "tasks-to-do") {
      statusSelectE1.selectedIndex = 0;
    } 
    else if (statusType === "tasks-in-progress") {
      statusSelectE1.selectedIndex = 1;
    } 
    else if (statusType === "tasks-completed") {
      statusSelectE1.selectedIndex = 2;
    }
    dropZoneE1.removeAttribute("style");
    dropZoneE1.appendChild(draggableElement);
    console.log(statusType);
    console.dir(dropZoneE1);
    console.dir(statusSelectE1);
    console.log(statusSelectE1);
    console.log(draggableElement);
    console.dir(draggableElement);
    console.log("Drop Event Target:", event.target, event.dataTransfer, id);

    // loop through tasks array to find and update the updated task's status
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(id)) {
        tasks[i].status = statusSelectEl.value.toLowerCase();
      }
    }

console.log(tasks);
  };

  var dragLeaveHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
      taskListEl.removeAttribute("style");
    }
  }
// buttonE1.addEventListener("click", createTaskhandler);
formE1.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);

//data-* custom data attributes allow developers to store extra information about an HTML element without conflicting the built in attributes, 
//* is replaced by what the developer would like to call the attribute, use getAttribute to get the attribute in javascript, attribute value must be a string
// datatransfer is the place to put the event property


//Hack
// buttonE1.addEventListener("mouseover", function() {
//     alert("you've been hacked");
//     while (buttonE1) {
//     prompt("How much will you pay to get back your precious system");
//     var confirmProceed = confirm("Too Bad you have already paid, press ok to agree");
//         if (confirmProceed) {
//             break;
//         } else {
//             alert("That won't help you now, its too late")
//         }
//     }
//   });

// buttonE1.addEventListener("mouseover", function() {
//     var name = prompt("What is your name");
//     buttonE1.textContent = name + " Task List";
// });

//event.stopPropagation will stop bubbling to the parent elements
//event.target reports the element on which the event occurs







// Events can be "clicks:, "mouseover"  
//setInterval, clearInterval are functions for timers, setInterval executes the function repeatedly at a set interval 
//setTimeout will execute something after the time specified
// innerHTML allows us to write html in the js function

// var createTaskhandler = function(event) {

//     event.preventDefault();

//     var taskListitem = document.createElement("li");
//     taskListitem.className = "task-item";
//     var taskInfoEl = document.createElement("div");
//     taskInfoEl.className = "task-info";
    

//     var task = document.querySelector("input[name='task-name']").value;
//     var taskTypeInput = document.querySelector("select[name='task-type']").value;
//     taskInfoEl.innerHTML = "<h3 class='task-name'>" + task + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

//     taskListitem.append(taskInfoEl);
    
    
//     listE1.appendChild(taskListitem);
// };
