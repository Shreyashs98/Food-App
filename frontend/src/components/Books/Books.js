import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../../redux/actions/books/bookActions';
import Loading from '../Loading/Loading';
import BookDetailsModal from './BookDetailsModal'; // Adjust the path accordingly
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const booksList = useSelector(state => state.booksList);
  const { books, loading } = booksList;

  const navigate = useNavigate();

  const handleDeleteBook = async id => {
    try {
      await dispatch(deleteBook(id));
      navigate('/books');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  // Add a check for the existence of books
  const filteredBooks = books && books.filter(book => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const titleMatches = book.title && book.title.toLowerCase().includes(searchTermLowerCase);
    const authorMatches = book.author && book.author.toLowerCase().includes(searchTermLowerCase);
    const genreMatches = book.category && book.category.toLowerCase().includes(searchTermLowerCase);
    const publishDateMatches = book.published && book.published.includes(searchTermLowerCase); // Assuming publishDate is a string

    // Return true if any of the fields match the search term
    return titleMatches || authorMatches || genreMatches || publishDateMatches;
  });

  const handleBookClick = book => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-10 offset-lg-1'>
          <div className='mb-3 d-flex align-items-center justify-content-between'>
            <Link to='/addbook' className='btn btn-success'>
              <i className="bi bi-plus-lg"></i>
            </Link>
            <input
              type='text'
              className='form-control form-control-sm flex-grow-1 ml-2'
              placeholder='Search...'
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className='table-responsive'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>Restaurant Logo</th>
                  <th scope='col'>Restaurant Name</th>
                  <th scope='col'>Location</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks &&
                  filteredBooks.map(book => (
                    <tr className='table-light' key={book._id}>
                      <td>
                        <img src={book.bookImage} alt='Book Cover' style={{ width: '100px' }} />
                      </td>
                      <td>
                        <button className='btn btn-link' onClick={() => handleBookClick(book)}>
                          {book.title}
                        </button>
                      </td>
                      <td>{book.author}</td>
                      <td>
                        <div className='d-flex'>
                          <Link to={`/book/${book._id}`} className='btn btn-warning mr-2'>
                            <i className="bi bi-pencil-square"></i> Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteBook(book._id)}
                            className='btn btn-danger'>
                            <i className="bi bi-trash3"></i> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <BookDetailsModal show={showModal} onHide={handleCloseModal} book={selectedBook} />
    </div>
  );
};

export default Books;
