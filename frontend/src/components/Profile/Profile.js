import React, { useState, useEffect } from 'react';
import './Profile.css';
import pic from '../../assets/img/profilepic.png';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/actions/users/userActions';
import Loading from '../Loading/Loading';
import BookDetailsModal from '../Books/BookDetailsModal'; // Adjust the path accordingly
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { fetchBooks, deleteBook } from '../../redux/actions/books/bookActions';

const Profile = ({ history }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(fetchBooks());
  }, [dispatch, history]);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [userInfo, history]);

  const userProfile = useSelector(state => state.userProfile);
  const { loading, user } = userProfile;
  const books = userProfile.user && userProfile.user.books;

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books
    ? books.filter(
        book =>
          (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (book.category && book.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (book.published && book.published.includes(searchTerm.toLowerCase())) // Assuming publishDate is a string
      )
    : [];

  const handleBookClick = book => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleDeleteBook = async id => {
    try {
      await dispatch(deleteBook(id));
      dispatch(fetchBooks());
    } catch (error) {
      console.error('Error deleting book:', error);
    }
    window.location.reload();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  return (
    <div className='container mt-2'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {loading && !user ? (
            <Loading />
          ) : (
            <div className='d-flex justify-content-center' >
  <div className='card' style={{ maxWidth: '300px' }}>
    <img
      src={pic}
      className='card-img-top img-responsive'
      alt='User Profile'
    />
    <div className='card-body text-center'>
      <h5 className='card-title'>{user && user.name}</h5>
      <p className='card-text'>{user && user.email}</p>
      <Link to='/user-update' className='btn btn-primary'>
        Update Profile
      </Link>
    </div>
  </div>
</div>


          )}
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col'>
          <div className='mb-3 d-flex align-items-center justify-content-between'>
            <Link to='/addbook' className='btn btn-success'>
              <i className="bi bi-plus-lg"></i>
            </Link>
            <input
              type='text'
              className='form-control form-control-sm flex-grow-1 ml-2'
              placeholder='Search by book title, author, genre, or publish date...'
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {filteredBooks.length > 0 ? (
            <div className='table-responsive'>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Book Title</th>
                    <th scope='col'>Author</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map(book => (
                    <tr className='table-light' key={book._id}>
                      <td>
                        <button
                          className='btn btn-link'
                          onClick={() => handleBookClick(book)}>
                          {book.title}
                        </button>
                      </td>
                      <th scope='row'>{book.author}</th>
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
          ) : (
            <div className='text-center mt-4'>
              <h1>You don't have any books created.</h1>
              <Link to='/addbook' className='btn btn-success'>
                Start Creating
              </Link>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <BookDetailsModal show={showModal} onHide={handleCloseModal} book={selectedBook} />
      )}
    </div>
  );
};

export default Profile;
