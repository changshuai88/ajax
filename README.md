# ajax
Ajax学习
#  HTTP(hypertext transport protocol)协议【超文本传输协议】，协议详细规定了浏览器和万维网服务器之间互相通信的规则。
约定，规则

## 请求报文 Request Headers
重点是格式与参数
```
行  POST /s?ie=utf-8 HTTP/1.1
头  Host: atguigu.com
    Cookie: name=guigu
    Content-type: application/x-www-form-rulencoded
    User-Agent: chrome 83
空行
体  username=admin&password=admin
```
## 响应报文 Response Headers
```
行  HTTP/1.1 100 OK
头  Content-Type：text/html;charset=utf-8
    Content-length: 2048
    Content-encoding: gzip
空行
体  <html>
        <head></head>
        <body>
            <h1>heihei</h1>
        </body>
    </html
>
```
# express引入
```
// 1.引入express
const express = require('express');
// 2.创建应用对象
const app = express();
// 3.创建路由规则
// request 是对请求报文的封装
// response是对相应报文的封装
app.get('/',(request,response)=>{
    // 设置相应
    response.send('hello express');

});
// 4.监听端口启动服务
app.listen(8000,()=>{
    console.log('服务已经启动，8000端口监听中。。。。');
})
```
# 在网页js中创建 XMLHttpRequest 对象，获取相应体
```
// 1.创建对象
            const xhr = new XMLHttpRequest();
            // 2.初始化，设置请求方法和url
            xhr.open('GET', 'http://127.0.0.1:8000/server');

            // 3.发送
            xhr.send();
            // 4.事件绑定，处理服务端返回的结果
            // on when 当...的时候
            // readystate 是xhr对象中的属性，表示状态 0 1 2 3 4
            // change 改变
            xhr.onreadystatechange = function () {

                // 判断 (服务端返回了所有的结果)
                if (xhr.readyState === 4) {
                    // 判断相应状态码 200 404 403 401 500
                    // 2xx 都为成功
                    if (xhr.status >= 200 && xhr.status < 300) {
                        // 处理结果 行 头  空行 体
                        // 1.相应行
                        console.log(xhr.status); //状态码
                        console.log(xhr.statusText); //状态字符串
                        console.log(xhr.getAllResponseHeaders()); //所有相应头
                        console.log(xhr.response); //响应体

                        // 设置result的文本
                        result.innerHTML = xhr.response;

                    } else {

                    }
                }
            }
```

# Ajax GET设置请求参数

直接在url后面加?a=100，这种参数，多个参数用&分割
例如：http://127.0.0.1:8000/server?a=100%b=200

# Ajax POST设置请求参数
```
 // 3.发送
    xhr.send('a=100&b=200&c=300');
    xhr.send('a:100&b:200&c:300');
```
引号内可以是任何可以解析的代码，但是在实际使用中，应该按照一定的格式来进行书写。(json格式)

# 服务端相应JSON数据
```
 // 设置响应体数据的类型
            xhr.responseType = 'json';
            // 初始化
            xhr.open('GET', 'http://127.0.0.1:8000/json-server');
            // 发送
            xhr.send();
            // 事件绑定
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        // console.log(xhr.response);
                        // result.innerHTML = xhr.response;
                        // 1.手动数据转化
                        // let data = JSON.parse(xhr.response);
                        // console.log(data);
                        // result.innerHTML = data.name;

                        // 2.自动转换 需要在 设置xhr.responseType = 'json';
                        console.log(xhr.response);
                        result.innerHTML = xhr.response.name;

                    }
                }
            }
```

# nodemon 工具，可以减少node servrer.js 重启
安装 npm install -g nodemon
执行 nodemon server.js
注意：如果执行失败，请按一下操作：
1.window+r 输入powershell
2.执行：set-ExecutionPolicy RemoteSigned
3.查看执行策略：get-ExecutionPolicy
4.重新输入：nodemon server.js，即可成功

# ie缓存问题
1.不能及时更新会返回缓存的值
xhr.open('GET', 'http://127.0.0.1:8000/ie?t=');
2.增加参数，就可以及时更新
xhr.open('GET', 'http://127.0.0.1:8000/ie?t=' + Date.now());
3.工作中不需要自行做这个，工具会帮助做，但是需要知道原因和原理。

# 请求超时，网络问题
```
 // 超时设置2s 设置
            xhr.timeout = 2000;
            //超时回调
            xhr.ontimeout = function () {
                alert('网络异常，请稍后重试！！！');
            };
            // 网络异常回调
            xhr.onerror = function () {
                alert('你的网络似乎出了一些问题！');
            };
```

# 取消请求

`x.abort();`
注意变量的作用域问题
