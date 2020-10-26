'use strict';

const Service = require('egg').Service;

class RolesService extends Service {
  async list() { // 分页查询以后列表
    /*
    （1）limit分页公式：page是当前第几页；limit是一页多少条记录
        limit  (page-1)*limit,limit
    （2）用的地方：sql语句中
        select * from student limit(page-1)*limit,limit;
    （3）简化
        const start = (page - 1) * limit
        sql语句：select * from student limit start,limit;
    */
    const {app, ctx} = this;
    const {role_name, page, limit} = ctx.request.body;
    const start = (page - 1) * limit
    let usersList = null
    let count = 0
    if (role_name) {
      // 前台传入了用户名，则根据用户进行分页查询
      usersList = await app.mysql.query('select id,role_name,role_keys,update_time,status from roles where role_name = ?', [role_name]);
      const total = await app.mysql.query('select count(id) from roles where role_name = ?', [role_name]); // 查询总条数
      count = total[0]['count(id)'] // 获取总条数值
    } else {
      // 前台未传入用户名，直接分页查询
      usersList = await app.mysql.query('select id,role_name,role_keys,update_time,status from roles limit ?,?', [start, limit]);
      const total = await app.mysql.query('select count(id) from roles'); // 查询总条数
      count = total[0]['count(id)'] // 获取总条数值
    }
    return {
      list: usersList,
      total: count
    };
  };

  async menus() { // 获取菜单列表
    const {app} = this;
    const result = await app.mysql.query('select * from menus');
    return result;
  };

  async add() { // 添加角色
    const {app, ctx, service} = this;
    let {role_name, role_keys, status } = ctx.request.body
    role_keys = role_keys.join(',')
    const update_time = service.tools.time(); // 获取当前时间
    const sql = 'insert into roles(role_name,role_keys,status, update_time) values(?,?,?,?)'
    const data = [role_name,role_keys,status, update_time]
    const result = await app.mysql.query(sql, data);
    return result.affectedRows; // result.affectedRows的值为1代表添加成功，0代表失败
  };

  async del() { // 删除账号
    const {app, ctx} = this;
    const {id} = ctx.request.body
    const sql = 'delete from  roles  where id = ?';
    const data = [id]
    const result = await app.mysql.query(sql, data);
    return result.affectedRows; // result.affectedRows的值为1代表添加成功，0代表失败
  };

  async edit() { // 编辑角色
    const {app, ctx, service} = this;
    let {id, role_name, role_keys, status } = ctx.request.body
    role_keys = role_keys.join(',')
    const update_time = service.tools.time(); // 获取当前时间
    const sql = 'update roles set role_name=?,role_keys=?,status=?,update_time=? where id = ?';
    const data = [ role_name, role_keys, status, update_time, id];
    const result = await app.mysql.query(sql, data);
    return result.affectedRows; // result.affectedRows的值为1代表添加成功，0代表失败
  };

  async status() { // 修改账号状态
    const {app, ctx ,service} = this;
    const {id, status} = ctx.request.body
    const update_time = service.tools.time();
    const sql = 'update roles set status = ?,update_time = ? where id = ?';
    const data = [status, update_time, id]
    const result = await app.mysql.query(sql, data);
    return result.affectedRows; // result.affectedRows的值为1代表添加成功，0代表失败
  };
}

module.exports = RolesService;
