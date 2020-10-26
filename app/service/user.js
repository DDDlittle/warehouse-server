'use strict';

const Service = require('egg').Service;
class UserService extends Service {
  async login() {
    const { app, ctx } = this;
    const {username, passwd} = ctx.request.body;
    const result = await app.mysql.query('select id,account,nick_name,role_id,avatar,status from users where account = ? and user_pwd =?',[username,passwd]);
  return result;
  };
  async userInfo(){
    const { app, ctx } = this;
    const id = ctx.session.role
    const result = await app.mysql.query('select * from roles where id = ?', [id]);
  return result;
  }
}

module.exports = UserService;
