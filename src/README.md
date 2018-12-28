# 基于electron 的盒子

## 使用
``` javascript
const {eleBox}=require('./lib/box');

const electronBox=new eleBox();
electronBox.ready({},'./src/index.html',true);
```