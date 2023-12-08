import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook } from '../../redux/actions/books/bookActions';
import '../CSS/style.css';

const AddBook = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [bookImage, setBookImage] = useState('');
  const [bookImageMenu, setBookImageMenu]= useState('');
  // const [published, setPublishedDate] = useState('');

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const formSubmitHandler = e => {
    e.preventDefault();
    const data = {
      category,
      title,
      author,
      bookImage,
      bookImageMenu,
      // published,
      createdBy: userInfo && userInfo._id,
    };
    dispatch(createBook(data));
    window.alert('Adding book please wait for 5 sec');
    
    // Delay the navigation to the previous page
    setTimeout(() => {
      window.history.back();
    }, 5000); // 5000 milliseconds = 5 seconds
   
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-lg-6 col-md-8'>
          <h1 className='text-center'>Add Restaurant Details</h1>
          <form onSubmit={formSubmitHandler}>
            <fieldset>
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
                Add Restaurant
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
