'use strict';

const { Service } = require('../../typings/app');

const Controller = require('egg').Controller;

class MostController extends Controller {
    async search(){
        const{ service }=this;
        const result = await Service.search();
        this.ctx.body={
            data:result[id,page]
        }
    }
}

module.exports = MostController;
