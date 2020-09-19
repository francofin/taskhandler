var buttonE1 = document.querySelector("#save-task");
var listE1 = document.querySelector("#tasks-to-do");

// buttonE1.addEventListener("mouseover", function() {
//     var name = prompt("What is your name");
//     buttonE1.textContent = name + " Task List";
// });

var createTaskhandler = function() {
    var task = prompt("Enter task!");
    var taskListitem = document.createElement("li");
    taskListitem.textContent = task;
    taskListitem.className = "task-item";
    listE1.appendChild(taskListitem);
};

buttonE1.addEventListener("click", createTaskhandler);

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











// Events can be "clicks:, "mouseover"  
//setInterval, clearInterval are functions for timers, setInterval executes the function repeatedly at a set interval 
//setTimeout will execute something after the time specified