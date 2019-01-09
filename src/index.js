const { app, BrowserWindow } = require("electron");

const handleIpcThings=require('./lib/handleIpc');

function createWindow(url = "https://github.com", opt, debug = false) {
    const defaultOpt = {
        useContentSize: false, // 将使用 web 页面的尺寸 默认 (false）
        center: true, // 窗口在屏幕居中 boolean
        resizable: true, //  窗口是否可以改变尺寸，默认值 true
        movable: true, // 窗口是否可以移动，Linux（无效），默认值 true
        minimizable: false,  // 窗口是否可以最小化，Linux（无效）， 默认值 false
        maximizable: false, // 窗口是否可以最大化动，Linux（无效）， 默认值 false
        alwaysOnTop: false, // 窗口是否永远在别的窗口的上面， 默认值 false
        fullscreen: false, // 窗口是否全屏， 默认值 false
        skipTaskbar: false, // 是否在任务栏中显示窗口， 默认值 false
        title: "electron", // 网页标题
        autoHideMenuBar: false, // 隐藏菜单栏
        // icon, // electron图标 (NativeImage | String)
        frame: true, // 窗口边框 默认值 true
        backgroundColor: "#ffffff", //窗口背景颜色 默认值 #FFF
        webPreferences: {
            webSecurity: true,
            defaultEncoding: "UTF-8", // 字符编码
            allowRunningInsecureContent: true, // 允许一个 https 页面运行 http url 里的资源，包括 JavaScript, CSS 或 plugins， 默认值 false
            plugins: true, // 启用插件
            nodeIntegration: true, //是否完整的支持 node  默认值 true
            nodeIntegrationInWorker:false
        } // 网页功能的设置
    };
    const options = Object.assign(defaultOpt, { width: 800, height: 600,ipcSync: false }, opt);

    let win = null;
    // 创建浏览器窗口。
    win = new BrowserWindow(options);

    // 然后加载应用的 index.html。
    win.loadURL(url);

    if (debug) {
        // 打开开发者工具
        win.webContents.openDevTools();
    }

    //是否启用IPC通信
    if(defaultOpt.ipcMode){
        handleIpcThings(defaultOpt.ipcListener,defaultOpt.ipcSync,debug);
    }

    return win;
}




const eleBox = function () {
    // 当全部窗口关闭时退出。
    app.on('window-all-closed', () => {
        // 否则绝大部分应用及其菜单栏会保持激活。
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
   
};

eleBox.prototype.ready = function (url, opt, debug = false) {

    // Electron 会在初始化后并准备
    // 创建浏览器窗口时，调用这个函数。
    // 部分 API 在 ready 事件触发后才能使用。
    app.on('ready', function () {
        let win = createWindow(url, opt, debug);

        // 监听按键
        const contents = win.webContents;
        contents.on("before-input-event", function (event, input) {
            if (input.type === "keyUp") {
                switch (input.key) {
                    case "F12":
                        contents.toggleDevTools(); //切换控制台
                        break;
                    case "F5":
                        contents.reload(); //刷新页面
                        break;
                }
            }
        });

        // 第一次完成绘制时
        win.once('ready-to-show', function () {
            //win.show()
        });

        // 当 window 被关闭，这个事件会被触发。
        win.on('closed', () => {
            // 取消引用 window 对象，如果你的应用支持多窗口的话，
            // 通常会把多个 window 对象存放在一个数组里面，
            // 与此同时，你应该删除相应的元素。
            win = null;
        })
    });

};

module.exports = {
    eleBox
};
