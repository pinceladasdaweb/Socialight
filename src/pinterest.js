(function (window) {
  "use strict";

    window.Pinterest = function () {};

    Pinterest.prototype = {
        _request: function (resolve, reject) {
            this.endpoint  = "https://api.pinterest.com/v1/urls/count.json?&url={url}".replace("{url}", this.url);

            xhr.jsonp(this.endpoint, function (data) {
                resolve({
                    count: data.count,
                    name: "share-pinterest"
                });
            });
        },
        promise: function (url) {
            this.url = url;
            return new Promise(this._request.bind(this));
        }
    };
}(window));
