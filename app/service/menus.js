'use strict';

const Service = require('egg').Service;

class MenusService extends Service {
  async list() { // 分页查询以后列表
    const {app} = this;
    const list = await app.mysql.query('select id,menu_name,code,update_time,status,remark from menus');
    return list;
  };

  async add() { // 添加菜单
    const {app, ctx, service} = this;
    const {menu_name, code, status, remark} = ctx.request.body
    const update_time = service.tools.time(); // 获取当前时间
    const sql = 'insert into menus(menu_name, code, status, update_time, remark) values(?,?,?,?,?)'
    const data = [menu_name, code, status, update_time, remark]
    const result = await app.mysql.query(sql, data);
    return result.affectedRows; // result.affectedRows的值为1代表添加成功，0代表失败
  };

  async del() { // 删除菜单
    const {app, ctx} = this;
    const {id} = ctx.request.body
    const sql = 'delete from  menus  where id = ?';
    const data = [id]
    const result = await app.mysql.query(sql, data);
    return result.affectedRows; // result.affectedRows的值为1代表添加成功，0代表失败
  };

  async edit() { // 编辑菜单
    const {app, ctx, service} = this;
    const {menu_name, code, status, id, remark} = ctx.request.body
    const update_time = service.tools.time(); // 获取当前时间
    const sql = 'update menus set menu_name=?,code=?,status=?,update_time=?,remark=? where id = ?';
    const data = [menu_name, code, status, update_time, remark, id];
    const result = await app.mysql.query(sql, data);
    return result.affectedRows; // result.affectedRows的值为1代表添加成功，0代表失败
  };

  async status() { // 修改菜单状态
    const {app, ctx, service} = this;
    const {id, status} = ctx.request.body
    const update_time = service.tools.time();
    const sql = 'update menus set status = ?,update_time = ? where id = ?';
    const data = [status, update_time, id]
    const result = await app.mysql.query(sql, data);
    return result.affectedRows; // result.affectedRows的值为1代表添加成功，0代表失败
  };
}

module.exports = MenusService;
