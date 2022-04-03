let taskList = $('.task-list');
let taskInput = $('.task-input');
let notification = $('.notification');
let tasks = [];
$(document).ready(function(){
  function displayNotification(){
    if(!taskList.children().length){
      notification.fadeIn('fast');
    }else{
      notification.css('display','none');
    }
  };

  taskInput.focus(function(e) {
    $('.footer').addClass("focus");
  }).blur(function(){
    if(taskInput.val()){return false}
    $('.footer').removeClass("focus");
  });

  if(localStorage.length != 0 ){
    for(let i = 0; i < localStorage.length; i++){
      if(localStorage.key(i).includes('task')){
        tasks.push( JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
    }
    for(let key in tasks){
      createTask(tasks[key])
    }
  }

  function createTask(item){
    localStorage.setItem(item.taskId, JSON.stringify(item))
    taskList.append($( "<li></li>" )
    .addClass( "my-div" )
    .attr('id', item.taskId)
    .append([
      $('<p></p>').addClass('task-text').text(item.task), 
      $('<button></button>').addClass('delete').text('delete').on('click', function(){
        let parent = $(this).parent();removeTask(parent)
      })]));
    displayNotification();
  }

  function removeTask(item){
    item.fadeOut('fast', function(){
      item.remove();
      displayNotification();
      localStorage.removeItem($(item).attr('id'));
    })
  }

  function doId() {
    return `task ${Math.random().toString(36).substr(2, 16)}`;
  }
  $('.task-add').on('click', function(e){
    if(!taskInput.val()){return false}
    let task = {
      task: taskInput.val(),
      taskId: doId()
    };
    createTask(task)
    taskInput.val('');
    $('.footer').removeClass("focus");
  });
})