// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportMenus = require('../../../app/service/menus');
import ExportRoles = require('../../../app/service/roles');
import ExportTools = require('../../../app/service/tools');
import ExportUser = require('../../../app/service/user');
import ExportUsers = require('../../../app/service/users');

declare module 'egg' {
  interface IService {
    menus: AutoInstanceType<typeof ExportMenus>;
    roles: AutoInstanceType<typeof ExportRoles>;
    tools: AutoInstanceType<typeof ExportTools>;
    user: AutoInstanceType<typeof ExportUser>;
    users: AutoInstanceType<typeof ExportUsers>;
  }
}
