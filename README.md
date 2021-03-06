# 基于electron 的盒子

## 介绍

electron的二次封装

- 文档：[https://github.com/haochn/electron-box/README.md](https://github.com/haochn/electron-box/README.md)
- 源码：[https://github.com/haochn/electron-box](https://github.com/haochn/electron-box) （欢迎 star）

## 下载
npm
- 直接下载：[https://github.com/haochn/electron-box/releases](https://github.com/haochn/electron-box/releases)
- 使用`npm`下载：`npm install electron-box`
- 使用CDN：[https://unpkg.com/electron-box/release/index.js](https://unpkg.com/electron-box/release/index.js)

## 使用
`主进程`
``` javascript

const {eleBox}=require('electron-box');
const electronBox=new eleBox();
electronBox.ready(); //默认页面内容为github.com

// 开启ipc模式

electronBox.ready("https://github.com", {
    ipcMode:true,
    ipcListener:[{
        thing:"defaultThing", // 主进程监听事件名
        mainCb:(event,arg)=>{ // 主进程监听事件
            console.log(arg);
            console.log("mainCb");
        },
        renderCb:(event,arg)=>{ // 主进程向渲染进程发送消息的回调
            console.log("renderCb");
            return "renderCb"
        }
    }],
});

// 同步返回消息
// ipcSync:true
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
// 同步

const receiveMessage=ipcRenderer.sendSync("defaultThing", "defaultMessage");//向主进程发送消息
console.log(receiveMessage);//接受到的消息
```
[更多详细>>](https://github.com/haochn/electron-box/wiki)
### 提问

- 直接在 [github issues](https://github.com/haochn/electron-box/issues) 提交问题

每次升级版本修复的问题记录在[这里](./ISSUE.md)

