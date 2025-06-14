const errorHandler = (err,req,res,next) => {
    console.log(err.stack);
    res.status(500).json({
        status : 500,
        message : "internal server error",
        error : err.message,
    });
};

export default errorHandler;