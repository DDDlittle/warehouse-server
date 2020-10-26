'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const {ctx, service} = this;
    const result = await service.user.login();
    if (result.length === 1) {
      ctx.session.username = ctx.request.body.username;
      ctx.session.role = result[0].role_id;
      ctx.body = {
        data: result[0],
        code: 1,
        msg: "登陆成功",
      }
    } else {
      ctx.body = {
        code: 0,
        msg: "用户名/密码错误",
      }
    }
  }

  async userInfo() {
    const {ctx, service} = this;
    const result = await service.user.userInfo();
    const role = result[0].role_keys;
    ctx.body = {
      data: role.split(','),
      code: 1,
      msg: 'success'
    }
  }

  async logout() {
    const {ctx} = this;
    ctx.session = null;
    ctx.body = {
      code: 0,
      data: 'session 过期',
      msg: '清理成功！'
    }
  }
}

module.exports = UserController;
