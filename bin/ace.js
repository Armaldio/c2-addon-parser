#! /usr/bin/env node

var c2PluginAceTable = require('../lib/index');
var args = process.argv;

if (args.length === 4) {
	var ace = c2PluginAceTable.export(args[2], {type: args[3]});
	if (args[3] === "json")
		console.log(JSON.stringify(ace, null, "\t"));
	else
		console.log(ace);
} else {
	console.log("Missing plugin folder or export type");
}