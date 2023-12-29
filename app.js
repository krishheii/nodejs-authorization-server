const express = require('express');
const mongoose = require('mongoose');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const verifyRouter = require('./routes/verification');
const refreshTokenRouter = require('./routes/refreshToken');

const app = express();

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/verify', verifyRouter);
app.use('/refresh', refreshTokenRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
