# Socialight
> Get Social Network Share Counts with Vanilla JS

![](https://raw.github.com/pinceladasdaweb/Socialight/master/screenshot.png)

## How to use?
In HTML, set the element that will be displayed counters, an example can be seen below:

```html
<div class="social" data-url="http://www.pinceladasdaweb.com.br/"></div>
```
Socialight is a [Vanilla JS](http://vanilla-js.com/) plugin with no dependancies. Include the [`socialight.min.js`](build/socialight.min.js) in the footer of your page and initialise it:

```javascript
(function(window, document, undefined) {
    Socialight.init({
        container: '.social', //DOM node to attach to
        share: {
            // Social network to display counter
            twitter: true,
            facebook: true,
            googlePlus: true,
            linkedin: true,
            buffer: true
        }
    });
}(window, document));
```
The [`plus.php`](plus.php) file is responsible for making the request to return the data from Google+.

## Browser support
IE8+ and modern browsers.

## License
Socialight is licensed under the MIT License.