# Construct 2 Addon parser [![NPM version][npm-image]][npm-url]
> A module to extract ACE table of a plugin

## Installation

```sh
$ npm i -g c2-addon-parser
$ npm i -S c2-addon-parser
```

## Usage

The plugin can used from both node script or cli

```js
var c2PluginAceTable = require('c2-addon-parser');
var ace = c2PluginAceTable.export("plugin folder",{type: markdown or json});
```

```bash
acetable {plugin folder} {export type}

acetable browser markdown > file.md

var ace = c2PluginAceTable.export("browser", {type: "json"});
console.log(ace)
```

## Coming
* CSV export
* Behavious
* Effects
* Better CLI support

## License

MIT © [Armaldio](armaldio.xyz)


[npm-image]: https://badge.fury.io/js/c2-addon-parser.svg
[npm-url]: https://npmjs.org/package/c2-addon-parser
[travis-image]: https://travis-ci.org/armaldio/c2-addon-parser.svg?branch=master
[travis-url]: https://travis-ci.org/armaldio/c2-addon-parser
[daviddm-image]: https://david-dm.org/armaldio/c2-addon-parser.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/armaldio/c2-addon-parser
