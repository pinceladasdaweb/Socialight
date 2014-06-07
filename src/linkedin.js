(function (window) {
  "use strict";

    window.LinkedIn = function () {};

    LinkedIn.prototype = {
        _request: function (resolve, reject) {
            this.endpoint  = "https://www.linkedin.com/countserv/count/share?url={url}".replace("{url}", this.url);

            xhr.jsonp(this.endpoint, function (data) {
                resolve({
                    count: data.count,
                    name: "share-linkedin"
                });
            });
        },
        promise: function (url) {
            this.url = url;
            return new Promise(this._request.bind(this));
        }
    };
}(window));
