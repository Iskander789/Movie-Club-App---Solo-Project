require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const session = require('express-session');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const userRouter = require('./routes/user.router');
const groupRouter = require('./routes/group.router');
// const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
// app.use(session({
//   secret: process.env.SERVER_SESSION_SECRET || 'secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }));

app.use(sessionMiddleware);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/groups', groupRouter);

// Serve static files
app.use(express.static('build'));

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
