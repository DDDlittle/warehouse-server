'use strict';

const Service = require('egg').Service;

class ToolsService extends Service {
  time(format = 'yyyy-MM-dd hh:mm:ss', t) {
    const time = t ? new Date(t) : new Date();
    const o = {
      'M+': time.getMonth() + 1,
      'd+': time.getDate(),
      'h+': time.getHours(),
      'm+': time.getMinutes(),
      's+': time.getSeconds(),
      'q+': Math.floor((time.getMonth() + 3) / 3),
      S: time.getMilliseconds(),
    };

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (const k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }

    return format;
  }
}

module.exports = ToolsService;
