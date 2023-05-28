let books = [
      { isbn: "9789876543210", author: "Chinua Achebe", title: "Things Fall Apart", reviews: [] },
      { isbn: "9789876543310", author: "Hans Christian Andersen", title: "Fairy tales", reviews: [] },
      { isbn: "9789876543410", author: "Dante Alighieri", title: "The Divine Comedy", reviews: [] },
      { isbn: "9789876543510", author: "Unknown", title: "The Epic Of Gilgamesh", reviews: ["The Epic of Gilgamesh was as thrilling and exciting, as the critics say. 5 stars!",] },
      { isbn: "9789876543610", author: "Unknown", title: "The Book Of Job", reviews: [] },
      { isbn: "9789876543710", author: "Unknown", title: "One Thousand and One Nights", reviews: [] },
      { isbn: "9789876543810", author: "Unknown", title: "Njáls Saga", reviews: [] },
      { isbn: "9789876543910", author: "Honoré de Balzac", title: "Le Père Goriot", reviews: [] },
      { isbn: "9789876510210", author: "Samuel Beckett", title: "Molloy, Malone Dies, The Unnamable, the trilogy", reviews: [] }
    ];
    console.log(typeof books); // Check the data type of `books`
    
    module.exports = books;