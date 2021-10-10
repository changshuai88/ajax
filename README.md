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


# jquery 中的Ajax。

1.get 和post 方法
语法：$.get(或者post)('url',{对象},function回调(响应体){},'json'(表示响应体是一个json格式数据,这里注意是字符串json))
```
 $('button').eq(0).click(function () {
            $.get('http://127.0.0.1:8000/jquery-server', {
                a: 100,
                b: 200
            }, function (data) {
                console.log(data);
            })
        })
```
2.ajax方法
语法：$.ajax({对象})，例子如下
```
  $.ajax({
            //url
                url: 'http://127.0.0.1:8000/jquery-server',
                // 测试超时和出错
                // url: 'http://127.0.0.1:8000/time',
                //参数
                data: {
                    a: 100,
                    b: 200
                },
                //请求类型
                type: 'GET',
                //响应体结果
                dataType: 'json',
                //成功的回调
                success: function (data) {
                    console.log(data);
                },
                // 超时时间
                timeout: 2000,
                // 失败的回调
                error: function () {
                    console.log('出错了！');
                },
                // 头信息
                headers: {
                    c: 300,
                    d: 400
                }

            })
```
其中ajax方法还有很多参数，以上为常用参数，其余参数可参考jquery网站。

# axios vue和React推荐的Ajax工具包

地址：https://github.com/axios/axios
例子：
 ``` 
 // 配置baseURL
        axios.defaults.baseURL = 'http://127.0.0.1:8000';

        btns[0].onclick = function () {
            //GET请求
            axios.get('/axios-server', {
                //url参数
                params: {
                    id: 100,
                    vip: 7
                },
                // 请求头信息
                headers: {
                    name: 'cjs',
                    age: 30
                }
            })
        }
```
这只是一个初步了解，需要学习单独axios教程

axios通用方法例子：
``` 
btns[2].onclick = function () {
            axios({
                // url
                url: '/axios-server',
                //url参数
                params: {
                    vip: 10,
                    level: 30
                },
                // 头信息
                headers: {
                    a: 100,
                    b: 200
                },
                // 请求体参数
                data: {
                    username: 'admin',
                    password: 'admin'
                }

            }).then(response => {
                console.log(response);
                // 相应状态码
                console.log(response.status);
                // 相应状态字符串
                console.log(response.statusText);
                // 响应头信息
                console.log(response.headers);
                // 响应体
                console.log(response.data);
            })
        }
```

# fetch()函数发送Ajax
语法：
```
 btn.onclick = function () {
            fetch('http://127.0.0.1:8000/fetch-server', {
                //  请求方法
                method: 'POST',
                // 请求头
                headers: {
                    name: 'cjs'
                },
                // 请求体
                body: 'username=admin&password=admin'
                //有then，说明是一个promise。
            }).then(response => {
                // return response.text();
                return response.json();
            }).then(response => {
                console.log(response);
            })
        }
```

# 跨域
## 同源策略
同源：协议，域名，端口号，必须完全相同。
违背同源策略就是跨域

## jsonp
一种跨域解决方案

## CORS
1.CORS (cross-origin Resource sharing)跨域资源共享。
2.CORS 工作原理
CORS是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。
3.CORS使用.
CORS 头
Access-Control-Allow-Origin
指示请求的资源能共享给哪些域。
Access-Control-Allow-Credentials
指示当请求的凭证标记为 true 时，是否响应该请求。
Access-Control-Allow-Headers
用在对预请求的响应中，指示实际的请求中可以使用哪些 HTTP 头。
Access-Control-Allow-Methods
指定对预请求的响应中，哪些 HTTP 方法允许访问请求的资源。
Access-Control-Expose-Headers
指示哪些 HTTP 头的名称能在响应中列出。
Access-Control-Max-Age
指示预请求的结果能被缓存多久。
Access-Control-Request-Headers
用于发起一个预请求，告知服务器正式请求会使用那些 HTTP 头。
Access-Control-Request-Method
用于发起一个预请求，告知服务器正式请求会使用哪一种 HTTP 请求方法。
Origin
指示获取资源的请求是从什么域发起的。

