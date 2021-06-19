require('dotenv').config();
/**
 * This will check if user is authenticated before making request.
 * 
 */

module.exports = (req,res,next) => {
    if (req.session.isAuthenticated || process.env.NODE_ENV === 'test') {
        return next();
    }

    res.status(400).send({
        message: "Authentication required."
    });
}