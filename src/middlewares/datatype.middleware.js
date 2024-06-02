export const datatypeMiddleware = (req, res, next) => {
  console.log("llegamos a middleware");
  console.log(req.query);
  for (let key in req.query) {
    if (req.query[key] === "true" || req.query[key] === "false") {
      req.query[key] = req.query[key].toLowerCase() === "true";
    }
  }
  next();
};
