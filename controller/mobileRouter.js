var formidable = require("formidable");                         //引入formidable
var mongodb = require("../models/mongodb");                    //引入models操作数据模块
var md5 = require("../models/md5");                           //引入md5加密



//查看消息列表
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

//查看消息详情
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


//查询班次
exports.getWorkScheduleList = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        let date = new Date('2019-06-15').getTime();
        let date2 = new Date(fields.time).getTime();
        let date3 =date2-date;
        let date4 = (Math.ceil (date3 /(1000*60*60*24)))%8;
        console.log(date4);



        /*function getWorkScheduleList(data1,data2){
            mongodb.find("workSchedule", {"class": data1}, (err, result) => {
                if (err) {
                    res.json({
                        "state": "-2",
                        "message": "数据库错误",
                        data: []
                    })
                }
                else {
                    if (result.length > 0) {
                        mongodb.find("workSchedule", {"class": data2}, (err, result2) => {
                            if (err) {
                                res.json({
                                    "state": "-2",
                                    "message": "数据库错误",
                                    data: []
                                })
                            }
                            else {
                                if (result2.length > 0) {
                                    let d1 = [];
                                    let d2 = [];
                                    for (let i = 0; i < result.length; i++) {
                                        let json = {
                                            "id": i + 1,
                                            "dryMaterial": result[i].class,
                                            "dayPersonnel": result[i].name
                                        };
                                        d1.push(json)
                                    }
                                    for (let i = 0; i < result2.length; i++) {
                                        let json = {
                                            "id": i + 1,
                                            "classNight": result2[i].class,
                                            "nightPersonnel": result2[i].name
                                        };
                                        d2.push(json)
                                    }

                                    tableData = d1.map((item1) => {
                                        arr = d2.filter((item2) => {
                                            return item2.id === item1.id;
                                        });
                                        return Object.assign(item1, arr[0]);
                                    });

                                    res.json({
                                        "state": "1",
                                        "message": "查到数据",
                                        data: tableData
                                    })
                                }
                                else {
                                    res.json({
                                        "state": "-1",
                                        "message": "没有查到数据",
                                        data: []
                                    })
                                }
                            }
                        })
                    }
                    else {
                        res.json({
                            "state": "-1",
                            "message": "没有查到数据",
                            data: []
                        })
                    }
                }
            })
        }
        let dayClassName = "四班";
        let nightClassName = "二班";
        let tableData = [];
        getWorkScheduleList(dayClassName,nightClassName);*/

    })
};
