const Waiting = require("../models/functions/waiting");
const Resselers = require("../somtel/Reseller");
const asyncHandler = require("express-async-handler");

const resellerController = asyncHandler(async (req, res) => {
  await new Resselers(req, res).Somtel();
});

const resendController = asyncHandler(async (req, res) => {
  await new Waiting(req, res).Waiting();
});

module.exports = { resellerController, resendController };
