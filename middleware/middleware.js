exports.checkManager = (req, res, next) => {

    const role = req.headers.role

    if(role !== "MANAGER"){
        return res.status(403).json({
            message:"Only MANAGER can delete movies"
        })
    }

    next()
}