import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token =
    req?.body?.token ||
    req?.query?.token ||
    req?.headers['x-access-token'] ||
    req?.headers?.token ||
    req?.cookies?.token;

  if (!token) {
    res.status(401).send('Unauthorized request');
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json('Unauthorized: Invalid token');
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

const withUserAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('Permission denied');
    }
  });
};

const withAdminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('Permission denied');
    }
  });
};

export {
  verifyToken,
  withAdminAuth,
  withUserAuth,
};
