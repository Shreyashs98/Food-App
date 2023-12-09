require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes/userRoutes');
const error = require('./middlewares/errorMiddleware');
const bookRouter = require('./routes/bookRoutes');
const dbConnect = require('./config/dbConnect');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Security headers
app.use(helmet());

// Logging
app.use(morgan('dev'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (adjust the path as needed)
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/api/users', routes.userRouter);
app.use('/api/books', bookRouter.bookRouter);

// Catch Error
app.use(error.notfoundErrorMiddleware);
app.use(error.errorMiddlewareHandler);

// Database connection
dbConnect();

// End of deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
