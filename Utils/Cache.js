import mongoose from "mongoose";
import redis from "redis";

// Redis client
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

client.connect();

client.on("connect", () => {
  console.log("Connected to redis 👍");
});

client.on("error", (err) => {
  console.log(`Connection failed ${err}`);
});

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;

  this.hashKey = JSON.stringify(options.key || "default");

  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );

  // Check if we have value for 'key' in redis
  const cachedData = await client.hGet(this.hashKey, key);

  // If we do then return that
  if (cachedData) {
    const document = JSON.parse(cachedData);

    return Array.isArray(document)
      ? document.map((doc) => new this.model(doc))
      : new this.model(document);
  }

  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);

  client.hSet(this.hashKey, key, JSON.stringify(result), "EX", 10);

  return result;
};

// Clearing cache saved for 'hashKey' passed to the function
function clearHash(hashKey) {
  client.del(JSON.stringify(hashKey));
}

export { clearHash };
