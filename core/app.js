var express = require('express');
var fs = require('fs');
var path = require('path');
var dirname = __dirname;
var core = {};
//取得配置文件列表
function getAppQuene(){
  return ( fs.readdirSync(dirname + '/../conf') );
}
//返回 express 实例
function createExpress(){
  return express();
}
//设置模板引擎
function setViewsEngine(){

}
//设置路由
function setAppRoutes(){

}
//启动所有服务
function startServer(confList){
  if(confList && (confList instanceof Array))
    confList.forEach(function(item){
      var app = createExpress();
      item = item.replace('.js', '');
      var config = require('../conf/' + item);
      app.get('/', function(req, res){
        res.send('hello hello');
      });
      console.log(config);
      config.port && app.listen(config.port);
      console.log(item + ' start at port ' + config.port);
    });
}

core.run = function(){
  startServer(getAppQuene());
}

module.exports = core;
