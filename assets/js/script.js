// var buttonE1 = document.querySelector("#save-task");
var listE1 = document.querySelector("#tasks-to-do");
var formE1 = document.querySelector("#task-form");


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
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    taskListitem.append(taskInfoEl);
    
    
    listE1.appendChild(taskListitem);
}




// buttonE1.addEventListener("click", createTaskhandler);
formE1.addEventListener("submit", taskFormHandler);

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
