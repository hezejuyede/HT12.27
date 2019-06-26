var formidable = require("formidable");                         //引入formidable
var mongodb = require("../models/mongodb");                    //引入models操作数据模块
var md5 = require("../models/md5");                           //引入md5加密

const tableData= [{"dryMaterial":"1","dayPersonnel":"2","classNight":"3","nightPersonnel":"4"}];

//用户注册
exports.getXFMessageList = function (req, res, next) {
    mongodb.find("xfMessage", {}, (err, result) => {
        if (err) {
            res.json({
                "state":"-2",
                "message":"数据库错误",
                data:result
            })
        }
        else {
            if(result.length>0){
                res.json({
                    "state":"1",
                    "message":"查到数据",
                    data:result
                })
            }
            else {
                res.json({
                    "state":"-1",
                    "message":"没有查到数据",
                    data:result
                })
            }
        }
    })
};




//用户注册
exports.viewMessageContent = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        mongodb.find("xfMessage", {"id":fields.id}, (err, result) => {
            if (err) {
                res.json({
                    "state":"-2",
                    "message":"数据库错误",
                    data:result
                })
            }
            else {
                if(result.length>0){
                    res.json({
                        "state":"1",
                        "message":"查到数据",
                        data:{
                            "title":result[0].title,
                            "content":result[0].content
                        }
                    })
                }
                else {
                    res.json({
                        "state":"-1",
                        "message":"没有查到数据",
                        data:[]
                    })
                }
            }
        })
    })
};


//用户注册
exports.getWorkScheduleList = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        console.log(fields.time);
        res.json({
            "state":"1",
            "message":"查到数据",
            data:tableData
        })
    })
};
