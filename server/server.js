require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const userRouter = require('./routes/user.router');
const groupRouter = require('./routes/group.router');
const app = express();
const PORT = process.env.PORT || 5001;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(sessionMiddleware);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userRouter);
app.use('/api/group', groupRouter);

// Serve static files
app.use(express.static('build'));

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
