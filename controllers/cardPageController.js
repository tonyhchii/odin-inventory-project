const db = require("../db/queries");
const cardPageController = async (req, res) => {
  const cards = await db.getAllCards();
  console.log(cards);
  res.render("cardPage", { cards: cards });
};

module.exports = cardPageController;
