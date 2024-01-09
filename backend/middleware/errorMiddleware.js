const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.orginalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resourse not found";
  }
  res.status(statusCode).json({
    message,
    stack:
      process.env.NODE_ENV === "production"
        ? "Contact Munasar Abuukar"
        : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
