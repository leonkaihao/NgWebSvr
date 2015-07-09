'use strict';

/**
 * @ngdoc function
 * @name myApp.service:MsgService
 * @description
 * # MsgService
 * Service of the myApp
 */
angular.module('myApp').factory('MsgService', function () {
    var serviceData = {};
    var msgTab = {
        //web server error
        "e0001": {"name": "CreateFail",    "zh-cn": "新增失败" },
        "e0002": {"name": "UpdateFail",    "zh-cn": "更新失败" },
        "e0003": {"name": "DeleteFail",    "zh-cn": "删除失败" },
        "e0004": {"name": "NotFound",      "zh-cn": "查无资料" },

        "e0005": {"name": "ContentLose",   "zh-cn": "未传入要更新的资料，请确认填写完整，并重新提交" },
        "e1101": {"name": "UserExist",     "zh-cn": "此用户已经注册过，请使用其它用户名" },
        "e1102": {"name": "SignUpFail",    "zh-cn": "注册失效，可能超时，请重新申请" },
        "e1103": {"name": "CreateUserFail","zh-cn": "新增使用者账户失败，可能因为使用者已经存在，或者服务器忙碌，请检查后重试" },
        "e1109": {"name": "SignInFail",    "zh-cn": "登入失败，请检查用户名密码，重新登录" },
        "e1110": {"name": "VisitForbidden","zh-cn": "您有内容无权访问，可能是因为您的登录已经失效，请重新登录" },
        "e2001": {"name": "ConnectFail",   "zh-cn": "无法连接服务器，请稍后重试" },

        //front end error
        "e10001": {"name": "OldBrowser",       "zh-cn": "浏览器版本过低，请升级最新的浏览器版本"},
        "e10002": {"name": "NoSessionStorage", "zh-cn": "浏览器不支持会话存储，可能会影响到一些使用"},
        "m11001": {"name": "NeedSignIn",       "zh-cn": "用户还未登录"},
        //Unknown Error
        "e99999": {"name": "UnKnown", "zh-cn": "未知错误, 请在调试窗口查看错误信息，并回报给网站管理员，谢谢!"}
    };
    var lang = 'zh-cn';
    
    serviceData.setLang = function (lang) {
        lang = 'zh-cn';
    };

    serviceData.getErr = function (errcode) {
        var errItem = msgTab[errcode];
        if (!errItem) {
            errItem = msgTab['e99999'];
        }
        return {
            name: errItem.name,
            message: errItem[lang]
        };
	};

    return serviceData;
});