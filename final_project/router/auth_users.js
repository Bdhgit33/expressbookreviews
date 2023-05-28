

const express = require('express');
const jwt = require('jsonwebtoken');
const books = require('./booksdb.js');
const regd_users = express.Router();
const authenticated = express.Router();

let users = [];

const doesExist = (username, password) => {
  const user = users.find((user) => user.username === username && user.password === password);
  return !!user;
};

const isValid = (username) => {
  // Write code to check if the username is valid
  // For example, you can implement a validation logic here
  if (username && typeof username === 'string' && username.length >= 3) {
    return true;
  } else {
    return false;
  }
};

// Routes
authenticated.get('/books', (req, res) => {
  // Access the authenticated user object using req.user
  // Implement your logic to retrieve books or perform actions here
  res.json(books);
});
authenticated.delete("/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.user ? req.user.username : 'Unknown User';
  
    // Find the book based on the ISBN
    const book = books.find((book) => book.isbn === isbn);
  
    if (book) {
      // Check if the user has a review for the book
      const reviewIndex = book.reviews.findIndex((r) => r.username === username);
      if (reviewIndex !== -1) {
        // If the user has a review, remove it from the reviews array
        book.reviews.splice(reviewIndex, 1);
        return res.status(200).json({ message: 'Review deleted successfully.', book });
      } else {
        return res.status(404).json({ message: 'User review not found.' });
      }
    } else {
      return res.status(404).json({ message: 'Book not found.' });
    }
  });
  

authenticated.put('/review/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.user ? req.user.username : 'Ben123'; // Get the username if available, or use a default value
  
    // Find the book based on the ISBN
    const book = books.find((book) => book.isbn === isbn);
  
    if (book) {
      // Check if the user has already reviewed the book
      const existingReviewIndex = book.reviews.findIndex((r) => r.username === username);
      if (existingReviewIndex !== -1) {
        // If the user has already reviewed the book, replace the existing review
        book.reviews[existingReviewIndex].review = review;
        return res.status(200).json({ message: 'Review updated successfully.', book });
      }
  
      // If the user hasn't reviewed the book, add a new review
      book.reviews.push({ username: username, review: review });
      return res.status(200).json({ message: 'Review added successfully.', book });
    } else {
      return res.status(404).json({ message: 'Book not found.' });
    }
  });
// Add a route handler for user login
regd_users.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide a username and password' });
  }

  // Check if the user exists and the password matches
  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate a token for authentication
  const token = jwt.sign({ username: user.username }, 'access', { expiresIn: '1h' });

  return res.status(200).json({ message: 'User logged in successfully', token });
});

// Middleware to authenticate users
const authenticateUser = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication token not provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'access');

    // Attach the authenticated user object to the request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports.regd_users = regd_users;
module.exports.authenticated = authenticated;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.doesExist = doesExist;

