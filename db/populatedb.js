#! /usr/bin/env node
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const SQL = `CREATE TABLE IF NOT EXISTS sets (
set_id VARCHAR(255) PRIMARY KEY,
name VARCHAR(255),
series VARCHAR(255),
url VARCHAR(255));

CREATE TABLE IF NOT EXISTS cards (
card_id VARCHAR(255) PRIMARY KEY,
set_id VARCHAR(255),
name VARCHAR(255),
type VARCHAR(255),
rarity VARCHAR(255),
url VARCHAR(255),
quantity INTEGER,
price DECIMAL,
CONSTRAINT fk_set
FOREIGN KEY(set_id)
REFERENCES sets(set_id));

INSERT INTO sets (set_id, name, series, url)
VALUES
('swsh7', 'Evolving Skies', 'Sword and Shield','https://images.pokemontcg.io/swsh7/logo.png'),
('sm12','Cosmic Eclipse', 'Sun and Moon', 'https://images.pokemontcg.io/sm12/logo.png'),
('sm9','Team Up','Sun and Moon','https://images.pokemontcg.io/sm9/logo.png'),
('sv2', 'Paldea Evolved', 'Scarlet and Violet', 'https://images.pokemontcg.io/sv2/logo.png'),
('sv4','Paradox Rift', 'Scarlet and Violet', 'https://images.pokemontcg.io/sv4/logo.png');

INSERT INTO cards (card_id,set_id,name,type,rarity,url,quantity,price)
VALUES
('swsh7-215', 'swsh7', 'Umbreon VMAX', 'Darkness', 'Rare Rainbow', 'https://images.pokemontcg.io/swsh7/215.png', 1, 1148.63),
('sm12-222', 'sm12', 'Reshiram & Zekrom GX', 'Dragon', 'Rare Ultra', 'https://images.pokemontcg.io/sm12/222_hires.png', 5, 96.99),
('sm9-170','sm9','Latias & Latios GX', 'Dragon', 'Rare Ultra', 'https://images.pokemontcg.io/sm9/170_hires.png', 1, 959.00),
('sv2-226','sv2','Maushold', 'Colorless','Illustration Rare', 'https://images.pokemontcg.io/sv2/226_hires.png', 8, 12.20),
('sv4-189','sv4','Mantyke','Water','Illustration Rare', 'https://images.pokemontcg.io/sv4/189_hires.png', 13, 5.99),
('sv4-194','sv4','Minun','Electric','Illustration Rare','https://images.pokemontcg.io/sv4/194_hires.png', 21, 11.50),
('sv4-193','sv4','Plusle','Electric','Illustration Rare','https://images.pokemontcg.io/sv4/193_hires.png', 13, 13.50);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      "postgresql://neondb_owner:1CMgtuTOp3Xh@ep-black-poetry-a5m9g3or.us-east-2.aws.neon.tech/neondb?sslmode=require",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("finished populating");
}

main();
