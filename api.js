const searchInput = document.getElementById('search-input');
      const searchButton = document.getElementById('search-button');
      const bookList = document.getElementById('book-list');
      const bookDetails = document.getElementById('book-details');
      const bookCover = document.getElementById('book-cover');
      const bookTitle = document.getElementById('book-title');
      const bookAuthors = document.getElementById('book-authors');
      const bookPublished = document.getElementById('book-published');
      const bookSubjects = document.getElementById('book-subjects');
      const bookDescription = document.getElementById('book-description');

      // Function to display the book details
      function displayBookDetails(book) {
        const coverUrl = `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
        bookTitle.innerText = book.title;
        const authorNames = book.author_name ? book.author_name.join(', ') : 'Unknown';
        bookAuthors.innerText = `Author(s): ${authorNames}`;
        const publicationYear = book.first_publish_year || 'Unknown';
        bookPublished.innerText = `Published: ${publicationYear}`;
        const subjectNames = book.subject ? book.subject.join(', ') : 'Unknown';
        bookSubjects.innerText = `Subjects: ${subjectNames}`;
        const description = book.description ? book.description.value : 'No description available';
        bookDescription.innerText = description;
        bookDetails.style.display = 'block';
      }

      // Function to display the list of books
      function displayBookList(books) {
        bookList.innerHTML = '';
        books.forEach(book => {
          const listItem = document.createElement('div');
          listItem.className = 'book-list-item';
          listItem.innerText = book.title;
          listItem.addEventListener('click', () => {
            displayBookDetails(book);
          });
          bookList.appendChild(listItem);
        });
      }

      // Function to search for books
      function searchBooks() {
        const searchTerm = searchInput.value;
        const apiUrl = `http://openlibrary.org/search.json?q=${searchTerm}`;
        fetch(apiUrl)
        .then(response => response.json())
      .then(data => {
        const books = data.docs;
        displayBookList(books);
      });
  }

  searchButton.addEventListener('click', searchBooks);
