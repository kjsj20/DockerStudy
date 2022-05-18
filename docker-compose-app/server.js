const express = require("express");
const redis = require("redis");
//레디스 클라이언트 생성 
const client = redis.createClient({
    //만약 Redis 서버가 작동하는 곳이 redis-server.com이라면 Host 옵션을 host: "https://redis-server.com" 처럼 해주면 된다.
    //도커 Compose를 사용할 때는 host 옵션을 docker-compose.yml 파일에 명시한 컨테이너 이름으로 주면된다.
    host: "redis-server",
    port: 6379
})

const app = express();

//숫자는 0 부터 시작합니다.
client.set("number", 0);

app.get('/', (req, res) => {
    client.get("number", (err, number) => {
        //현재 숫자를 가져온 후에 1씩 올려줍니다.
        res.send("숫자가 1씩 올라갑니다. 숫자: " + number)
        client.set("number", parseInt(number) + 1)
    })
})


app.listen(8080);
console.log('Server is running');