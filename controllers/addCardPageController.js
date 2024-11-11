const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const db = require("../db/queries");

const urlBase = "https://api.pokemontcg.io/v2/cards";
const urlOptions =
  "pageSize=15&select=id,name,types,set,images,tcgplayer,rarity";

const loadPage = async (req, res) => {
  const { page, name, setID, series, setName } = req.query;
  const pageCheck = page ? page : 1;
  const nameCheck = name ? name : "";
  const setIDCheck = setID ? setID : "";
  const seriesCheck = series ? series : "";
  const setNameCheck = setName ? setName : "";
  const pageQuery = `?page=${pageCheck}&`;
  const query = `q=name:"*${nameCheck}*"+set.id:"${setIDCheck}*"+set.series:"${seriesCheck}*"+set.name:"${setNameCheck}*"&`;
  const url = urlBase + pageQuery + query + urlOptions;
  await fetch(url)
    .then((res) => res.json())
    .then((obj) =>
      res.render("addPage", {
        cards: obj.data,
        page: pageCheck,
        name: nameCheck,
        setID: setIDCheck,
        series: seriesCheck,
        setName: setNameCheck,
      })
    )
    .catch((err) => console.error("error:" + err));
};

const addCard = async (req, res) => {
  const { id } = req.body;
  const url = urlBase + `/${id}?` + urlOptions;

  await fetch(url)
    .then((res) => res.json())
    .then((obj) => {
      const price = obj.data.tcgplayer.prices.holofoil
        ? obj.data.tcgplayer.prices.holofoil.market
        : obj.data.tcgplayer.prices.normal.market;
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
        price
      );
    })
    .catch((err) => console.error("error: " + err));
};

module.exports = { loadPage, addCard };
