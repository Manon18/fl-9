let rootNode = document.getElementById('root');

let title = document.createElement('h2');
title.className = 'title';
title.innerHTML = 'TODO Cat List';
rootNode.appendChild(title);

let inputContainer = document.createElement('div');
inputContainer.classList.add('input-container');

let inputElement = document.createElement('input');
inputElement.setAttribute('type', 'text');
inputElement.placeholder = 'Add New Action';
inputElement.className = 'action';

rootNode.appendChild(inputElement);

let btnPlus = document.createElement('button');
btnPlus.setAttribute('type', 'button');
btnPlus.classList.add('btn-plus')
btnPlus.setAttribute('disabled', 'disabled');

let buttonPlus = document.createElement('i');
buttonPlus.className = 'material-icons';
buttonPlus.setAttribute('id', 'btn-plus');
buttonPlus.innerText = 'add_box';

btnPlus.appendChild(buttonPlus);

inputContainer.appendChild(inputElement);
inputContainer.appendChild(btnPlus);

inputElement.addEventListener('input', function(e) {
  let minLength = 0;

  if (this.value && this.value.length > minLength) {
    btnPlus.removeAttribute('disabled');
  } else {
    btnPlus.setAttribute('disabled', 'disabled');
  }
});

rootNode.appendChild(inputContainer);

let hr = document.createElement('hr');
rootNode.appendChild(hr);

let todoListTasksContainer = document.createElement('div');
todoListTasksContainer.className = 'tasks-list-container';
rootNode.appendChild(todoListTasksContainer);

let itemsCount = 0;
let maxLength = 10;
let source;
let startY;

btnPlus.addEventListener('click', function() {
  if (itemsCount >= maxLength) {
    return;
  }
  let taskContainer = document.createElement('div');
  taskContainer.className = 'task-container';
  taskContainer.setAttribute('draggable', true);
    
  taskContainer.addEventListener('dragstart', function(e) {
    source = e.target;        
    startY = e.clientY;
    e.dataTransfer.setData('text/plain', e.target.innerHTML);
    e.dataTransfer.effectAllowed = 'move';
  });

  taskContainer.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  });
  taskContainer.addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();

    let position = e.clientY > startY ? 'afterend': 'beforebegin';

    this.parentElement.removeChild(source);
    this.insertAdjacentElement(position, source);
  });
    
  todoListTasksContainer.appendChild(taskContainer);

  let newCheckBoxLabel = document.createElement('label');
  newCheckBoxLabel.className = 'checkbox-container';
  newCheckBoxLabel.innerText = inputElement.value;

  let newCheckBoxIcon = document.createElement('i');
  newCheckBoxIcon.classList.add('material-icons');
  newCheckBoxIcon.innerText = 'check_box_outline_blank';
  newCheckBoxLabel.appendChild(newCheckBoxIcon);

  let newCheckBox = document.createElement('input');
  newCheckBox.setAttribute('type', 'checkbox');
  
  newCheckBox.addEventListener('click', function(e) {
    this.checked = true;
    newCheckBoxIcon.innerText = 'check_box';
  });

  newCheckBoxLabel.appendChild(newCheckBox);

  itemsCount++;

  let deleteButton = document.createElement('i');
  deleteButton.classList.add('material-icons');
  deleteButton.id = 'del-icon';
  deleteButton.innerText = 'delete';

  deleteButton.addEventListener('click', function() {
    itemsCount--;
    taskContainer.remove();
    let maxLengthOne = 10;

    if (itemsCount < maxLengthOne) {
      btnPlus.removeAttribute('disabled');
      inputElement.removeAttribute('disabled');

      let maxItemsText = document.getElementById('maxItemsText');

      if (maxItemsText) {
        maxItemsText.remove();
      }
    }
  });

  taskContainer.appendChild(newCheckBoxLabel);
  taskContainer.appendChild(deleteButton);
  let maxLengthTwo = 10;

  if (itemsCount >= maxLengthTwo) {
    btnPlus.setAttribute('disabled', 'disabled');
    inputElement.setAttribute('disabled', 'disabled');

    let maxItemsText = document.createElement('span');
    maxItemsText.id = 'maxItemsText';
    maxItemsText.innerText = 'Maximum item per list are created';
    rootNode.insertBefore(maxItemsText, title);
  }
});

let catImg = document.createElement('img');
catImg.setAttribute('src', './assets/img/cat.png');
catImg.className = 'catImage';
rootNode.appendChild(catImg);
