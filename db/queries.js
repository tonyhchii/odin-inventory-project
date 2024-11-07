const pool = require("./pool");
const getAllCards = async () => {
  const { rows } = await pool.query("SELECT * FROM cards");
  return rows;
};

const getAllSets = async () => {
  const { rows } = await pool.query("SELECT * FROM sets");
  return rows;
};

module.exports = { getAllCards, getAllSets };
