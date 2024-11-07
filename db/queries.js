const pool = require("./pool");
const getAllCards = async () => {
  const { rows } = await pool.query(
    "SELECT cards.name as name, cards.url as url, sets.name as setName, rarity, quantity, price, type, sets.set_id FROM cards JOIN sets ON sets.set_id = cards.set_id"
  );
  return rows;
};

const getOrderBy = (orderBy) => {
  orderString = "";
  switch (orderBy) {
    case "alphabetical":
      orderString = " ORDER BY cards.name DESC";
      break;
    case "price":
      orderString = " ORDER BY price DESC";
      break;
    case "type":
      orderString = " ORDER BY type DESC";
      break;
    default:
      orderString = "";
  }
  return orderString;
};

const getAllSets = async () => {
  const { rows } = await pool.query("SELECT * FROM sets");
  return rows;
};

const getCardByName = async (name, orderBy) => {
  const appendSQL = getOrderBy(orderBy);
  const SQL =
    "SELECT cards.name as name, cards.url as url, sets.name as setName, rarity, quantity, price, type, sets.set_id FROM cards JOIN sets ON sets.set_id = cards.set_id WHERE lower(cards.name) LIKE $1" +
    appendSQL;
  name = name ? name : "";
  const { rows } = await pool.query(SQL, [`${name.toLowerCase()}%`]);
  return rows;
};

module.exports = {
  getAllCards,
  getAllSets,
  getCardByName,
};
