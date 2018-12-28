const { app, BrowserWindow } = require('electron')

function createWindow(opt, url = './index.html', debug = false) {
  const options = Object.assign({}, { width: 800, height: 600 }, opt);
  let win = null;
  // 创建浏览器窗口。
  win = new BrowserWindow(options);

  // 然后加载应用的 index.html。
  win.loadFile(url)

  if (debug) {
    // 打开开发者工具
    win.webContents.openDevTools()
  }
  return win;
}

const eleBox = function (opt) {
  // 当全部窗口关闭时退出。
  app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
      const win = createWindow(opt, url, debug);
      // 当 window 被关闭，这个事件会被触发。
      win.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        win = null
      })
    }
  })
}

eleBox.prototype.ready = function (opt, url, debug = false) {

  // Electron 会在初始化后并准备
  // 创建浏览器窗口时，调用这个函数。
  // 部分 API 在 ready 事件触发后才能使用。
  app.on('ready', function () {
    const win = createWindow(opt, url, debug);
    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
      // 取消引用 window 对象，如果你的应用支持多窗口的话，
      // 通常会把多个 window 对象存放在一个数组里面，
      // 与此同时，你应该删除相应的元素。
      win = null
    })
  })
}

module.exports = {
  eleBox
}


