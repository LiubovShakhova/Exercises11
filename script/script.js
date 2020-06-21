'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    addBtn = document.getElementById('add'),
    removeBtn = document.querySelector('.todo-remove'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = [];

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';


    todoData.forEach(function(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
        '<div class="todo-buttons">' + 
          '<button class="todo-remove"></button>' + 
          '<button class="todo-complete"></button>' + 
        '</div>';
        //4) Поле ввода после добавления дела должно очищаться
        headerInput.value = '';

        if (item.completed) {
          todoCompleted.append(li);
        //3) Пустые дела добавляться не должны
        } else if (item.value === '') {
          li.remove();
        } else {
          todoList.append(li);
        } 

        const todoComplete = li.querySelector('.todo-complete');
        todoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

    });
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    const newTodo  = {
      value: headerInput.value,
      completed: false
    };

    todoData.push(newTodo);

    render();
});

render();