const db = require("../db/queries");

const editPageLoader = async (req, res) => {
  const { cardID } = req.params;
  const card = await db.getCardByID(cardID);
  res.render("edit", { card: card[0] });
};

const saveContent = async (req, res) => {
  const { cardID } = req.params;
  const { price, quantity } = req.body;
  db.changeCardByID(cardID, price, quantity);
  res.redirect("/cards");
};

module.exports = { editPageLoader, saveContent };
