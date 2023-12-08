require('dotenv').config();
const path = require('path');
const express = require('express');
const routes = require('./routes/userRoutes');
const error = require('./middlewares/errorMiddleware');
const bookRouter = require('./routes/bookRoutes');
const cors = require('cors');
require('./config/dbConnect')();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Routes
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use('/api/users', routes.userRouter);
app.use('/api/books', bookRouter.bookRouter);

// Catch Error
app.use(error.notfoundErrorMiddleware);
app.use(error.errorMiddlewareHandler);

// End of deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
