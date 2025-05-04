// // lib/redis.js
import Redis from "ioredis";

// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD,
//   db: 0,
// });

// export default redis;
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
  // ...(process.env.REDIS_PASSWORD && { password: process.env.REDIS_PASSWORD }),
});

export default redis;
