const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const db = require("../db/queries");

const urlBase = "https://api.pokemontcg.io/v2/cards";
const urlOptions =
  "pageSize=15&select=id,name,types,set,images,tcgplayer,rarity";

const loadPage = async (req, res) => {
  const { page } = req.query;
  const check = page ? page : 1;
  const query = `?page=${check}&` + urlOptions;
  const url = urlBase + query;
  await fetch(url)
    .then((res) => res.json())
    .then((obj) => res.render("addPage", { cards: obj.data, page: check }))
    .catch((err) => console.error("error:" + err));
};

const addCard = async (req, res) => {
  const { id } = req.body;
  const url = urlBase + `/${id}?` + urlOptions;
  await fetch(url)
    .then((res) => res.json())
    .then((obj) =>
      db.addCard(
        obj.data.id,
        obj.data.set.id,
        obj.data.set.name,
        obj.data.set.series,
        obj.data.set.images.logo,
        obj.data.name,
        obj.data.types[0],
        obj.data.rarity,
        obj.data.images.large,
        obj.data.tcgplayer.prices.holofoil.market
      )
    )
    .catch((err) => console.error("error: " + err));
};

module.exports = { loadPage, addCard };
