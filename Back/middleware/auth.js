//Verification token
const jsonWT = require('jsonwebtoken');
const tokenKey = process.env.TOKEN_SECRET;

module.exports = (req, res, next) => {
    try{n
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jsonWT.verify(token, tokenKey);
        const userId = decodedToken.userId;
        res.locals.auth = {
            userId: userId
        };
        return next();
    }
    catch(error){return res.status(401).json({error})};
};