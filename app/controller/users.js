'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
  async list() { // 查询用户列表
    const {service} = this; // 从this里面解构service
    const result = await service.users.list(); // 调用名为users的service下的list分支查询列表
    this.ctx.body = { // 响应数据
      data: {
        list: result.list, // 用户列表
        total: result.total // 用户列表总条数
      },
      code: 1, // 请求状态码： 1： 成功 0： 失败
      msg: 'success' // 响应消息
    }
  }

  async roles() { // 查询角色列表
    const {service} = this; // 从this里面解构service
    const rolesList = await service.users.roles(); // 调用名为users的service下的roles分支查询角色列表
    this.ctx.body = {
      data: rolesList, // 角色列表
      code: 1,
      msg: 'success'
    }
  }

  async add() { // 添加用户
    const {service} = this;
    const result = await service.users.add(); // 调用名为users的service下的add分支添加用户
    this.ctx.body = {
      code: result,
      msg: result ? '添加成功': '添加失败'
    }
  }
  async edit() {
    const {service} = this;
    const result = await service.users.edit();
    this.ctx.body = {
      code: result,
      msg: result ? '编辑成功': '编辑失败'
    }
  }
  async status() {
    const {service} = this;
    const result = await service.users.status();
    this.ctx.body = {
      code: result,
      msg: result ? '编辑成功': '编辑失败'
    }
  }
  async del() {
    const {service} = this;
    const result = await service.users.del();
    this.ctx.body = {
      code: result,
      msg: result ? '删除成功': '删除失败'
    }
  }
}

module.exports = UsersController;
