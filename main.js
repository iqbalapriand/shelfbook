// Key untuk localStorage
const STORAGE_KEY = 'BOOKSHELF_APPS';
let books = [];

// menyimpan data ke localStorage
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

// ambil data dari localStorage
function loadFromLocalStorage() {
  const savedBooks = localStorage.getItem(STORAGE_KEY);
  if (savedBooks) {
    books = JSON.parse(savedBooks);
  }
}

// menambah buku
function addBook(event) {
  event.preventDefault(); // Mencegah halaman refresh

  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = document.getElementById('bookFormYear').value;
  const isComplete = document.getElementById('bookFormIsComplete').checked;

  const newBook = {
    id: +new Date(), // Gunakan timestamp sebagai ID unik
    title,
    author,
    year: parseInt(year), // Pastikan year bertipe number
    isComplete,
  };

  books.push(newBook);
  saveToLocalStorage();
  displayBooks();
  document.getElementById('bookForm').reset(); // Reset form setelah menambah buku
}

//menampilkan buku 
function displayBooks() {
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');

  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  books.forEach((book) => {
    const bookElement = createBookElement(book);

    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });
}

// elemen buku
function createBookElement(book) {
  const bookElement = document.createElement('div');
  bookElement.setAttribute('data-bookid', book.id);
  bookElement.setAttribute('data-testid', 'bookItem');
  bookElement.innerHTML = `
    <h3 data-testid="bookItemTitle">${book.title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
    <p data-testid="bookItemYear">Tahun: ${book.year}</p>
    <div>
      <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
      <button data-testid="bookItemDeleteButton">Hapus Buku</button>
    </div>
  `;

  // pindah rak
  bookElement.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', () => {
    toggleBookCompletion(book.id);
  });

  // tombol hapus
  bookElement.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', () => {
    deleteBook(book.id);
  });

  return bookElement;
}

// buku antar rak
function toggleBookCompletion(bookId) {
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex].isComplete = !books[bookIndex].isComplete;
    saveToLocalStorage();
    displayBooks();
  }
}

// hapus buku
function deleteBook(bookId) {
  books = books.filter((book) => book.id !== bookId);
  saveToLocalStorage();
  displayBooks();
}

//  tambah buku
document.getElementById('bookForm').addEventListener('submit', addBook);


loadFromLocalStorage();
displayBooks();
