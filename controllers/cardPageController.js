const db = require("../db/queries");
const cardPageController = async (req, res) => {
  const { name, orderBy } = req.query;
  const cards = await db.getCardByName(name, orderBy);
  res.render("cardPage", { cards: cards, searchBar: name });
};

const editPageController = async (req, res) => {
  const cardID = req.params;
  const card = await db.getCardById(cardID);
};

module.exports = cardPageController;
