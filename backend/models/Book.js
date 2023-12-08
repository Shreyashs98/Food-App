const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    // published: {
    //   type: Date,
    //   required: true,
    // },
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookImage: {
      type: String,
      
    },
    bookImageMenu: {
      type: String,
      
    },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
