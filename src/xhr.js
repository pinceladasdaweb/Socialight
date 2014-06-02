/*
--------------------------------
XHR
--------------------------------
+ Module to do xhr requests with json and jsonp
+ https://github.com/wbruno/Socialight
+ version 0.0.1
+ Copyright 2014 William Bruno
+ Licensed under the MIT license

+ Documentation: https://github.com/wbruno/Socialight
*/
var xhr = (function (window, document, undefined) {
    "use strict";

    var module = {
        _id: 0,
        _createTagScript: function (url) {
            var externalScript,
                script;

            externalScript = document.createElement("script");
            externalScript.type = "text/javascript";
            script = externalScript.cloneNode();
            script.src = url;

            return script;
        },
        jsonp: function(url, callback, context) {
            var head = document.head || document.getElementsByTagName("head")[0],
                name = "jsonp_" + module._id++,
                script;

            url += url.match(/\?/) ? "&callback=" + name : "?callback=" + name;

            script = module._createTagScript(url);

            window[name] = function (data) {
                callback.call((context || window), data);
                head.removeChild(script);
                script = null;
                delete window[name];
            };

            head.appendChild(script);
        },
        json: function (options, callback) {
            var xhttp    = new window.XMLHttpRequest();
            options.url  = options.url || location.href;
            options.data = options.data || null;
            xhttp.open("GET", options.url, true);
            xhttp.send(options.data);
            xhttp.onreadystatechange = function () {
                if (xhttp.status === 200 && xhttp.readyState === 4) {
                    callback(JSON.parse(xhttp.responseText));
                }
            };
        }
    };

    return {
        jsonp: module.jsonp,
        json: module.json
    };

}(window, document));
