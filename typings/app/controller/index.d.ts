// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMenus = require('../../../app/controller/menus');
import ExportRoles = require('../../../app/controller/roles');
import ExportUser = require('../../../app/controller/user');
import ExportUsers = require('../../../app/controller/users');

declare module 'egg' {
  interface IController {
    menus: ExportMenus;
    roles: ExportRoles;
    user: ExportUser;
    users: ExportUsers;
  }
}
