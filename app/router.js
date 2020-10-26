'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/', controller.home.index);
  router.post('/login', controller.user.login);
  router.post('/userInfo',controller.user.userInfo);
  router.post('/logout',controller.user.logout);
  router.post('/search',controller.most.search);
};