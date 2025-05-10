// // lib/redis.js
import Redis from "ioredis";

// export default redis;
const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

export default redis;
