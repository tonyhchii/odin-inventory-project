const db = require("../db/queries");
const cardPageController = async (req, res) => {
  const { name } = req.query;
  const cards = name ? await db.getCardByName(name) : await db.getAllCards();
  res.render("cardPage", { cards: cards });
};

module.exports = cardPageController;
