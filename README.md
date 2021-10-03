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

