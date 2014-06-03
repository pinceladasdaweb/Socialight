/*
--------------------------------
Twitter
--------------------------------
+ Leaf Twitter for SocialLight Composite
+ https://github.com/wbruno/Socialight
+ version 0.0.1
+ Copyright 2014 William Bruno
+ Licensed under the MIT license

+ Documentation: https://github.com/wbruno/Socialight
*/

"use strict";

var Twitter = function () {
};

Twitter.prototype = {
    request: function (url) {
        return new Promise(function(resolve, reject) {
            this.endpoint  = "https://cdn.api.twitter.com/1/urls/count.json?url={url}".replace("{url}", url);

            xhr.jsonp(this.endpoint, function (data) {
                resolve({
                    count: data.count,
                    name: "share-twitter"
                });
            });
        });
    }
};
