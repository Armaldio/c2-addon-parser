#! /usr/bin/env node

var c2PluginAceTable = require('../lib/index');
var marked           = require('marked');
var $                = require("jquery");
var path             = require("path");

var args = process.argv;

if (args.length === 4) {
	var ace = c2PluginAceTable.export(args[2], {type: args[3]});
	console.log(ace);
} else {
	console.log("Missing plugin folder or export type");
}