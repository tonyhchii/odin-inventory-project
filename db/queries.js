const pool = require("./pool");
const getAllCards = async () => {
  const { rows } = await pool.query(
    "SELECT cards.name as name, cards.url as url, sets.name as setName, rarity, quantity, price, type, sets.set_id, cards.card_id as id FROM cards JOIN sets ON sets.set_id = cards.set_id"
  );
  return rows;
};

const getOrderBy = (orderBy) => {
  orderString = "";
  switch (orderBy) {
    case "alphabetical":
      orderString = " ORDER BY cards.name ASC";
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
    "SELECT cards.name as name, cards.url as url, cards.card_id as id, sets.name as setName, rarity, quantity, price, type, sets.set_id FROM cards JOIN sets ON sets.set_id = cards.set_id WHERE lower(cards.name) LIKE $1" +
    appendSQL +
    " LIMIT 15";
  name = name ? name : "";
  const { rows } = await pool.query(SQL, [`${name.toLowerCase()}%`]);
  return rows;
};

const getCardByID = async (cardID) => {
  const SQL = "SELECT * FROM cards WHERE card_id = $1";
  const { rows } = await pool.query(SQL, [`${cardID}`]);
  return rows;
};

const getSetByID = async (setID) => {
  const SQL = "SELECT * FROM sets WHERE set_id = $1";
  const { rows } = await pool.query(SQL, [`${setID}`]);
  return rows;
};

const changeCardByID = async (cardID, price, quantity) => {
  const SQL = "UPDATE cards SET price = $1, quantity = $2 WHERE card_id = $3";
  await pool.query(SQL, [price, quantity, cardID]);
};

const addCard = async (
  cardID,
  setID,
  setName,
  series,
  setImage,
  cardName,
  type,
  rarity,
  cardImage,
  price
) => {
  addSet(setID, setName, series, setImage);
  const SQL =
    "INSERT into CARDS (card_id,set_id,name,type,rarity,url,quantity,price) VALUES ($1, $2, $3, $4, $5, $6, 1, $7) ON CONFLICT (card_id) DO NOTHING;";
  await pool.query(SQL, [
    cardID,
    setID,
    cardName,
    type,
    rarity,
    cardImage,
    price,
  ]);
};

const addSet = async (setID, name, series, image) => {
  const SQL =
    "INSERT INTO sets (set_id, name, series, url) VALUES ($1, $2, $3, $4) ON CONFLICT (set_id) DO NOTHING;";
  await pool.query(SQL, [setID, name, series, image]);
};

const removeCardById = async (cardID) => {
  const SQL = "DELETE FROM cards WHERE card_id = $1";
  await pool.query(SQL, [cardID]);
};

module.exports = {
  getAllCards,
  getAllSets,
  getCardByName,
  getCardByID,
  changeCardByID,
  addCard,
  getSetByID,
  removeCardById,
};
