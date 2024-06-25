const rejectUnauthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // User is authenticated, proceed to next middleware or route handler
    return next();
  }
  // User is not authenticated, respond with 401 Unauthorized status
  res.sendStatus(401);
};

module.exports = { rejectUnauthenticated };
