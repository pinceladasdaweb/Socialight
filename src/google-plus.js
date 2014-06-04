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

(function (window) {
  "use strict";

    window.GooglePlus = function () {};

    GooglePlus.prototype = {
        _request: function (resolve, reject) {
            this.endpoint  = "../plus.php?url={url}".replace("{url}", this.url);

            xhr.json({url: this.endpoint}, function (data) {
                resolve({
                    count: data.counter,
                    name: "share-gplus"
                });
            });
        },
        promise: function (url) {
            this.url = url;
            return new Promise(this._request.bind(this));
        }
    };
}(window));
