import Redis from "ioredis"
import { log } from "node:console"

const redis=new Redis (process.env.REDIS_URL)

redis.on("connect",()=>{
    console.log("redis connected");
    
})

export default redis 
