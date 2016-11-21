# c2-addon-parser [![NPM version][npm-image]][npm-url]
> A module to extract ACE table of a plugin

## Installation

```sh
$ npm install -g c2-addon-parser
```

## Usage

```js
var c2PluginAceTable = require('c2-addon-parser');

var ace = c2PluginAceTable.extract({
    type:"json"
});
console.log(ace)
```
## License

MIT © [Armaldio](armaldio.xyz)


[npm-image]: https://badge.fury.io/js/c2-addon-parser.svg
[npm-url]: https://npmjs.org/package/c2-addon-parser
[travis-image]: https://travis-ci.org/armaldio/c2-addon-parser.svg?branch=master
[travis-url]: https://travis-ci.org/armaldio/c2-addon-parser
[daviddm-image]: https://david-dm.org/armaldio/c2-addon-parser.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/armaldio/c2-addon-parser
