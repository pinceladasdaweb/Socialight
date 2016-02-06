# Socialight
> Get Social Network Share Counts with Vanilla JS

![](https://raw.github.com/pinceladasdaweb/Socialight/master/screenshot.png)

## What is it?

Socialight get Social Network Share Counts on demand. Specify the url and social networks to display counters, the rest is magic. [Demo](http://www.pinceladasdaweb.com.br/blog/uploads/socialight/).

#### And Twitter?

Twitter removed share counts, please, read [here](https://blog.twitter.com/2015/hard-decisions-for-a-sustainable-platform).

## Getting Started

```bash
# Get the latest snapshot
$ git clone git@github.com:pinceladasdaweb/Socialight.git
```

## How to use?

In HTML, set the element that will be displayed counters, an example can be seen below:

```html
<div data-socialight-url='YOUR-URL' data-socialight-title='YOUR-TITLE' data-socialight-text='YOUR-TEXT' data-socialight-image='YOUR-IMAGE' data-socialight-channels='["facebook", "twitter" "googleplus", "linkedin", "buffer", "pinterest"]'></div>
```

Socialight is a [Vanilla JS](http://vanilla-js.com/) plugin with no dependencies. Include the [`socialight.min.js`](build/socialight.min.js) before your ```</body>``` tag and initialise it:

```html
<script src="path/to/socialight.min.js"></script>
<script>
    new Socialight();
</script>
```

Loading Socialight via AMD (require.js):

```html
<script>
require(["path/to/socialight.min.js"], function(Socialight) {
    new Socialight();
});
</script>
```

## Options

The script expect the following attributes in the html tag:

| Value                              | Description                                                 |
| ---------------------------------- |:-----------------------------------------------------------:|
| **data-socialight-url**            | The URL to share and get share counts                       |
| **data-socialight-title**          | The title to share                                          |
| **data-socialight-text**           | The description link to share                               |
| **data-socialight-image**          | The image url to share                                      |
| **data-socialight-channels**       | Social networks to display share counts                     |

## Supported services

Socialight support the following services: Facebook, Twitter, Google+, Linkedin, Pinterest and Buffer

##Browser Support

![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 8+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Contributing

Check [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/pinceladasdaweb/Socialight/releases) for detailed changelog.

## License
[MIT](LICENSE)