const express = require("express");                            //引入express框架
const mobileRouter = require('./controller/mobileRouter');    //引入移动端客户路由
const session = require("express-session");                  //引入session模块


const app = express();                                   //实例化express


//引入中间件
app.use(session({                                     //使用session中间件
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static("./public"));                             //静态PUBLIC
app.use(express.static("./static"));                             //静态static

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});


//移动端部分
app.post("/getXFMessageList", mobileRouter.getXFMessageList);                      //查看消息列表
app.post("/node/getXFMessageList", mobileRouter.getXFMessageList);                      //查看消息列表


app.post("/viewMessageContent", mobileRouter.viewMessageContent);                  //查看消息详情
app.post("/node/viewMessageContent", mobileRouter.viewMessageContent);                  //查看消息详情


app.post("/getWorkScheduleList", mobileRouter.getWorkScheduleList);                  //查询班次
app.post("/node/getWorkScheduleList", mobileRouter.getWorkScheduleList);                  //查询班次

app.listen(3001);                                                 //监听3000端口

console.log("SERVER START");                                     //控制台打印服务器成功启动信息
