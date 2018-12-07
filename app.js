var express = require("express");                         //引入express框架
var IndexRouter = require('./controller/IndexRouter');    //引入客户路由
var session = require("express-session");                //引入session模块


var app = express();                                   //实例化express


//引入中间件
app.use(session({                                     //使用session中间件
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


app.use(express.static("./public"));                             //静态PUBLIC


//公共部分（客户端）
app.post("/userLogin", IndexRouter.userLogin);                    //用户登录
//公共部分（客户端）
app.post("/LeavePost", IndexRouter.LeavePost);                    //用户登录


app.listen(3000);                                                 //监听3000端口

console.log("SERVER START");                                     //控制台打印服务器成功启动信息
