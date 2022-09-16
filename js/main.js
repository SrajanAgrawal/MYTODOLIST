// Selectors
const todoList = document.querySelector('.todo-list');
const addOneTask = document.querySelector('#addOneTask');
const inputValue = document.querySelector('#inputValue');
const filterTodos = document.querySelector('.filter-todos');


// Adding all events listener 
document.addEventListener('DOMContentLoaded',getAllTodos);
addOneTask.addEventListener('click',addTodo);
filterTodos.addEventListener('click',filterTodo);
todoList.addEventListener('click',checkCompleteOrUncomplete);


// All Functions
// Filter the todos 
function filterTodo(e){
    // if you select nothing then keep it as it is 
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("complete")){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted" :
                if(!todo.classList.contains('complete')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
        }
    })
    // if you select the completed option then select which class is completed 

    // if select incompleted tasks then keep which class is not completed  
}

// Get all the todos saved in the local storage 
function getAllTodos()
{
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo =>{
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('task');
            // TodoText inside div element  
            const todoText = document.createElement('span');
            todoText.innerText = todo;
            todoText.classList.add('task-span');
            todoDiv.append(todoText);
            // complete button 
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check"></i>';
            completedButton.classList.add('complete-btn');
            todoDiv.append(completedButton);
            // Delete Task Button  
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add('trash-btn');
            todoDiv.append(trashButton);
            todoList.appendChild(todoDiv);
        })
    }

}

// Save your todos to the local server to use it after refreshing the page 
function saveTodosToLocal(todo){
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}


// Remove the todos from local storage when you will delete it  
function removeTodosFromLocal(todo){
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const  indexTodo = todo.children[0].innerText;
    todos.splice(todos.indexOf(indexTodo),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}


function addTodo(e){
    e.preventDefault();
    if(inputValue.value != ""){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('task');
        // TodoText inside div element  
        const todoText = document.createElement('span');
        todoText.innerText = inputValue.value;
        todoText.classList.add('task-span');
        todoDiv.append(todoText);
        // complete button 
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.append(completedButton);
        // Delete Task Button  
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.append(trashButton);


        todoList.appendChild(todoDiv);
        saveTodosToLocal(inputValue.value);
        inputValue.value = " ";
    }

}

// handle the complete and incomplete button using function 
function checkCompleteOrUncomplete(e){
    const item = e.target;
    if(item.classList[0] == 'trash-btn'){
        const todo = item.parentElement;
        removeTodosFromLocal(todo);
        todo.remove();
    }
    if(item.classList[0] == 'complete-btn'){
        const todo = item.parentElement;
        const todoSpan = todo.children[0];
        todoSpan.classList.toggle('blurText');
        todo.classList.toggle('complete');
    }
}