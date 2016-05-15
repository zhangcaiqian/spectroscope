var express = require('express');
var fs = require('fs');
var path = require('path');
var dirname = __dirname;
var core = {};

//返回 express 实例
function createExpress(){
  return express();
}
//取得某目录文件列表
function getFileList(){
  var filePath = arguments[0] || (dirname + '/../conf');
  return ( fs.readdirSync(filePath) );
}

//设置模板引擎
function setViewsEngine(app){
  return function(views, viewEngine){
    app.set('views', views);
    app.set('view engine', viewEngine);
  }
}

//设置路由
function setAppRoutes(app){
  return function(routerPath, routerList){
    console.log(routerList);
    if(routerList && (routerList instanceof Array)){
      routerList.forEach(function(item){
        item = item.replace('.js', '');
        var router = require(routerPath + item);
        app.use('/', router);
      });
    }else{
      throw 'arguments error!';
    }
  }
}

function pathParse(){
  return arguments[0] + arguments[1] + '/';
}
//启动所有服务
function startServer(confList){
  if(confList && (confList instanceof Array))
    confList.forEach(function(item){
      var app = createExpress();
      var setView = setViewsEngine(app);
      var setRouter = setAppRoutes(app);
      item = item.replace('.js', '');
      var config = require('../conf/' + item);
      setView(pathParse(config.rootPath, config.viewPath), config.viewEngine);
      setRouter(pathParse(config.rootPath, config.routerPath), getFileList(pathParse(config.rootPath, config.routerPath)));
      config.port && app.listen(config.port);

      console.log(config);
      console.log(pathParse(config.rootPath, config.routerPath));
      console.log(item + ' start at port ' + config.port);
    });
}

core.run = function(){
  startServer(getFileList());
}

module.exports = core;
