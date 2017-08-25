var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    position -= 1;
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // Get number of completed todos.
    // for (var i = 0; i < totalTodos; i++) {
      // if (this.todos[i].completed === true) {
      //   completedTodos++;
      // }
    // }
    
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    // Case 1: If everything’s true, make everything false.
    // if (completedTodos === totalTodos) {      
      // this.todos.forEach(function(todo) {
      //   todo.completed = false;
      // });
      
    // // Case 2: Otherwise, make everything true.
    // } else {      
      // this.todos.forEach(function(todo) {
      //   todo.completed = true;
      // });
      
    // }
    this.todos.forEach(function(todo) {
      // Case 1: If everything is true, make everything false
      if (completedTodos === totalTodos) {
        todo.completed = false;
      // Otherwise, make everything true
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  // toggleCompleted: function() {
  //   var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
  //   todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
  //   toggleCompletedPositionInput.value = '';
  //   view.displayTodos();
  // },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
//     for (var i = 0; i < todoList.todos.length; i++) {
//       var todoLi = document.createElement('li');
//       var todo = todoList.todos[i];
//       var todoTextWithCompletion = '';

//       if (todo.completed === true) {
//         todoTextWithCompletion = '(x) ' + todo.todoText;
//       } else {
//         todoTextWithCompletion = '( ) ' + todo.todoText;
//       }
      
//       todoLi.id = i;
//       todoLi.textContent = todoTextWithCompletion;
//       todoLi.appendChild(this.createDeleteButton());
//       todosUl.appendChild(todoLi);
//     }
    
    todoList.todos.forEach(function(todo, pos) {
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';

      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.className = 'toggle';
      checkbox.id = 'cb' + pos;

      var label = document.createElement('label');
      label.className = 'label';
      label.id = "label" + pos;
      label.htmlFor = checkbox.id;

      if (todo.completed === true) {
        checkbox.checked = true;
        label.style.color = "lightgrey";
        label.style.textDecoration = "line-through";
      } else {
        checkbox.checked = false;
      }

      todoLi.id = pos;
      label.innerHTML = todo.todoText;
      todoLi.appendChild(checkbox);
      todoLi.appendChild(label);
      todoLi.appendChild(this.createDeleteButton());      
      todosUl.appendChild(todoLi);
    }, this);
    
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = '\u2716';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  createToggle: function() {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = 'toggle';
    return checkbox;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul');

    todosUl.addEventListener('click', function(event) {
      // Get the element that was clicked on
      var elementClicked = event.target;

      // Check if elementClicked is a delete button.
      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id)); 
      }
      else if (elementClicked.className === 'toggle') {
        handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();

// Trigger addTodo click event when enter key is pressed
document.getElementById("addTodoTextInput").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        handlers.addTodo();
    }
});