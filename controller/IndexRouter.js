var formidable = require("formidable");                         //引入formidable
var readline = require('readline');                            //引入读取模块
var request = require('request');                              //转发请求模块
var fs = require('fs');                                       //引入FS模块
var mongodb = require("../models/mongodb");                    //引入models操作数据模块
var md5 = require("../models/md5");                           //引入md5加密


//生产执行用户登录
exports.userLogin = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var password = fields.password;
        var Password = md5(md5(password).substr(4, 7) + md5(password));
        mongodb.find("userInfo", {"username": fields.username}, (err, result) => {
            if (result.length == 0) {
                res.json("2");
                return;
            }
            var mongodbPassword = result[0].password;
            if (mongodbPassword == Password) {
                req.session.login = "1";
                res.json({
                    state: "1",
                    username: fields.username,
                });
            }
            else {
                res.json("-1")
            }
        })
    })
};


//生产执行用户离岗
exports.LeavePost = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        console.log(fields.username);
        res.json("1")
    })
};


