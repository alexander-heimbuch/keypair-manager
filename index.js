#!/usr/bin/env node

var program = require('commander'),
	commands = require('./commands');

program
 	.version('0.0.1');

program
	.command('current')
	.description('display your current ssh-key name')
	.action(commands.current);

program
	.command('set [keypair-name]')
	.description('set a ssh keypair')
	.action(commands.set);

program	
	.command('list')
	.description('list all available ssh-keys')
	.action(commands.list);

program	
	.command('source [path]')
	.description('set the source folder of your ssh-keys')
	.action(commands.source);

program.parse(process.argv);