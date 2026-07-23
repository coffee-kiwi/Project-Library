const myLibrary = [];
const container = document.getElementById("book-container");

class BookClass {
    constructor(title, author, pages, read) {
        if (!new.target) {
            throw Error ("You must use the 'new' operator on the class");
        }
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
        }

        static addBookToLibrary(title, author, pages, read) {
            let book = new BookClass(title, author, pages, read);
            myLibrary.push(book);
        }

        toggleRead () {
            if (this.read == "Yes") {
                this.read = "No";
            } else {
                this.read = "Yes";
            }
        }

        static displayBooks() {
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

                const updateRead = document.createElement("button");
                updateRead.textContent = "Read: Yes/No";
                updateRead.dataset.id = book.id;
                updateRead.classList.add("update-btn");

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Remove Book";
                deleteBtn.dataset.id = book.id;
                deleteBtn.classList.add("delete-btn");

                // Append child nodes together
                card.appendChild(heading);
                card.appendChild(author);
                card.appendChild(pages);
                card.appendChild(read);
                card.appendChild(updateRead);
                card.appendChild(deleteBtn);
                container.appendChild(card);
            });
        }

};

// Fill in some books for testing
// const book1 = new BookClass("Harry Potter and the Philosophers Stone", "JK Rowling", 352, "Yes");

BookClass.addBookToLibrary("The Fellowship of the Ring", "JRR Tolkien", 576, "Yes");
BookClass.addBookToLibrary("Harry Potter and the Philosophers Stone", "JK Rowling", 352, "Yes");
BookClass.addBookToLibrary("Blackflame", "Will Wight", 369, "Yes");
BookClass.addBookToLibrary("Mistborn", "Brandon Sanderson", 672, "Yes");
BookClass.addBookToLibrary("A Knight of the Seven Kingdoms", "George RR Martin", 368, "Yes");
BookClass.displayBooks();

// Form and buttons
const bookDialog = document.getElementById("new-book-dialog");
const form = document.getElementById("book-form");
const errorMessage = document.getElementById("error")


form.addEventListener("submit", (event) => {
    event.preventDefault();

});


addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!form.checkValidity()) {
        event.stopPropagation();
        highlightInvalidInputs();
    } else {
        console.log(`Submitted data: `, data)
        form.reset(); 
        BookClass.addBookToLibrary(data["title"], data["author"], data["pages"], data["read"]);
        bookDialog.close();
        BookClass.displayBooks();
        }
    });

function highlightInvalidInputs() {
    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        if (!input.validity.valid) {
            input.classList.add("invalid");
            errorMessage.textContent = "Some informations is missing";
        } else {
            input.classList.remove("invalid");
        }
    });
}

// title.addEventListener("input", (event) => {
//     if (title.validity.valueMissing) {
//         errorMessage.textContent = "Please enter a title";
//     } else {
//         errorMessage.textContent = "";
//     }
// });



// Add delete button functionality
const bookList = document.getElementById("book-container");

bookList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const itemId = event.target.dataset.id;
        const ind = myLibrary.findIndex(book => book.id == itemId);

        if (ind !== -1) {
            myLibrary.splice(ind, 1)
        }
    }

    if (event.target.classList.contains("update-btn")) {
        const bookId = event.target.dataset.id;
        const bookToUpdate = myLibrary.find(book => book.id == bookId);
        bookToUpdate.toggleRead();
    }
    BookClass.displayBooks();
});