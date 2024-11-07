const { Client } = require("pg");

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
('swsh7', 'Evolving Skies', 'Sword and Shield','https://images.pokemontcg.io/swsh7/logo.png');

INSERT INTO cards (card_id,set_id,name,type,rarity,url,quantity,price)
VALUES
('swsh7-215', 'swsh7', 'Umbreon VMAX', 'Darkness', 'Rare Rainbow', 'https://images.pokemontcg.io/swsh7/215.png', 1, 1148.63);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      "postgresql://pokemon-inventory-app:xhFordUe3NW4@ep-misty-sky-a57qgg4m.us-east-2.aws.neon.tech/pokemon-inventory-app?sslmode=require",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("finished populating");
}

main();
