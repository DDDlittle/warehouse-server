'use strict';

const Service = require('egg').Service;

class UserService extends Service {
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
    const {username, page, limit} = ctx.request.body;
    const start = (page - 1) * limit
    let usersList = null
    let count = 0
    if (username) {
      // 前台传入了用户名，则根据用户进行分页查询
      usersList = await app.mysql.query('select id,account,nick_name,role_id,avatar,status,update_time,remark from users where account = ?', [username]);
      const total = await app.mysql.query('select count(id) from users where account = ?', [username]); // 查询总条数
      count = total[0]['count(id)'] // 获取总条数值
    } else {
      // 前台未传入用户名，直接分页查询
      usersList = await app.mysql.query('select id,account,nick_name,role_id,avatar,status,update_time,remark from users limit ?,?', [start, limit]);
      const total = await app.mysql.query('select count(id) from users'); // 查询总条数
      count = total[0]['count(id)'] // 获取总条数值
    }
    return {
      list: usersList,
      total: count
    };
  };

  async roles() { // 获取角色列表
    const {app} = this;
    const result = await app.mysql.query('select * from roles');
    return result;
  };

  async add() { // 添加账号
    const {app, ctx, service} = this;
    const {account, nick_name, user_pwd, role_id, avatar, status, remark} = ctx.request.body
    const update_time = service.tools.time(); // 获取当前时间
    const sql = 'insert into users(account,nick_name,user_pwd,role_id,avatar,status,update_time,remark) values(?,?,?,?,?,?,?,?)'
    const data = [account, nick_name, user_pwd, Number(role_id), avatar, status, update_time, remark]
    const result = await app.mysql.query(sql, data);
    return result.affectedRows; // result.affectedRows的值为1代表添加成功，0代表失败
  };

  async del() { // 删除账号
    const {app, ctx} = this;
    const {id} = ctx.request.body
    const sql = 'delete from  users  where id = ?';
    const data = [id]
    const result = await app.mysql.query(sql, data);
    return result.affectedRows; // result.affectedRows的值为1代表添加成功，0代表失败
  };

  async edit() { // 编辑账号
    const {app, ctx, service} = this;
    const {id, nick_name, user_pwd, role_id, avatar, status, remark} = ctx.request.body
    const update_time = service.tools.time(); // 获取当前时间
    let sql = ''
    let data = null
    if (user_pwd) { // 如果前台传了密码字段，则更新
      sql = 'update users set nick_name=?,user_pwd=?,role_id=?,avatar=?,status=?,remark=?,update_time=? where id = ?';
      data = [nick_name, user_pwd, Number(role_id), avatar, status, remark, update_time, id];
    } else {
      sql = 'update users set nick_name=?,role_id=?,avatar=?,status=?,remark=?,update_time=? where id = ?';
      data = [nick_name, Number(role_id), avatar, status, remark, update_time, id];
    }
    const result = await app.mysql.query(sql, data);
    return result.affectedRows; // result.affectedRows的值为1代表添加成功，0代表失败
  };

  async status() { // 修改账号状态
    const {app, ctx} = this;
    const {id, status, service} = ctx.request.body
    const update_time = service.tools.time();
    const sql = 'update users set status = ?,update_time = ? where id = ?';
    const data = [status, update_time, id]
    const result = await app.mysql.query(sql, data);
    return result.affectedRows; // result.affectedRows的值为1代表添加成功，0代表失败
  };
}

module.exports = UserService;
