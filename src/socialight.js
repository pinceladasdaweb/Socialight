/*
--------------------------------
Socialight
--------------------------------
+ Get Social Network Share Counts with Vanilla JS
+ https://github.com/pinceladasdaweb/Socialight
+ version 0.0.2
+ Copyright 2014 Pedro Rogerio
+ Licensed under the MIT license

+ Documentation: https://github.com/pinceladasdaweb/Socialight
*/

var Socialight = function(options) {
    this.$container = options.container;
    this.url        = options.url;
    this.leaf       = [];
};
Socialight.prototype = {
    // private
    _create: function (name, props) {
        var el = document.createElement(name), p;
        for (p in props) {
            if (props.hasOwnProperty(p)) {
                el[p] = props[p];
            }
        }
        return el;
    },
    _abbrNum: function (number, decPlaces) {
        decPlaces = Math.pow(10,decPlaces);

        var abbrev = [ "k", "m", "b", "t" ];

        for (var i=abbrev.length-1; i>=0; i--) {
            var size = Math.pow(10,(i+1)*3);

            if(size <= number) {
                number = Math.round(number*decPlaces/size)/decPlaces;
                if((number === 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }
                number += abbrev[i];

                break;
            }
        }

        return number;
    },
    _attach: function (data, customClass) {
        var self = this,
            span = self._create("span", {className: "shares "+ customClass}),
            text = document.createTextNode(data);

        span.appendChild(text);

        return span;
    },
    // public
    add: function (leaf) {
        this.leaf.push(leaf);
    },
    draw: function () {
        var self    = this,
            url     = self.url;

        self.leaf.forEach(function (each) {
            var promise = each.promise(self.url);

            promise.then(function (result) {
                self.$container.appendChild(self._attach(self._abbrNum(result.count, 1), result.name).cloneNode(true));
            });
        });
    }
};
