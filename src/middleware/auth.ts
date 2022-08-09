import jwt from 'jsonwebtoken';

export const verifyTokenAndAdmin = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.query.token;

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded: any = jwt.verify(token, 'supers3cretstring');
        req.user = decoded;

        if (!decoded.isAdmin) {
            throw Error('Permission Denied')
        }

    } catch (err) {
        return res.status(401).send(err.message);
    }
    return next();
};

export const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.query.token;

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, 'supers3cretstring');
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};