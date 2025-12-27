'use strict';

var AV = require('leanengine');

// 默认使用 LEANCLOUD_*，如有 TARGET_* 则覆盖，便于自定义环境
var APP_ID = process.env.TARGET_LEANCLOUD_APP_ID || process.env.LEANCLOUD_APP_ID;
var APP_KEY = process.env.TARGET_LEANCLOUD_APP_KEY || process.env.LEANCLOUD_APP_KEY;
var MASTER_KEY = process.env.TARGET_LEANCLOUD_MASTER_KEY || process.env.LEANCLOUD_APP_MASTER_KEY || process.env.LEANCLOUD_MASTER_KEY;
var SERVER_URLS = process.env.TARGET_LEANCLOUD_API_SERVER || process.env.LEANCLOUD_API_SERVER;

AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  masterKey: MASTER_KEY,
  serverURLs: SERVER_URLS
});

console.log('LeanCloud init:', {
  appId: APP_ID ? APP_ID.slice(0, 6) + '...' : 'MISSING',
  appKey: APP_KEY ? APP_KEY.slice(0, 6) + '...' : 'MISSING',
  masterKey: MASTER_KEY ? '***' : 'MISSING',
  serverURLs: SERVER_URLS || 'DEFAULT'
});

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

var app = require('./app');

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

app.listen(PORT, function (err) {
  console.log('Node app is running on port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function(err) {
    console.error('Caught exception:', err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
  });
});
