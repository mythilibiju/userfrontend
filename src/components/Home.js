import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [books, setBooks] = useState([]); // State to hold the list of books
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error messages

  useEffect(() => {
    // Fetch books from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books'); // Replace with your books API route
        setBooks(response.data); // Set books state with the fetched data
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        setError('Failed to fetch books. Please try again later.'); // Handle errors
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchBooks(); // Call the function to fetch books
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleRentBook = async (bookId) => {
    try {
      // Fetch the token and user ID from localStorage
      const token = localStorage.getItem('token'); 
      const userId = localStorage.getItem('userId'); 

      // Debugging: Log userId and token
      console.log('Retrieved userId:', userId); 
      console.log('Retrieved token:', token);

      if (!token || !userId) {
        alert('User not logged in');
        return;
      }

      console.log('Renting book for user ID:', userId);

      // Send the rent request to the backend
      await axios.post(
        'http://localhost:5000/api/rentals/rent',
        { userId, bookId }, // Sending both userId and bookId
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );
      alert('Book rented successfully!');
    } catch (error) {
      console.error('Error renting book:', error);
      alert('Failed to rent the book. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading books...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there's an issue
  }

  return (
    <div className="home-container">
      <h2>Newest Books</h2>
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="book-card" key={book._id}>
              {/* Inline styling to resize the image */}
              <img
                src={`http://localhost:5000${book.image}`}
                alt={book.title}
                style={{ width: '150px', height: 'auto' }} // Adjust the width as needed
              />
              <h3>{book.title}</h3>
              <p>{book.author.join(', ')}</p>
              <p>Available Copies: {book.copiesAvailable}</p>
              <button
                disabled={book.isRented || book.copiesAvailable === 0}
                onClick={() => handleRentBook(book._id)}
              >
                {book.isRented || book.copiesAvailable === 0
                  ? 'Not Available'
                  : 'Rent Book'}
              </button>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
