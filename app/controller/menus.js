'use strict';

const Controller = require('egg').Controller;

class MenusController extends Controller {
  async list() { // 查询菜单列表
    const {service} = this; // 从this里面解构service
    const result = await service.menus.list(); // 调用名为menus的service下的list分支查询列表
    this.ctx.body = { // 响应数据
      data: result,
      code: 1, // 请求状态码： 1： 成功 0： 失败
      msg: 'success' // 响应消息
    }
  }

  async add() { // 添加菜单
    const {service} = this;
    const result = await service.menus.add(); // 调用名为menus的service下的add分支添加菜单
    this.ctx.body = {
      code: result,
      msg: result ? '添加成功': '添加失败'
    }
  }
  async edit() {
    const {service} = this;
    const result = await service.menus.edit();
    this.ctx.body = {
      code: result,
      msg: result ? '编辑成功': '编辑失败'
    }
  }
  async status() {
    const {service} = this;
    const result = await service.menus.status();
    this.ctx.body = {
      code: result,
      msg: result ? '编辑成功': '编辑失败'
    }
  }
  async del() {
    const {service} = this;
    const result = await service.menus.del();
    this.ctx.body = {
      code: result,
      msg: result ? '删除成功': '删除失败'
    }
  }
}

module.exports = MenusController;
