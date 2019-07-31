//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#tasks');

//Load all event Listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

//Get Task from LocalStorage Function
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        //Add Class
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append link to li
        li.appendChild(link);

        //Append Li to ul
        taskList.appendChild(li);
    })
}

//Add Task function
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    //Create li element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);

    //Append Li to ul
    taskList.appendChild(li);

    //STORE IN LOCAL STORAGE
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';

    console.log(li);


    e.preventDefault();
}

//Store Task Function
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Remove Task function
function removeTask(e){
    //Remove from the DOM
    if(e.target.parentElement.classList.contains('delete-item') && confirm('Are you sure')){
        e.target.parentElement.parentElement.remove();
    }

    //Remove from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

 //Remove from Local Storage
 function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
 }

//Clear Tasks function
function clearTasks(e){
    // one way to do it
    // taskList.innerHTML = '';

    //Faster way to do it
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //https://jsperf.com/innerhtml-vs-removechild

    //Clear from Local Storage
    clearTasksFromLocalStorage();
}

//Clear Tasks from Local Storage Function
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//Filter task function
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){ //no match = -1
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    });
}
