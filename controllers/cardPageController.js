const db = require("../db/queries");
const cardPageController = async (req, res) => {
  const { name, orderBy, page } = req.query;
  const check = page ? page : 1;
  const cards = await db.getCardByName(name, orderBy, check);
  res.render("cardPage", { cards: cards, searchBar: name, page: check });
};

module.exports = cardPageController;
