const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { FindId } = require("../func/users");

const guest = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    try {
      console.log("guest user");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("No user allowed");
    }
  } else {
    res.status(401);
    throw new Error("only guest user , needed");
  }
});

module.exports = { guest };
