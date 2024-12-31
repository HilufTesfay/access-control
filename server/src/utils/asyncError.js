const handleAsyncError = (asyncFunc) => (req, res, next) => {
  Promise.resolve(asyncFunc(req, res, next)).catch((error) => next(error));
};

export { handleAsyncError };
