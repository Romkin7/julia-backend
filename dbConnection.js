require("dotenv").config();

const { Pool, Client } = require("pg");

function connect() {
  const pool = new Pool({
    connectionString: process.env.URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  pool.on("error", () => {
    return console.log("Error with Postgres db connection");
  });
  return pool;
}

const createTableEvents = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS events1 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type varchar(10) not null,
  date TIMESTAMP not null,
  address varchar(300) not null,
  photo bytea not null,
  description varchar(500)
);`;

const createTableLost = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS lost (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(10) not null,
  date TIMESTAMP not null,
  name VARCHAR(100) not null,
  location VARCHAR not null,
  img BYTEA,
  placeOrigin VARCHAR,
  description VARCHAR(500)
);`;

module.exports.dbQuery = async function (query, arr) {
  const pgClient = connect();
  if (arr) {
    const response = await pgClient.query(query, arr);
    return response;
  } else {
    const response = await pgClient.query(query ? query : createTableLost);
    return response;
  }
};
