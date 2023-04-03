const jwt = require("jsonwebtoken");

require("dotenv").config();

const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.includes("Bearer")
  );
};

const getTokenFromHeader = (req, res) => {
  if (!isTokenIncluded(req)) {
    return res
      .status(401)
      .json({ success: false, message: "Please provide a token" });
  }
  return req.headers.authorization && req.headers.authorization.split(" ")[1];
};

const createToken = (user) => {
  const payload = {
    id: user._id,
    name: `${user.firstName} ${user.lastName}`,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
};

const verifyToken = (req, res, next) => {
  const token = getTokenFromHeader(req, res);

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      req.user = {
        ...decoded,
        accessToken: token,
      };

      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = {
  createToken,
  verifyToken,
  getTokenFromHeader,
};
