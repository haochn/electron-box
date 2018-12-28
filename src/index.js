const {eleBox}=require('./lib/box');

const electronBox=new eleBox();
electronBox.ready({},'./src/index.html',true);