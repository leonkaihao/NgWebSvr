'use strict';

/**
 * @ngdoc function
 * @name myApp.service:ErrService
 * @description
 * # ErrService
 * Service of the myApp
 */
angular.module('myApp').factory('ErrService', function () {
    var serviceData = {};
    var errMsgTab = {
        //web server error
        "0001": {"name": "CreateFail",    "zh-cn": "新增失败" },
        "0002": {"name": "UpdateFail",    "zh-cn": "更新失败" },
        "0003": {"name": "DeleteFail",    "zh-cn": "删除失败" },
        "0004": {"name": "NotFound",      "zh-cn": "查无资料" },

        "0005": {"name": "ContentLose",   "zh-cn": "未传入要更新的资料，请确认填写完整，并重新提交" },
        "1101": {"name": "UserExist",     "zh-cn": "此用户已经注册过，请使用其它用户名" },
        "1102": {"name": "SignUpFail",    "zh-cn": "注册失效，可能超时，请重新申请" },
        "1103": {"name": "CreateUserFail","zh-cn": "新增使用者账户失败，可能因为使用者已经存在，或者服务器忙碌，请检查后重试" },
        "1109": {"name": "SignInFail",    "zh-cn": "登入失败，请检查用户名密码，重新登录" },
        "1110": {"name": "VisitForbidden","zh-cn": "您有内容无权访问，可能是因为您的登录已经失效，请重新登录" },
        "2001": {"name": "ConnectFail",   "zh-cn": "无法连接服务器，请稍后重试" },

        //front end error
        "10001": {"name": "OldBrowser",       "zh-cn": "浏览器版本过低，请升级最新的浏览器版本"},
        "10002": {"name": "NoSessionStorage", "zh-cn": "浏览器不支持会话存储，可能会影响到一些使用"},
        "11001": {"name": "NeedSignIn",       "zh-cn": "用户还未登录"},
        //Unknown Error
        "99999": {"name": "UnKnown", "zh-cn": "未知错误, 请在调试窗口查看错误信息，并回报给网站管理员，谢谢!"}
    };
    var lang = 'zh-cn';
    
    serviceData.setLang = function (lang) {
        lang = 'zh-cn';
    };

    serviceData.getErr = function (errcode) {
        var errItem = errMsgTab[errcode];
        if (!errItem) {
            errItem = errMsgTab['99999'];
        }
        return {
            name: errItem.name,
            message: errItem[lang]
        };
	};

    return serviceData;
});