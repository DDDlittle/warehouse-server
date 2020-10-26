'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {router, controller} = app;
   // 用户
  router.post('/login', controller.user.login);
  router.post('/userInfo', controller.user.userInfo);
  router.post('/logout', controller.user.logout);
  // 用户管路
  router.post('/users/list', controller.users.list);
  router.post('/users/roles', controller.users.roles);
  router.post('/users/add', controller.users.add);
  router.post('/users/edit', controller.users.edit);
  router.post('/users/status', controller.users.status);
  router.post('/users/del', controller.users.del);
  // 角色管理
  router.post('/roles/list', controller.roles.list);
  router.post('/roles/menus', controller.roles.menus);
  router.post('/roles/add', controller.roles.add);
  router.post('/roles/edit', controller.roles.edit);
  router.post('/roles/status', controller.roles.status);
  router.post('/roles/del', controller.roles.del);
  // 菜单管理
  router.post('/menus/list', controller.menus.list);
  router.post('/menus/add', controller.menus.add);
  router.post('/menus/edit', controller.menus.edit);
  router.post('/menus/status', controller.menus.status);
  router.post('/menus/del', controller.menus.del);
};
