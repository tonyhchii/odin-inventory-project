const { Router } = require("express");
const cardPageController = require("../controllers/cardPageController");
const editPageController = require("../controllers/editPageController");

const cardPageRouter = Router();

cardPageRouter.get("/", cardPageController);
cardPageRouter.get("/:cardID", editPageController.editPageLoader);
cardPageRouter.post("/:cardID", editPageController.saveContent);
module.exports = cardPageRouter;
