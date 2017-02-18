/**
 * Created by apple on 17/2/18.
 */
const http = require('http');

// 指定请求的参数
let options = {
    host: 'localhost',
    port: 8080,
    path: '/post',
    method: 'POST',
    headers: { 'Content-Type':'application/json'}
   // headers: { 'Content-Type':'application/x-www-form-urlencoded'}

};

// 向服务器发送请求

let request = http.request(options, (res) => {
    console.log(res.statusCode); // 读取响应码
    console.log(res.headers); // 读取响应头

    let result = '';
    res.on('data',(data) => {
        result += data;
    });
    res.on('end',() => {
        let users = JSON.parse(result);
        console.log(users);
    })
});

// request 也是一个流，是一个可写流

request.write(JSON.stringify({name: 'nodeclient'}));

request.end(); // 当调用end方法的时候请求才会真正发出

