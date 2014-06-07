(function (window) {
  "use strict";

    window.Twitter = function () {};

    Twitter.prototype = {
        _request: function (resolve, reject) {
            this.endpoint  = "https://cdn.api.twitter.com/1/urls/count.json?url={url}".replace("{url}", this.url);

            xhr.jsonp(this.endpoint, function (data) {
                resolve({
                    count: data.count,
                    name: "share-twitter"
                });
            });
        },
        promise: function (url) {
            this.url = url;
            return new Promise(this._request.bind(this));
        }
    };
}(window));
