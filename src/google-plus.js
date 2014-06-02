/*
--------------------------------
GooglePlus
--------------------------------
+ Leaf GooglePlus for SocialLight Composite
+ https://github.com/wbruno/Socialight
+ version 0.0.1
+ Copyright 2014 William Bruno
+ Licensed under the MIT license

+ Documentation: https://github.com/wbruno/Socialight
*/

"use strict";

var GooglePlus = function () {
};

GooglePlus.prototype = {
    request: function (url) {
        return new Promise(function(resolve, reject) {
            this.endpoint  = "../plus.php?url={url}".replace("{url}", url);

            xhr.json({url: this.endpoint}, function (data) {
                resolve({
                    count: data.counter,
                    name: "share-gplus"
                });
            });
        });
    }
};
