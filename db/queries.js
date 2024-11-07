const pool = require("./pool");
const getAllCards = async () => {
  const { rows } = await pool.query(
    "SELECT cards.name as name, cards.url as url, sets.name as setName, rarity, quantity, price, sets.set_id FROM cards JOIN sets ON sets.set_id = cards.set_id"
  );
  return rows;
};

const getAllSets = async () => {
  const { rows } = await pool.query("SELECT * FROM sets");
  return rows;
};

const getCardByName = async () => {};

module.exports = { getAllCards, getAllSets };
