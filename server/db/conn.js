import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

//console.log("The connection string is ---------"+connectionString);

const client = new MongoClient(connectionString);

async function connectToDatabase() {
  let conn;
  try {
    conn = await client.connect();
    let db = conn.db("GoTo");
    return db;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default connectToDatabase;
// module.exports = connectToDatabase();