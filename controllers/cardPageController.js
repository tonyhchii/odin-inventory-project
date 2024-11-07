const db = require("../db/queries");
const cardPageController = async (req, res) => {
  const cards = await db.getAllCards();
  res.render("cardPage", { cards: cards });
};

module.exports = cardPageController;
