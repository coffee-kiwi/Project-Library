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

// Fill in some books for testing


// Target book container
const container = document.getElementById("book-container");

function displayBooks() {
    container.innerHTML = "";
// Iterate through library and build DOM elements
    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";

        const heading = document.createElement("h2");
        heading.textContent = book.title;

        const author = document.createElement("p");
        author.textContent =`Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;

        const read = document.createElement("p");
        read.textContent = `Already read: ${book.read}` ;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove Book";
        deleteBtn.dataset.id = `${book.id}`;
        deleteBtn.classList.add("delete-btn");

        // Append child nodes together
        card.appendChild(heading);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(deleteBtn);
        container.appendChild(card);
    });

};

addBookToLibrary("The Fellowship of the Ring", "JRR Tolkien", 1000, "Yes");
addBookToLibrary("Harry Potter and the Philosophers Stone", "JK Rowling", 897, "Yes");
addBookToLibrary("Blackflame", "That guy", 356, "Yes");
addBookToLibrary("Mistborn", "Famous author", 986, "Yes");
addBookToLibrary("Song of Fire and Ice", "Old guy", 8374, "No");
displayBooks();

// Form and buttons
const bookDialog = document.getElementById("new-book-dialog");
const form = document.getElementById("book-form");


addBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log(`Submitted data: `, data)
    form.reset(); 
    addBookToLibrary(data["title"], data["author"], data["pages"], data["read"]);
    bookDialog.close();
    displayBooks();
});

// Add delete button functionality
const bookList = document.getElementById("book-container");

bookList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const itemId = event.target.dataset.id;
        const ind = myLibrary.findIndex(book => book.id == itemId);

        if (ind !== -1) {
            myLibrary.splice(ind, 1)
        }
        
        displayBooks();
    }
});