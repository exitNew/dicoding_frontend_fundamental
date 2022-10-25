const books = [];
const RENDER_BOOKS = "render-books";

function generateID() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id, title, author, year, isComplete
  }
}

function addBooks() {
  let textId = document.getElementById('bukuId').value;
  const textTitle = document.getElementById('bukuTitle').value;
  const textAuthor = document.getElementById('bukuAuthor').value;
  const textYear = document.getElementById('bukuYear').value;
  const checkBoxComplete = document.getElementById('bukuIsComplete').checked;

  if(textId == "") {
    textId = generateID();
  }

  const bookObject = generateBookObject(textId, textTitle, textAuthor, textYear, checkBoxComplete);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_BOOKS));
  saveBook();
}

function findBook(booksId) {
  for(const item of books) {
    if(item.id === booksId) return item;
  }
  return null;
}

function findBookIndex(booksId) {
  for(const index in books) {
    if(books[index].id === booksId) {
      return index;
    }
  }
  return -1;
}

function switchOnBookself(booksId) {
  const target = findBook(booksId);
  if(target == null) return;

  target.isComplete = !target.isComplete;           

  document.dispatchEvent(new Event(RENDER_BOOKS));
  saveBook();
}

function removeOnBookself(booksId) {
  const target = findBookIndex(booksId);
  if(target == -1) return;

  books.splice(target, 1);
  document.dispatchEvent(new Event(RENDER_BOOKS));
  saveBook();
}

function listBooks(booksObject) {
  const {id, title, author, year, isComplete} = booksObject;

  const textTitle = document.createElement('h2');
  textTitle.innerText = title;

  const textAuthor = document.createElement('p');
  textAuthor.innerText = author;

  const textYear = document.createElement('p');
  textYear.innerText = year;

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('book-title');
  titleContainer.append(textTitle);

  const additionalContainer = document.createElement('div');
  additionalContainer.classList.add('book-additional');
  additionalContainer.append(textAuthor, textYear)

  const container = document.createElement('div');
  container.classList.add('inner');
  container.append(titleContainer, additionalContainer);
  container.setAttribute('id', `books-${id}`);


  const switchButton = document.createElement('button');
  switchButton.classList.add('switch-button');
  switchButton.addEventListener('click', function() {
    switchOnBookself(id);
  });

  const trashButton = document.createElement('button');
  trashButton.classList.add('trash-button');
  trashButton.addEventListener('click', function() {
    if(window.prompt("Ketik 'y' untuk Hapus") == 'y') {
      removeOnBookself(id);
    }
    
  });

  container.append(switchButton, trashButton);


  return container;
  
}

const SAVED_BOOKS = 'saved-books';
const STORAGE_KEY = 'BOOKSELF';

function isStorageExist() {
  if(typeof(Storage) === undefined) return false;
  return true;
}

function saveBook() {
  if(isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_BOOKS));
  }
}

function loadBookselfFromStorage() {
  const serializeBook = localStorage.getItem(STORAGE_KEY);
  let bookData = JSON.parse(serializeBook);

  if(bookData !== null) {
    for(const book of bookData) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_BOOKS));
}


document.addEventListener('DOMContentLoaded', function() {
  const submitForm = document.getElementById('form');
  
  submitForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addBooks();
  });

  if(isStorageExist()) {
    loadBookselfFromStorage();
  }
})

document.addEventListener(RENDER_BOOKS, function() {
  console.log(books);

  const listOfCompletedBooks = document.getElementById('completed-read');
  const listOfUncompletedBooks = document.getElementById('uncompleted-read');

  listOfCompletedBooks.innerHTML = "";
  listOfUncompletedBooks.innerHTML = "";

  for(const book of books) {
    const createBookElement = listBooks(book);
    if(book.isComplete) {
      listOfCompletedBooks.append(createBookElement);
    } else {
      listOfUncompletedBooks.append(createBookElement);
    }
  }
});

document.addEventListener(SAVED_BOOKS, function() {
  localStorage.getItem(STORAGE_KEY);
})

