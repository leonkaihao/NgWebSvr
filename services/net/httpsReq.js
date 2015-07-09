var config = require('../config').data;
//var http = require('http');
var https = require('https');

exports.httpsReq = function(options, dataObj, successcb, failcb) {

    var agentReq = https.request(options, function (agentRes) {
        var chunks = [];
        if (agentRes.statusCode !== 200) {
            var errMsg = new Error('[util] Failed to request url:' + options.url + ', return status code ' + agentRes.statusCode);
            failcb(errMsg);
            console.log(errMsg);
            return;
        }
        var dataSize = 0;
        agentRes.on('data', function (chunk) {
            chunks.push(chunk);
            dataSize += chunk.length;
        });
        agentRes.on('end', function () {
            var fullData = Buffer.concat(chunks, dataSize);
            if (dataSize !== 0) {
                if (fullData) {
                    try {
                        fullData = JSON.parse(fullData);
                    } catch (err) {
                        console.error(err);
                        failcb(err);
                    }
                } 
            }         
            successcb(fullData);
        });
    });
    agentReq.on('error', function (e) {
        failcb(e.message);
    });
    if (dataObj) {
        var sendData = JSON.stringify(dataObj);
        //sendData = aesEnc(sendData);
        agentReq.write(sendData);
    }
    agentReq.end();
};





