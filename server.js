
const express = require("express");

const app = express();

app.use(express.json());

// Books array (No Database)
let books = [];

let nextId = 1;

// Home route
app.get("/", (req, res) => {
    res.send("Books API is running!");
});

 // POST - Add a new book
app.post("/api/books", (req, res) => {

    const { title, author, year } = req.body;

    if (!title || !author || year === undefined) {
        return res.status(400).json({
            message: "Missing data"
        });
    }

    const existingBook = books.find(
        book => book.title.toLowerCase() === title.trim().toLowerCase()
    );

    if (existingBook) {
        return res.status(409).json({
            message: "Book already exists"
        });
    }

    const newBook = {
        id: nextId++,
        title: title.trim(),
        author: author.trim(),
        year: Number(year)
    };

    books.push(newBook);

    res.status(201).json(newBook);

});
// GET - Get all books
app.get("/api/books", (req, res) => {

    const author = req.query.author;

    if (author) {
        const filteredBooks = books.filter(
            book => book.author.toLowerCase() === author.toLowerCase()
        );

        return res.status(200).json(filteredBooks);
    }

    res.status(200).json(books);

});
// GET - Get book by ID
app.get("/api/books/:id", (req, res) => {

    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.status(200).json(book);

});
// PUT - Update book
app.put("/api/books/:id", (req, res) => {

    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author, year } = req.body;

    if (!title || !author || year === undefined) {
        return res.status(400).json({
            message: "Missing data"
        });
    }

    const duplicate = books.find(
        b => b.id !== id &&
        b.title.toLowerCase() === title.trim().toLowerCase()
    );

    if (duplicate) {
        return res.status(409).json({
            message: "Book already exists"
        });
    }

    book.title = title.trim();
    book.author = author.trim();
    book.year = Number(year);

    res.status(200).json(book);

});
// DELETE - Delete book
app.delete("/api/books/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(index, 1);

    res.status(200).json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });

});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
