/*
--------------------------------
Socialight
--------------------------------
+ Get Social Network Share Counts with Vanilla JS
+ https://github.com/pinceladasdaweb/Socialight
+ version 0.0.1
+ Copyright 2014 Pedro Rogerio
+ Licensed under the MIT license

+ Documentation: https://github.com/pinceladasdaweb/Socialight
*/
var jsonp = (function (window, document, undefined) {
    'use strict';
    var id = 0, head, externalScript;
    head = document.head || document.getElementsByTagName('head')[0];
    externalScript = document.createElement('script');
    externalScript.type = 'text/javascript';

    return function (url, callback, context) {
        var name = 'jsonp_' + id++, script;

        if (url.match(/\?/)) {
            url += '&callback=' + name;
        } else {
            url += '?callback=' + name;
        }

        script = externalScript.cloneNode();
        script.src = url;

        window[name] = function (data) {
            callback.call((context || window), data);
            head.removeChild(script);
            script = null;
            delete window[name];
        }

        head.appendChild(script);
    }
}(window, document));

var Socialight = (function (window, document, undefined) {
    "use strict";
    var module = {
        config: function (config) {
            this.container        = config.container;
            this.share            = config.share;
            this.twitterEndpoint  = 'https://cdn.api.twitter.com/1/urls/count.json?url={url}';
            this.facebookEndpoint = 'https://graph.facebook.com/?id={url}';
            this.linkedinEndpoint = 'https://www.linkedin.com/countserv/count/share?url={url}';
            this.bufferEndpoint   = 'https://api.bufferapp.com/1/links/shares.json?url={url}';
            this.gplusEndpoint    = './plus.php?url={url}';
        },
        getJSON: function (options, callback) {
            var xhttp    = new window.XMLHttpRequest();
            options.url  = options.url || location.href;
            options.data = options.data || null;
            xhttp.open('GET', options.url, true);
            xhttp.send(options.data);
            xhttp.onreadystatechange = function () {
                if (xhttp.status === 200 && xhttp.readyState === 4) {
                    callback(JSON.parse(xhttp.responseText));
                }
            };
        },
        loop: function (els, callback) {
            var i = 0, max = els.length;

            while (i < max) {
                callback(els[i], i);
                i += 1;
            }
        },
        create: function (name, props) {
            var el = document.createElement(name), p;
            for (p in props) {
                if (props.hasOwnProperty(p)) {
                    el[p] = props[p];
                }
            }
            return el;
        },
        abbrNum: function (number, decPlaces) {
            decPlaces = Math.pow(10,decPlaces);

            var abbrev = [ "k", "m", "b", "t" ];

            for (var i=abbrev.length-1; i>=0; i--) {
                var size = Math.pow(10,(i+1)*3);

                if(size <= number) {
                    number = Math.round(number*decPlaces/size)/decPlaces;
                    if((number == 1000) && (i < abbrev.length - 1)) {
                        number = 1;
                        i++;
                    }
                    number += abbrev[i];

                    break;
                }
            }

            return number;
        },
        attach: function (data, customClass) {
            var self = this,
                span = self.create('span', {className: 'shares '+ customClass}),
                text = document.createTextNode(data);

            span.appendChild(text);

            return span;
        },
        request: function () {
            var self    = this,
                matches = document.querySelectorAll(self.container);

            self.loop(matches, function (matche) {
                var url      = matche.getAttribute('data-url'),
                    twitter  = self.twitterEndpoint.replace('{url}', url),
                    facebook = self.facebookEndpoint.replace('{url}', url),
                    gplus    = self.gplusEndpoint.replace('{url}', url),
                    linkedin = self.linkedinEndpoint.replace('{url}', url),
                    buffer   = self.bufferEndpoint.replace('{url}', url);

                if (self.share.twitter) {
                    jsonp(twitter, function (data) {
                        matche.appendChild(self.attach(self.abbrNum(data.count, 1), 'share-twitter').cloneNode(true));
                    });
                }

                if (self.share.facebook) {
                    jsonp(facebook, function (data) {
                        matche.appendChild(self.attach(self.abbrNum(data.shares, 1), 'share-facebook').cloneNode(true));
                    });
                }

                if (self.share.googlePlus) {
                    self.getJSON({url: gplus}, function (data) {
                        matche.appendChild(self.attach(self.abbrNum(data.counter, 1), 'share-gplus').cloneNode(true));
                    });
                }

                if (self.share.linkedin) {
                    jsonp(linkedin, function (data) {
                        matche.appendChild(self.attach(self.abbrNum(data.count, 1), 'share-linkedin').cloneNode(true));
                    });
                }

                if (self.share.buffer) {
                    jsonp(buffer, function (data) {
                        matche.appendChild(self.attach(self.abbrNum(data.shares, 1), 'share-buffer').cloneNode(true));
                    });
                }
            });
        },
        init: function (config) {
            module.config(config);
            module.request();
        }
    };
    return {
        init: module.init
    };
}(window, document));