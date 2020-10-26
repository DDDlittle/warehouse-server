'use strict';

const Service = require('egg').Service;
class UserService extends Service {
  async login() {
    const { app, ctx } = this;
    const {username, passwd} = ctx.request.body;
    const result = await app.mysql.query('select * from user where username = ? and passwd =?',[username,passwd]);
  return result;
  };
  async userInfo(){
    const { app, ctx } = this;
    const id = ctx.session.role
    const result = await app.mysql.query('select * from part where id = ?', [id]);
  return result;
  }
}

module.exports = UserService;