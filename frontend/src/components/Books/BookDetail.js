import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook, updateBook } from '../../redux/actions/books/bookActions';

const BookDetail = () => {
  const { id } = useParams();

  // Get the book details and fill it in the form
  const bookDetails = useSelector(state => state.bookDetails);
  const { book, loading } = bookDetails;

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [bookImageMenu, setBookImageMenu] = useState('');
  // const [published, setPublishedDate] = useState('');

  useEffect(() => {
    if (!loading && book) {
      setCategory(book.category);
      setTitle(book.title);
      setAuthor(book.author);
      setBookImage(book.bookImage);
      setBookImageMenu(book.bookImageMenu);
      // setPublishedDate(book.published); // Added to set the initial value for the published date
    }
  }, [loading, book]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBook(id));
  }, [dispatch, id]);

  const formSubmitHandler = e => {
    e.preventDefault();

    // Validate form data
    if (!category || !title || !author || !bookImage || !bookImageMenu) {
      alert('Please fill in all fields.');
      return;
    }

    const data = {
      category,
      title,
      author,
      bookImage,
      bookImageMenu,
      // published,
    };
    dispatch(updateBook(id, data));
    window.alert('Updating book please wait for 5 sec');
    // Delay the navigation to the previous page
    setTimeout(() => {
      window.history.back();
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  return (
    <div className='row justify-content-center mt-5'>
      <div className='col-lg-6 col-md-8'>
        <div className='container'>
          {book ? (
            <>
              <h1 className='text-center mb-4'>Update Restaurant Details</h1>
              <form onSubmit={formSubmitHandler}>
              <div className='form-group'>
                <label htmlFor='category'>Select Restaurant Type</label>
                <select
                  id='category'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className='custom-select'
                >
                  <option value='Veg' default>Select Any</option>
                  <option value='Non-Veg'>Veg</option>
                  <option value='religion'>Non-Veg</option>
                  <option value='Veg&Non-Veg'>Veg & Non-Veg</option>
                </select>
              </div>

              <div className='form-group'>
                <label htmlFor='author'>Location</label>
                <input
                  id='author'
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  type='text'
                  className='form-control'
                  placeholder='Location'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='title'>Restaurant Name</label>
                <input
                  id='title'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  type='text'
                  className='form-control'
                  placeholder='Restaurant Name'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='bookImage'>Restaurant Logo</label>
                <input
                  id='bookImage'
                  value={bookImage}
                  onChange={e => setBookImage(e.target.value)}
                  type='text'
                  className='form-control'
                  placeholder='Enter image URL'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='bookImageMenu'>Restaurant Menu</label>
                <input
                  id='bookImageMenu'
                  value={bookImageMenu}
                  onChange={e => setBookImageMenu(e.target.value)}
                  type='text'
                  className='form-control'
                  placeholder='Enter image URL'
                />
              </div>
                <button type='submit' className='btn btn-success btn-block'>
                  Update Restaurant Details
                </button>
              </form>
            </>
          ) : (
            'No book data available.'
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
