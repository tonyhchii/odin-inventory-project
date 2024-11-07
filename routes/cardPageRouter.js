const { Router } = require("express");
const cardPageController = require("../controllers/cardPageController");

const cardPageRouter = Router();

cardPageRouter.get("/", cardPageController);
module.exports = cardPageRouter;
