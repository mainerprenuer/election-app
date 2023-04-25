import { MongoClient } from "mongodb";

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;
const MONGO_DB = "rxedu_v1";

if (!MONGO_URI) {
  throw new Error(
    'Invalid/Missing environment variable: "NEXT_PUBLIC_MONGO_URI"'
  );
}

if (!MONGO_DB) {
  throw new Error(
    'Invalid/Missing Mongodb env variable: "NEXT_PUBLIC_MONGO_DB"'
  );
}

let cached = global.mongo;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    // console.log("Connected");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = MongoClient.connect(MONGO_URI, options).then((client) => {
      return { client, db: client.db(MONGO_DB) };
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
