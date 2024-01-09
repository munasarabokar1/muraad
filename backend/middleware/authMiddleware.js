const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { FindId } = require("../func/users");

const authProtect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await FindId(decoded.userId);
    if (user.xaalada == "banned") {
      res.status(401);
      throw new Error("This user is banned");
    } else {
      try {
        req.user = user;
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { authProtect };
