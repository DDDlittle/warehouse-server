'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login(){
    const { ctx, service } = this;
    const result = await service.user.login();
    console.log(result.length);
      if(result.length===1){
        ctx.session.username = ctx.request.body.username;
        ctx.session.role = result[0].part;
        ctx.body={
          data:result[0],
          code: 1,
          msg:"登陆成功",
        }
      }
      else{
        ctx.body={
          code: 0,
          msg:"登陆失败",
        }
      }
  }
  async userInfo(){
    const { ctx, service } = this;
    const result = await service.user.userInfo();
    const permission = result[0].permission;
    const roles = permission.split(',');
      ctx.body = {
      data: roles,
      code: 1,
      msg: 'success'
      }
  }
  async logout(){
    ctx.session=null;
      ctx.body={
        code:0,
        msg:'清理成功！'
     }
  }
}

module.exports = UserController;
