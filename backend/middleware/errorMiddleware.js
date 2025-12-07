// Called if no middleware has handled the request - will create new Error object that sets header to 404
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // calls next middleware and passes the error
};

// Overwrites the default express error handler
// The overwrite is indicated by the first parameter 'err'
const errorHandler = (err, req, res, next) => {
  // Check if status code is 200 - if it is then change it to 500
  // if 404 then it will remain 404
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for Mongoose bad ObjectId or CastError - CastError is from the HTML
  // CastError example - looking for an object id that doesn't exist
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }
  // Checks if the NODE_ENV is in production and will send null
  // If it is in production then it will send err.stack or the stack trace
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
