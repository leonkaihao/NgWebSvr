'use strict';

/**
 * @ngdoc function
 * @name myApp.service:ApiService
 * @description
 * # ApiService
 * Service of the myApp
 */
angular.module('myApp').factory('ApiService', ['$http', 'ErrService', function ($http, ErrService) {
    var cfgData = {};

    //用于构造url参数，object参数最好只包含基本类型的元素，不要嵌套对象或数组
    var makeArg = function (arg) {
        var paramStr = '';
        switch (typeof arg) {
        case 'object':
            var i = 0;
            for (var elem in arg) {
                if (i != 0) {
                    paramStr +='&';
                }
                paramStr += String(elem);
                ++i;
            }
            break;
        case 'undefined':
        case 'function':
            return '';
        default:
            return String(arg); 
        }
    };
    //用于构造完整的url
    //第一个参数必须是resource的url,后面可以接任意个object,string或number，都会被当作参数连接起来
    var makeUrl = function () {
        var argLen = arguments.length;
        if (argLen == 0) {
            return null;
        }
        if (typeof arguments[0] != 'string') {
            return null;
        }
        var urlStr = arguments[0];
        if (argLen == 1) {
            return urlStr;
        }
        urlStr = urlStr + '?' + makeArg(arguments[1]);
        for (var i = 1; i < argLen; ++i) {
            urlStr = urlStr + '&' + makeArg(arguments[1]);
        }
        return urlStr;
    };

    cfgData.get = function(url, obj, successcb, failcb) {
        if (obj.params) {
            url = makeUrl(url, obj.params);
            delete obj.params;
        }
        obj.timeout = (1000*30);
        return $http.get(url, obj)
        .success(function (data, status, headers, config) {
            successcb(data);
        }).error(function (data, status, headers, config) {
            if (data.code) {
                failcb(ErrService.getErr(data.code));
            }                
            console.error(data);
        });
    };
    cfgData.post = function(url, obj, successcb, failcb) {
        if (obj.params) {
            url = makeUrl(url, obj.params);
            delete obj.params;
        }
        obj.timeout = (1000*30);
        return $http.post(url, obj)
        .success(function (data, status, headers, config) {
            successcb(data);
        }).error(function (data, status, headers, config) {
            if (data.code) {
                failcb(ErrService.getErr(data.code));
            }                
            console.error(data);
        });
    };
    cfgData.put = function(url, obj, successcb, failcb) {
        if (obj.params) {
            url = makeUrl(url, obj.params);
            delete obj.params;
        }
        obj.timeout = (1000*30);
        return $http.put(url, obj)
        .success(function (data, status, headers, config) {
            successcb(data);
        }).error(function (data, status, headers, config) {
            if (data.code) {
                failcb(ErrService.getErr(data.code));
            }                
            console.error(data);
        });
    };
    cfgData.delete = function(url, obj, successcb, failcb) {
        if (obj.params) {
            url = makeUrl(url, obj.params);
            delete obj.params;
        }
        obj.timeout = (1000*30);
        return $http.delete(url, obj)
        .success(function (data, status, headers, config) {
            successcb(data);
        }).error(function (data, status, headers, config) {
            if (data.code) {
                failcb(ErrService.getErr(data.code));
            }                
            console.error(data);
        });
    };
    cfgData.head = function(url, obj, successcb, failcb) {
        if (obj.params) {
            url = makeUrl(url, obj.params);
            delete obj.params;
        }
        obj.timeout = (1000*30);
        return $http.head(url, obj)
        .success(function (data, status, headers, config) {
            successcb('');
        }).error(function (data, status, headers, config) {
            failcb(ErrService.getErr('0004'));
        });
    };
    return cfgData;
}]);