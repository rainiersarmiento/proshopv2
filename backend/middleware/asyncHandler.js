const asyncHandler = (fn) => (req, res, next) => {
  // Resolves a promise and then will resolve and call next - the next piece of middleware
  Promise.resolve(fn(req, res, next)).catch(next);
};
// Always export!
export default asyncHandler;
