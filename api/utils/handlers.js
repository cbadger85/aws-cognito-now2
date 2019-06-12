/* eslint-disable no-unused-vars */

exports.asyncErrorHandler = fn => (req, res, next) =>
  fn(req, res, next).catch(next);

const notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

const dbErrors = (err, req, res, next) => {
  if (!err.errors) return next(err);
  console.log(err.errors);
  return res.json({
    ...err.errors,
  });
};

const productionErrors = (err, req, res, next) => {
  console.log('Status: ', err.status || 500);
  console.log(err.message);
  res.json({
    message: 'Something went wrong',
    status: err.status || 500,
  });
};

exports.errorHandlers = [notFound, dbErrors, productionErrors];
