const errorHandler = (err, req, res, next) => {
    // Log the error for debugging
    console.error(err.stack);
  
    // Default error status and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    // Send the error response
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  };
  
  export default errorHandler;