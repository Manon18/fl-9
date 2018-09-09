const rootNode = document.getElementById('root');

const todoItems = getFromLocalStorage('todoItems') || [];

let todoItemsFirst = 0;
let todoItemsContainer = document.getElementsByClassName('todo-items')[todoItemsFirst];

checkHash();
window.onhashchange = function() {
  checkHash();
};

function checkIfEmpty(items) {
  let titleEmptyFirst = 0;
  let emptyTitle = document.getElementsByClassName('title-empty')[titleEmptyFirst];
  let minLength = 0;
  if (items.length > minLength) {
    emptyTitle.style.display = 'none';
  } else {
    emptyTitle.style.display = 'block';
  }
}

function renderItems(items, container) {
  checkIfEmpty(items);

  let itemsToDestroy = document.getElementsByClassName('item-container');
  let minLengthSecond = 0;
  while (itemsToDestroy.length > minLengthSecond) {
    let firstItemArr = 0;
    itemsToDestroy[firstItemArr].remove();
  }

  for (let i = 0; i < items.length; i++) {
    renderItem(items[i], container);
  }
}

function renderItem(item, container) {
  let itemContainer = document.createElement('div');
  itemContainer.className = 'item-container';
  container.appendChild(itemContainer); 

  let todoImg = document.createElement('img');
  let imgSrc = item.isDone ? './assets/img/done-s.png' : './assets/img/todo-s.png';
  todoImg.setAttribute('src', imgSrc);
  todoImg.className = 'todo-img';
  todoImg.addEventListener('click', function() {
    item.isDone = true;
    saveToLocalStorage('todoItems', todoItems);
    todoImg.setAttribute('src', './assets/img/done-s.png');
  });
  itemContainer.appendChild(todoImg);

  let editItemLink = document.createElement('a');
  editItemLink.setAttribute('href', '#/modify/' + item.id);
  editItemLink.innerText = item.description;
  itemContainer.appendChild(editItemLink);

  let imgRemove = document.createElement('img');
  imgRemove.setAttribute('src', './assets/img/remove-s.jpg');
  imgRemove.className = 'img-remove';
  itemContainer.appendChild(imgRemove);

  imgRemove.addEventListener('click', function() {
    let index = todoItems.indexOf(item);
    todoItems.splice(index, 1);
    itemContainer.remove();
    saveToLocalStorage('todoItems', todoItems);
    checkIfEmpty(todoItems);
  });
}
let btnAddTaskFirst = 0;
let btnAddNewTask = document.getElementsByClassName('btn-add-task')[btnAddTaskFirst];
btnAddNewTask.addEventListener('click', function(e) { 
  location.hash = '#/add';
});

let saveChangesFirst = 0;
let saveChanges = document.getElementsByClassName('save-changes')[saveChangesFirst];
saveChanges.setAttribute('disabled', 'disabled');
let newItemInput = document.getElementById('input-field');
newItemInput.addEventListener('input', function() {
  let minLengthThird = 0;
  if (this.value.length > minLengthThird) {
    saveChanges.removeAttribute('disabled');
  } else {
    saveChanges.setAttribute('disabled', 'disabled');
  }
});

saveChanges.addEventListener('click', function() {
  todoItems.push({isDone: false, id: todoItems.length, description: newItemInput.value});
  saveToLocalStorage('todoItems', todoItems);
  newItemInput.value = '';
  location.hash = '';
});

let cancel = document.getElementsByClassName('cancel');
for (let i = 0; i < cancel.length; i++) {
  cancel[i].addEventListener('click', function(){
    location.hash = '';
  });
}

function handleEditPage(item) {
  let modifyItemInput = document.getElementById('modifyItemInpt');
  modifyItemInput.value = item.description;
  
  let modifyChangesFirst = 0;
  let saveModifyChangesButton = document.getElementsByClassName('save-modify-changes')[modifyChangesFirst];

  modifyItemInput.addEventListener('input', function() {
    let minLengthFourth = 0;
    if (this.value.length > minLengthFourth) {
      saveModifyChangesButton.removeAttribute('disabled');
    } else {
      saveModifyChangesButton.setAttribute('disabled', 'disabled');
    }
  });
  saveModifyChangesButton.addEventListener('click', function() {
    item.description = modifyItemInput.value; 
    saveToLocalStorage('todoItems', todoItems);
    location.hash = '';
  });
}

function saveToLocalStorage(key, value) {
  let json = JSON.stringify(value);
  window.localStorage.setItem(key, json);
}

function getFromLocalStorage(key) {
  let json = window.localStorage.getItem(key);
  return JSON.parse(json);
}

function showPage(id) {
  let pages = document.getElementsByClassName('page');
  for (let i = 0; i < pages.length; i++) {
    pages[i].style.display = 'none';
  }

  document.getElementById(id).style.display = 'block';
}

function checkHash() {
  if (this.location.hash === '') {
    showPage('initialPage');
    renderItems(todoItems, todoItemsContainer);
  }

  if (this.location.hash === '#/add') {
    showPage('addNewItemPage');
  }

  if (this.location.hash.startsWith('#/modify/')) {
    showPage('editItemPage');

    let indexOfId = this.location.hash.lastIndexOf('/') + 1;
    let itemId = parseInt(this.location.hash.substring(indexOfId));
    let item = todoItems.find((el) => el.id === itemId);
    handleEditPage(item);
  }
}
