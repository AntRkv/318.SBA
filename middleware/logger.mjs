export const requestLogger = (req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
};

export const addProcessingInfo = (req, res, next) => {
  res.locals.processedBy = "customMiddleware";
  next();
};

export const errorHandler = (err, req, res, next) => {
  console.error("Error occurred:", err.message); 
  res.status(500).send("Something went wrong!"); 
};