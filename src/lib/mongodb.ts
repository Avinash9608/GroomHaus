import { MongoClient, Db } from "mongodb";

const uri = process.env.ATLAS_URI!;
let client: MongoClient;
let db: Db;

export async function getDb() {
  if (!client || !db) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db();
  }
  return db;
} 