# Socialight
> Get Social Network Share Counts with Vanilla JS

![](https://raw.github.com/pinceladasdaweb/Socialight/master/screenshot.png)

## What is it?

Socialight get Social Network Share Counts on demand. Specify the url and social networks to display counters, the rest is magic. [Demo](http://www.pinceladasdaweb.com.br/blog/uploads/socialight/).

## Getting Started

```bash
# Get the latest snapshot
$ git clone git@github.com:pinceladasdaweb/Socialight.git
```

## How to use?

In HTML, set the element that will be displayed counters, an example can be seen below:

```html
<div data-socialight-url='YOUR-URL' data-socialight-channels='["facebook", "twitter", "googleplus", "linkedin", "buffer", "pinterest"]'></div>
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

The script expect the following values:

| Value                              | Description                                                 |
| ---------------------------------- |:-----------------------------------------------------------:|
| **data-socialight-url**            | The URL to get share counts                                 |
| **data-socialight-channels**       | Social networks to display share counts                     |

## Supported services

Socialight support the following services: Facebook, Twitter, Google+, Linkedin, Pinterest and Buffer

##Browser Support

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png)
--- | --- | --- | --- | --- |
IE 8+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Contributing

Check [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/pinceladasdaweb/Socialight/releases) for detailed changelog.

## License
[MIT](LICENSE)

## To do

- [ ] Add option to share on social networks