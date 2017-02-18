let http = require('http');

let users = [];

/**
 *  1. 客户端把一个用户信息发送给服务器
 *  2. 服务器接受到后追加到users数组中
 *  3. 服务器返回users数组, 在客户端打印出来
 */
http.createServer((req, res) => {

    console.log(req.method);     // 方法
    console.log(req.headers);    // 请求头
    console.log(req.httpVersion);// http版本号
    console.log(req.url);        // 请求url

    req.setEncoding('utf8');  // 设置编码
    let contentType = req.headers['content-type'];
    /**
     * 每接受数据都会触发data事件
     */
    let result = '';
    req.on('data', (data) => {
       // console.log(data)
        result += data;
    });
    req.on('end', () => {
        let user = '';
        if (contentType == 'application/json') {
            user = JSON.parse(result);
        } else if (contentType == 'application/x-www-form-urlencoded') {
            user = require('querystring').parse(result);
        }
        users.push(user);
        res.end(JSON.stringify(users));
    });
    /*res.setHeader('name', 'nodeclient'); //自定义头
    res.end('over');*/
}).listen(8080);