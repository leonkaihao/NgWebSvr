'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* 说明：
* 小驼峰名称表示是私有或嵌入schema
* 大驼峰表示公有或全局Schema
*/

var modelObj = exports = module.exports = {
    ROLE_MANAGER:   0,
    ROLE_TENANT:    1,
    ROLE_DEVELOPER: 2,
    roleNames: ['mgr','tnt','dev']
};

var oAuthSchema = new Schema({
    type: {type: String, enum:['sina','weixin','qq'], required: true}, //以后会有更多种
    code: {type: String, required: true}
});

var productSchema = new Schema ({
    id:   {type: String, required: true},
    name: {type: String, required: true},
});

var roleSchema = new Schema ({
    type:      {
        type: String, 
        enum: modelObj.roleNames, 
        required: true
    },
    tenantId:  {type: String},                                   //type==tnt时有效，绑定tenant service返回的id
    products:  [productSchema],                                  //产品列表，绑定tenant service返回的product id,带name冗余
    createOn:  {type: Date ,   default: Date.now},
    enabled:   {type: Boolean, default: true}                    //支付到期会被disabled
});

var AccountSchema = new Schema({
    id:       {type: String, unique: true, required: true},
    userName: {type: String, unique: true, required: true},     //登录名
    password: {type: String, required: true},                   //密码
    email:    {type: String},                                   //fixme:validator
    phone:    {type: String},                                   //fixme:validator
    oauth:    [oAuthSchema],                                    //oAuth可支持多个认证站点

    nickName: {type: String},                                   //昵称
    roles:    [roleSchema],                                     //一个账号可以有多个角色
    createOn: {type: Date, default: Date.now},                  //创建时间
    modifyOn: {type: Date},                                     //修改时间
    enabled:  {type: Boolean, default: true}                    //账号禁用开关
});

modelObj.AccountModel = mongoose.model('webadmin.accounts', AccountSchema);
