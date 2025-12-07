// Called if no middleware has handled the request - will create new Error object that sets header to 404
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // calls next middleware and passes the error
};

const errorHandler = (err, req, res, next) => {
  // Check if status code is 200 - if it is then change it to 500
  // if 404 then it will remain 404
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  // Check for Mongoose bad ObjectId

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
