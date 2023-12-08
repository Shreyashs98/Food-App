import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const BookDetailsModal = ({ show, onHide, book }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg" style={{ maxWidth: '90vw', width: '90%' }}>
      {/* 'lg' class makes the modal large */}
      <Modal.Header closeButton>
        <Modal.Title>Restaurant Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex align-items-center'>
          <div className='mr-3'>
            <img src={book?.bookImageMenu} alt='Menu' style={{ width: '450px' }} />
          </div>
          {/* <div className='mr-3'>
            <img src={book?.bookImage} alt='Logo' style={{ width: '150px' }} />
          </div> */}
          <div>
            <h4>{book?.title}</h4>
            <p>Location: {book?.author}</p>
            <p>Restaurant Type: {book?.category}</p>
            {/* <p>Published: {book?.published}</p> */}
            {/* Add more book details here */}
            {/* For example: */}
            {/* <p>Genre: {book?.genre}</p> */}
            {/* <p>Published: {book?.publishedDate}</p> */}
            {/* ... */}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookDetailsModal;
