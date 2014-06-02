/*
--------------------------------
Facebook
--------------------------------
+ Leaf Facebook for SocialLight Composite
+ https://github.com/wbruno/Socialight
+ version 0.0.1
+ Copyright 2014 William Bruno
+ Licensed under the MIT license

+ Documentation: https://github.com/wbruno/Socialight
*/

"use strict";

var Facebook = function () {
};

Facebook.prototype = {
    request: function (url) {
        return new Promise(function(resolve, reject) {
            this.endpoint  = "https://graph.facebook.com/?id={url}".replace("{url}", url);

            xhr.jsonp(this.endpoint, function (data) {
                resolve({
                    count: data.shares,
                    name: "share-facebook"
                });
            });
        });
    }
};
