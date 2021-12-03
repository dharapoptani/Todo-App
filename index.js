// SELECTORS
const todoInput = document.getElementById('input-task');
const todoButton = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');

const reset = document.getElementById('reset-button');

const filterOption = document.getElementById('select');




// EVENT LISTENERS

todoButton.addEventListener('click',addTodo);

todoList.addEventListener('click',deleteCheck);

window.addEventListener('DOMContentLoaded',readLocalStorage);

reset.addEventListener('click',newTodoList);

filterOption.addEventListener('click',filterTodos);


// FUNCTIONS

function addTodo(e)
{
   

    //preventing default behaviour of button of submitting
    e.preventDefault();

    //adding todo to localStorage
    addtoLocalstorage(todoInput.value);


     //creating new todo container
        const newTodo = document.createElement('div');
        newTodo.classList.add('new-todo');




        //creating new item
        const item = document.createElement('li');
        item.classList.add('item');
        item.innerText = todoInput.value;
        newTodo.appendChild(item);
       
        //creating trash button
        const trashButton = document.createElement('button');
        
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        trashButton.classList.add('trash-button');
        newTodo.appendChild(trashButton);
        
        //creating checked button
        const checkButton = document.createElement('button');
        checkButton.innerHTML = "<i class='fas fa-check'></i>";
        checkButton.classList.add("check-button");
        newTodo.appendChild(checkButton);
    
        todoInput.value = "";

        todoList.appendChild(newTodo);
    
}

function deleteCheck(e)
{
    const target = e.target;
    

    if(target.classList[0] === 'trash-button')
    {
        const par = target.parentElement;
        deletefromLocalStorage(par.children[0].innerText);

        par.classList.add('fall');
        par.addEventListener('transitionend',() => par.remove());


    }

    if(target.classList[0] === 'check-button')
    {
        const par = target.parentElement;
        par.classList.toggle('completed');
    }
}

function addtoLocalstorage(todo)
{
    let todos;

    if(localStorage.getItem('todolist')==null)
    {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todolist'));
    }

    todos.push(todo);
    todos = JSON.stringify(todos);

    localStorage.setItem('todolist',todos);
}

function deletefromLocalStorage(todo)
{
    let todos = JSON.parse(localStorage.getItem('todolist'));

    let idx = todos.indexOf(todo);

    todos.splice(idx,1);

    todos = JSON.stringify(todos);

    localStorage.setItem('todolist',todos);

    
}

function readLocalStorage(e)
{
    let todos = localStorage.getItem('todolist');

    todos = JSON.parse(todos);

    todos.forEach(element => {

        //creating new todo container
        const newTodo = document.createElement('div');
        newTodo.classList.add('new-todo');




        //creating new item
        const item = document.createElement('li');
        item.classList.add('item');
        item.innerText = element;
        newTodo.appendChild(item);
       
        //creating trash button
        const trashButton = document.createElement('button');
        
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        trashButton.classList.add('trash-button');
        newTodo.appendChild(trashButton);
        
        //creating checked button
        const checkButton = document.createElement('button');
        checkButton.innerHTML = "<i class='fas fa-check'></i>";
        checkButton.classList.add("check-button");
        newTodo.appendChild(checkButton);
    
       

        todoList.appendChild(newTodo);
    
    });
}

function newTodoList(e){
    localStorage.clear();
    location.reload();
}

function filterTodos(e)
{
    
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value)
        {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed'))
                {
                    todo.style.display = "flex";
                }
                else
                {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(todo.classList.contains('completed'))
                {
                    todo.style.display = "none";
                }
                else
                {
                    todo.style.display = "flex";
                }
                break;

        }
     
    });
}