// var buttonE1 = document.querySelector("#save-task");
// id counter allows us to create a unique id for the item being added. 
var taskIdCounter = 0;
var listE1 = document.querySelector("#tasks-to-do");
var formE1 = document.querySelector("#task-form");
var pageContentEl = document.querySelector("#page-content");


var taskFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
      }
      formE1.reset();

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
   
};

var createTaskEl = function(taskDataObj) {
    
    var taskListitem = document.createElement("li");
    taskListitem.className = "task-item";

    // add task id as a custom attribute
    taskListitem.setAttribute("data-task-id", taskIdCounter);
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    var taskActionsEl = createTaskActions(taskIdCounter);
    taskListitem.append(taskInfoEl);
    taskListitem.append(taskActionsEl);
    
    
    listE1.appendChild(taskListitem);

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

    if (event.target.matches(".delete-btn")) {
        console.log("you clicked a delete button!");
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
      };

      if (event.target.matches(".edit-btn")) {
        console.log("you clicked an edit button!");
        var taskId = event.target.getAttribute("data-task-id");
        console.log(taskId);
      };
  };

  var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id ='" + taskId + "']");
    taskSelected.remove();
    console.log(taskId);
  };



// buttonE1.addEventListener("click", createTaskhandler);
formE1.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);

//data-* custom data attributes allow developers to store extra information about an HTML element without conflicting the built in attributes, 
//* is replaced by what the developer would like to call the attribute, use getAttribute to get the attribute in javascript, attribute value must be a string



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
