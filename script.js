const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call this constructor.");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    };

function addBookToLibrary(title, author, pages, read) {
    book = new Book(title, author, pages, read);
    myLibrary.push(book);
};

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++ ) {
        console.log(myLibrary[i]);
    }
};