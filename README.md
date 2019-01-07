# 基于electron 的盒子

## 介绍

electron的二次封装

- 文档：[https://github.com/haochn/electron-box/README.md](https://github.com/haochn/electron-box/README.md)
- 源码：[https://github.com/haochn/electron-box](https://github.com/haochn/electron-box) （欢迎 star）

## 下载

- 直接下载：[https://github.com/haochn/electron-box/releases](https://github.com/haochn/electron-box/releases)
- 使用`npm`下载：`npm install electron-box`
- 使用CDN：[https://unpkg.com/electron-box/release/electron-box.js](https://unpkg.com/electron-box/release/electron-box.js)

## 使用
`主进程`
``` javascript
const {eleBox}=require('electron-box');

const electronBox=new eleBox();
electronBox.ready(); //默认页面内容为github.com
```
`渲染进程`
```javascript
// 开启ipc模式
const {ipcRenderer} = require("electron");

ipcRenderer.on("defaultThing-replay", (event, arg) => {
    //主进程反馈的消息
    console.log(event);
    console.log(arg);
});
ipcRenderer.send("defaultThing", "defaultMessage");//向主进程发送消息
```
[更多详细>>](https://github.com/haochn/electron-box/wiki)
### 提问

- 直接在 [github issues](https://github.com/haochn/electron-box/issues) 提交问题

每次升级版本修复的问题记录在[这里](./ISSUE.md)

