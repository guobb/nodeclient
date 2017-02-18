const http = require('http');
const fs = require('fs');


let users = [];

const server = http.createServer((req,res) => {
   let result = '';

   req.on('data', (data) => {
        result += data;
   });

   req.on('end', (data) => {
        users.push(JSON.parse(result));
        // 设置响应头，允许哪个来源来访问我这个服务器
        res.setHeader('Access-Control-Allow-Origin','http://localhost:63342','http://localhost:9090');
        res.end(JSON.stringify(users));

   });


}).listen(8080);