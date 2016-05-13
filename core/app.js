var express = require('express');
var fs = require('fs');
var path = require('path');
var dirname = __dirname;
var core = {};
//取得配置文件列表
function getConfList(){
  return ( fs.readdirSync(dirname + '/conf') );
}

function createExpress(){
  return express();
}
//启动所有服务
function startServer(confList){
  if(confList && (confList instanceof Array))
    confList.forEach(function(item){
      var app = createExpress();
      item = item.replace('.js', '');
      var config = require('./conf/' + item);
      app.get('/', function(req, res){
        res.send('hello hello');
      });
      console.log(config);
      config.port && app.listen(config.port);
      console.log(item + ' start at port ' + config.port);
    });
}

core.run = function(){
  startServer(getConfList());
}

module.exports = core;
