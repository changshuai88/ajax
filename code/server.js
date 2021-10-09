// 1.引入express
const { json } = require('express');
const express = require('express');

// 2.创建应用对象

const app=express();

// 3.创建路由规则
// request是对请求报文的封装
// response是对相应报文的封装

app.get('/server',(request,response)=>{
    // 设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置相应
    response.send('hello AJAX-2');
});

app.post('/server',(request,response)=>{
    // 设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    // 设置相应
    response.send('hello AJAX POST');
});
 // 防止自定义请求头报错，如下设置 可以接收任意类型的请求
 app.all('/server',(request,response)=>{
    // 设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    // 设置相应
    response.send('hello AJAX POST');
});

app.all('/json-server',(request,response)=>{
    // 设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    // 相应一个数据
    const data={
        name:'cjs'
    };
    // 对对象进行字符串转换
    let str = JSON.stringify(data);
    // 设置相应 send 方法中只能接收字符串
    response.send(str);
});

//针对IE缓存
app.get('/ie',(request,response)=>{
    // 设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置相应
    response.send('hello AJAX-3');
});
// 延时相应
app.get('/time',(request,response)=>{
    // 设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置延时
    setTimeout(()=>{
    // 设置相应
    response.send('延时响应');
    },3000)
});
//jquery服务
app.all('/jquery-server',(request,response)=>{
    // 设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    // response.send('hello jQuery Ajax');
    let data={name:'cjs'};
    response.send(JSON.stringify(data));
  
});
//axios服务
app.all('/axios-server',(request,response)=>{
    // 设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    // response.send('hello jQuery Ajax');
    let data={name:'cjs'};
    response.send(JSON.stringify(data));
  
});

//fetch服务
app.all('/fetch-server',(request,response)=>{
    // 设置相应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    // response.send('hello jQuery Ajax');
    let data={name:'cjs'};
    response.send(JSON.stringify(data));
  
});

// 4.监听端口启动服务
app.listen(8000,()=>{
    console.log('服务已经启动,8000端口监听中....');
})