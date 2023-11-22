// En un nuevo archivo middlewares/error-handler.middleware.js

function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? 'Error en producción' : err.stack,
    });
  }
  
  export default errorHandler;
  