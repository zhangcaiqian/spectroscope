var express = require('express');
var fs = require('fs');
var dirname = __dirname;

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
      var config = require('./conf' + item);
      if(config.viewEngine){
        
      }

    });
}

function run(){
  console.log(fileName);
}

run();
