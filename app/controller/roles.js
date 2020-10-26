'use strict';

const Controller = require('egg').Controller;

class RolesController extends Controller {
  async list() { // 查询角色列表
    const {service} = this; // 从this里面解构service
    const result = await service.roles.list(); // 调用名为roles的service下的list分支查询列表
    this.ctx.body = { // 响应数据
      data: {
        list: result.list, // 角色列表
        total: result.total // 角色列表总条数
      },
      code: 1, // 请求状态码： 1： 成功 0： 失败
      msg: 'success' // 响应消息
    }
  }

  async menus() { // 查询菜单列表
    const {service} = this; // 从this里面解构service
    const menusList = await service.roles.menus(); // 调用名为roles的service下的menus分支查询角色列表
    this.ctx.body = {
      data: menusList, // 菜单列表
      code: 1,
      msg: 'success'
    }
  }

  async add() { // 添加角色
    const {service} = this;
    const result = await service.roles.add(); // 调用名为users的service下的add分支添加角色
    this.ctx.body = {
      code: result,
      msg: result ? '添加成功': '添加失败'
    }
  }
  async edit() { // 编辑角色
    const {service} = this;
    const result = await service.roles.edit();
    this.ctx.body = {
      code: result,
      msg: result ? '编辑成功': '编辑失败'
    }
  }
  async status() {
    const {service} = this;
    const result = await service.roles.status();
    this.ctx.body = {
      code: result,
      msg: result ? '编辑成功': '编辑失败'
    }
  }
  async del() {
    const {service} = this;
    const result = await service.roles.del();
    this.ctx.body = {
      code: result,
      msg: result ? '删除成功': '删除失败'
    }
  }
}

module.exports = RolesController;
