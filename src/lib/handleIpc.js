const {ipcMain} = require("electron");

//ipc模式处理 进程通信 默认异步返回消息。
const handleIpcThings = (ipcListener = [], sync = true, debug = false) => {
    if (ipcListener.length === 0) return;
    ipcListener.forEach((item, i) => {
            ipcMain.on(item.thing, (event, arg) => {
                if (debug) {
                    console.log(`主进程触发事件${item.thing}，处理中...`);
                }
                item.mainCb && item.mainCb(event, arg);
                let returnMessage = item.renderCb && item.renderCb(event, arg);
                if (sync) {
                    if (debug) {
                        console.log(`返回同步消息:${returnMessage}`);
                    }
                    event.returnValue = returnMessage;
                } else {
                    if (debug) {
                        console.log(`返回异步消息:${returnMessage}`);
                    }
                    event.sender.send(item.thing + "-replay", returnMessage);
                }
            })

        }
    )

}

module.exports = handleIpcThings;
