/*jslint browser: true, debug: true*/
/*global define, module, exports, console*/
(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Socialight = factory();
    }
}(this, function () {
    "use strict";

    if (!Array.prototype.includes) {
        Array.prototype.includes = function(searchElement /*, fromIndex*/) {
            var O   = Object(this),
                len = parseInt(O.length) || 0,
                currentElement, n, k;

            if (len === 0) {
                return false;
            }

            n = parseInt(arguments[1]) || 0;

            if (n >= 0) {
                k = n;
            } else {
                k = len + n;

                if (k < 0) {
                    k = 0;
                }
            }

            while (k < len) {
                currentElement = O[k];

                if (searchElement === currentElement || (searchElement !== searchElement && currentElement !== currentElement)) {
                    return true;
                }
                k++;
            }
            return false;
        };
    }

    var Socialight = function () {
        if (!this || !(this instanceof Socialight)) {
            return new Socialight();
        }

        this.container = document.querySelectorAll('[data-socialight-url]');
        this.channels  = ['facebook', 'twitter', 'linkedin', 'googleplus', 'pinterest', 'buffer'];

        this.ready();
    };

    Socialight.prototype = {
        post: function (path, data, success, fail) {
            var xhttp = new XMLHttpRequest();

            xhttp.open('POST', path, true);
            xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.setRequestHeader('Content-length', data.length);
            xhttp.setRequestHeader('Connection', 'close');
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if ((this.status >= 200 && this.status < 300) || this.status === 304) {
                        var response = JSON.parse(this.responseText);

                        success.call(this, response);
                    } else {
                        fail.call(this, this.responseText);
                    }
                }
            };
            xhttp.send(data);
            xhttp = null;
        },
        jsonp: function (url, overwritten, callback, context) {
            var name, head, script, extScript;

            if (overwritten) {
                name = this.randomString(30, "A");
            } else {
                name = 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
            }

            head           = document.head || document.getElementsByTagName('head')[0];
            extScript      = document.createElement('script');
            extScript.type = 'text/javascript';

            script       = extScript.cloneNode();
            script.src   = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + name;
            script.async = true;

            head.appendChild(script);

            window[name] = function (data) {
                callback.call((context || window), data);
                head.removeChild(script);
                script = null;
                delete this.name;
            }.bind(this);
        },
        /**
         * RANDOM STRING GENERATOR
         *
         * Info:      http://stackoverflow.com/a/27872144/383904
         * Use:       randomString(length [,"A"] [,"N"] );
         * Default:   return a random alpha-numeric string
         * Arguments: If you use the optional "A", "N" flags:
         *            "A" (Alpha flag)   return random a-Z string
         *            "N" (Numeric flag) return random 0-9 string
         */
        randomString: function(len, an) {
            an = an && an.toLowerCase();

            var str = "",
                min = an === "a" ? 10 : 0,
                max = an === "n" ? 10 : 62,
                i   = 0,
                r;

            for (;i ++< len;) {
                r = Math.random() * (max - min) + min << 0;
                str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
            }

            return str;
        },
        abbrNum: function (number, decPlaces) {
            decPlaces = Math.pow(10, decPlaces);

            var abbrev = [ "k", "m", "b", "t" ], size, i;

            for (i = abbrev.length - 1; i >= 0; i -= 1) {
                size = Math.pow(10, (i + 1) * 3);

                if (size <= number) {
                    number = Math.round(number * decPlaces / size) / decPlaces;

                    if ((number === 1000) && (i < abbrev.length - 1)) {
                        number = 1;
                        i += 1;
                    }
                    number += abbrev[i];

                    break;
                }
            }

            return number;
        },
        each: function (els, callback) {
            var i = 0, max = els.length;

            while (i < max) {
                callback(els[i], i);
                i += 1;
            }
        },
        isJson: function (jsonString) {
            try {
                var o = JSON.parse(jsonString);

                if (o && typeof o === "object" && o !== null) {
                    return o;
                }
            } catch (e) {
                console.log('%c You must pass a valid JSON in attribute "data-socialight-url". View a example here: https://github.com/pinceladasdaweb/Socialight/blob/master/example/index.html#L27', 'background: red; color: white');
            }

            return false;
        },
        template: function (s, d) {
            var p;

            for (p in d) {
                if (d.hasOwnProperty(p)) {
                    s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
                }
            }
            return s;
        },
        getAttributes: function (el) {
            return {
                url:   encodeURIComponent(el.parentNode.getAttribute('data-socialight-url')),
                title: encodeURIComponent(el.parentNode.getAttribute('data-socialight-title')),
                text:  encodeURIComponent(el.parentNode.getAttribute('data-socialight-text')),
                image: encodeURIComponent(el.parentNode.getAttribute('data-socialight-image'))
            }
        },
        popup: function(el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();

                if (e.target && e.target.nodeName === 'A') {
                    window.open(e.target.href, '', 'toolbar=0,status=0,scrollbars=0,width=680,height=480');
                }
            });
        },
        createChannels: function () {
            var channels, shareUrl, a, i, j, k, len;

            for (i = 0, len = this.container.length; i < len; i += 1) {
                channels = this.isJson(this.container[i].getAttribute('data-socialight-channels'));
                shareUrl = this.container[i].getAttribute('data-socialight-url');

                this.popup(this.container[i]);

                for (j = 0, k = channels.length; j < k; j += 1) {
                    if (this.channels.includes(channels[j])) {
                        a = this.template(
                            '<a data-socialight-channel="{channel}" data-socialight-url="{url}"></a>', {
                                channel: channels[j],
                                url: shareUrl
                            });

                        this.container[i].insertAdjacentHTML('beforeend', a);
                    }
                }
            }
        },
        facebook: function () {
            var matches = document.querySelectorAll('[data-socialight-channel="facebook"]'), attrs;

            this.each(matches, function (match) {
                attrs = this.getAttributes(match);

                match.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + attrs.url);

                this.jsonp('https://graph.facebook.com/?id=' + attrs.url, false, function (data) {
                    match.textContent = this.abbrNum(data.shares, 1);
                }.bind(this));
            }.bind(this));
        },
        twitter: function () {
            var matches = document.querySelectorAll('[data-socialight-channel="twitter"]'), attrs;

            this.each(matches, function (match) {
                attrs = this.getAttributes(match);

                match.setAttribute('href', 'https://twitter.com/share?url=' + attrs.url + '&text=' + attrs.title);
                match.textContent = 'Tweet';
            }.bind(this));
        },
        googlePlus: function () {
            var matches = document.querySelectorAll('[data-socialight-channel="googleplus"]'), attrs, data;

            this.each(matches, function (match) {
                attrs = this.getAttributes(match);
                data  = JSON.stringify({
                    'method': 'pos.plusones.get',
                    'id': decodeURIComponent(attrs.url),
                    'params': {
                        'nolog': true,
                        'id': decodeURIComponent(attrs.url),
                        'source': 'widget',
                        'userId': '@viewer',
                        'groupId': '@self'
                    },
                    'jsonrpc': '2.0',
                    'key': 'p',
                    'apiVersion': 'v1'
                });

                match.setAttribute('href', 'https://plus.google.com/share?url=' + attrs.url);

                this.post('https://clients6.google.com/rpc', data, function (data) {
                    match.textContent = this.abbrNum(data.result.metadata.globalCounts.count, 1);
                }.bind(this), function (err) {
                    console.log(err)
                });
            }.bind(this));
        },
        linkedin: function () {
            var matches = document.querySelectorAll('[data-socialight-channel="linkedin"]'), attrs;

            this.each(matches, function (match) {
                attrs = this.getAttributes(match);

                match.setAttribute('href', 'https://www.linkedin.com/shareArticle?mini=true&url=' + attrs.url + '&title=' + attrs.title + '&summary=' + attrs.text + '&source=' + attrs.image);

                this.jsonp('https://www.linkedin.com/countserv/count/share?url=' + attrs.url, true, function (data) {
                    match.textContent = this.abbrNum(data.count, 1);
                }.bind(this));
            }.bind(this));
        },
        buffer: function () {
            var matches = document.querySelectorAll('[data-socialight-channel="buffer"]'), attrs;

            this.each(matches, function (match) {
                attrs = this.getAttributes(match);

                match.setAttribute('href', 'https://buffer.com/add?url=' + attrs.url + '&text=' + attrs.title);

                this.jsonp('https://api.bufferapp.com/1/links/shares.json?url=' + attrs.url, false, function (data) {
                    match.textContent = this.abbrNum(data.shares, 1);
                }.bind(this));
            }.bind(this));
        },
        pinterest: function () {
            var matches = document.querySelectorAll('[data-socialight-channel="pinterest"]'), attrs;

            this.each(matches, function (match) {
                attrs = this.getAttributes(match);

                match.setAttribute('href', 'https://pinterest.com/pin/create/button/?url=' + attrs.url + '&media=' + attrs.image + '&description=' + attrs.title);

                this.jsonp('https://api.pinterest.com/v1/urls/count.json?&url=' + attrs.url, false, function (data) {
                    match.textContent = this.abbrNum(data.count, 1);
                }.bind(this));
            }.bind(this));
        },
        getCounters: function () {
            this.facebook();
            this.twitter();
            this.googlePlus();
            this.linkedin();
            this.buffer();
            this.pinterest();
        },
        ready: function () {
            this.createChannels();
            this.getCounters();
        }
    };

    return Socialight;
}));