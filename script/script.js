'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    addBtn = document.getElementById('add'),
    todoCompleted = document.querySelector('.todo-completed');
let todoData = [];

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
        //5) Удаление дел на кнопку КОРЗИНА
        const removeBtn = li.querySelector('.todo-remove');
        removeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            li.remove();
            localStorage.removeItem('mykey');
            event.preventDefault();
      });
    });

};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();
    let newTodo  = {
      value: headerInput.value,
      completed: false
    };
    todoData.push(newTodo);
    render();
    
});

//7) Дела из localStorage подгружаться должны автоматически при загрузки странице
//6) Сохранять данные о делах в localStorage (советую в виде массива)
const getData = function(){
  if (localStorage.getItem('mykey')) {
    todoData = JSON.parse(localStorage.getItem('mykey'));
  }
};
todoControl.addEventListener('submit', function() {
  event.preventDefault();
  localStorage.setItem('mykey', JSON.stringify(todoData));
  getData();
});
getData();
render();