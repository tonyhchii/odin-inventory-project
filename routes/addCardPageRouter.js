const { Router } = require("express");
const addCardPageController = require("../controllers/addCardPageController");
const addCardPageRouter = Router();

addCardPageRouter.get("/", addCardPageController.loadPage);
addCardPageRouter.post("/", addCardPageController.addCard);

module.exports = addCardPageRouter;
