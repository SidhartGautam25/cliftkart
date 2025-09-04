export default function errorMiddleware (err, req, res, next){
  console.log("you unfortunetly came here")
  console.log("err is ",err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
