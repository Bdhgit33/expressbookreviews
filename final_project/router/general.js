const express = require('express');
const { doesExist, users } = require("./auth_users.js");
const books = require("./booksdb.js");
const public_users = express.Router();

// Middleware
public_users.use(express.json());
public_users.use(express.urlencoded({ extended: false }));

// Register a new user
public_users.post('/register', (req, res) => {
    // ... your existing code
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    // Define a function that returns a promise for getting the book list
    const getBookList = () => {
      return new Promise((resolve, reject) => {
        // Simulate an asynchronous operation to fetch the book list
        setTimeout(() => {
          // Assuming `books` is the array of books
          resolve(books);
        }, 2000);
      });
    };
  
    // Define a callback function for handling the success of the promise
    const handleSuccess = (bookList) => {
      res.status(200).json({ message: "Available Books!", books: bookList });
    };
  
    // Define a callback function for handling errors in the promise
    const handleError = (error) => {
      res.status(500).json({ error: "Unable to retrieve book list." });
    };
  
    // Using the promise and callback system
    getBookList()
      .then(handleSuccess) // Execute the success callback when the promise resolves
      .catch(handleError); // Execute the error callback if the promise rejects
});

// Assuming `books` is an array of objects
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    // Find book based on ISBN
    const book = books.find((book) => book.isbn === isbn);
    if (book) {
        res.status(200).json({ message: "Book found!", book: book });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Get book based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;

    // Find book based on Author
    const book = books.find((book) => book.author === author);
    if (book) {
        res.status(200).json({ message: "Book found!", book: book });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;

    // Find book based on title
    const book = books.find((book) => book.title === title);
    if (book) {
        res.status(200).json({ message: "Book found!", book: book });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    // Find book based on ISBN
    const book = books.find((book) => book.isbn === isbn);
    if (book) {
        const reviews = book.reviews;
        res.status(200).json({ message: "Book review found!", reviews: reviews });
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

module.exports.general = public_users;
