#! /usr/bin/env node

const c2PluginAceTable = require('../lib/index');
const fs               = require('fs');
const path             = require('path');
const util             = require('util');

const args = require('yargs')
  .option('directory', {
    alias   : 'd',
    describe: 'The directory where the plugin is located',
  })
  .option('export', {
    alias   : 'e',
    default : 'json',
    describe: 'The type of file to export to',
    choices : [ 'json', 'html', 'markdown' ],
  })
  .option('output', {
    alias   : 'o',
    describe: 'The ath to the output file',
  })
  .option('type', {
    alias   : 't',
    describe: 'Whether to only get the type of addon',
  })
  .argv;

// if I have a directory
if (args.directory) {
  // If I have an export type
  if (args.export) {
    const ace = c2PluginAceTable.export(args.directory, args.export);
    // If I have an output
    if (args.output) {
      // If this output is JSON
      let output;
      if (args.export === 'json') {
        output = JSON.stringify(ace, null, '  ');
      } else {
        output = ace;
      }
      // console.log(util.inspect(ace, true, 10));
      fs.writeFileSync(path.join(args.directory, args.output), output, 'utf8');
    } else {
      if (args.export === 'json') {
        console.log(JSON.stringify(ace, null, '  '));
      } else {
        console.log(ace);
      }
    }
  } else if (args.type) {
    const type = c2PluginAceTable.getType(args.directory);
    console.log(type);
  }
} else {
  console.log('Missing plugin folder');
}
