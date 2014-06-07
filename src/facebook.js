(function (window) {
  "use strict";

    window.Facebook = function () {};

    Facebook.prototype = {
        _request: function (resolve, reject) {
            this.endpoint  = "https://graph.facebook.com/?id={url}".replace("{url}", this.url);

            xhr.jsonp(this.endpoint, function (data) {
                resolve({
                    count: data.shares,
                    name: "share-facebook"
                });
            });
        },
        promise: function (url) {
            this.url = url;
            return new Promise(this._request.bind(this));
        }
    };
}(window));
