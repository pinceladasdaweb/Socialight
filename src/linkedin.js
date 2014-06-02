/*
--------------------------------
LinkedIn
--------------------------------
+ Leaf LinkedIn for SocialLight Composite
+ https://github.com/wbruno/Socialight
+ version 0.0.1
+ Copyright 2014 William Bruno
+ Licensed under the MIT license

+ Documentation: https://github.com/wbruno/Socialight
*/

"use strict";

var LinkedIn = function () {
};

LinkedIn.prototype = {
    request: function (url) {
        return new Promise(function(resolve, reject) {
            this.endpoint  = "https://www.linkedin.com/countserv/count/share?url={url}".replace("{url}", url);

            xhr.jsonp(this.endpoint, function (data) {
                resolve({
                    count: data.count,
                    name: "share-linkedin"
                });
            });
        });
    }
};
