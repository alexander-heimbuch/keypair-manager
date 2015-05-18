var fs = require('fs-extra'),
	clc = require('cli-color'),
	path = require('path'),

	config,

	buildConfig = function () {
		var config;
		
		try {
			config = require('./config');
		} catch (err) {
			config = {};
		}

		return config;
	},

	saveConfig = function () {
		fs.writeFileSync('./config.json', JSON.stringify(config));
	};

	config = buildConfig();

module.exports = {
	'source': function (folder) {
		try {
			if (fs.statSync(folder).isDirectory()) {
				config.source = path.resolve(folder);
				console.log(clc.green('Setting keypair source to ' + config.source));
				saveConfig();
			}
		} catch (err) {
			console.log(clc.red('Couldn\'t access ' + folder));
		}
	},

	'list': function () {
		var results = [];

		if (config.source === undefined) {
			return console.log(clc.yellow('No source set, please add a source before you try to list your keypairs'));
		}

		fs.readdirSync(config.source).forEach(function (file) {
			if (path.extname(path.resolve(config.source, file)) === '.pub') {
				results.push(file.replace('.pub', ''));
			}
		});

		console.log(clc.green('Available keypairs:'));
		console.log('   ' + results.join('\n   '));
	},

	'current': function () {
		if (config.current === undefined) {
			return console.log(clc.yellow('No information about current keypair available'));
		}

		console.log(clc.green('Current keypair: ' + config.current));
	},

	'set': function (keypair) {
		var home = process.env.HOME || process.env.USERPROFILE,
			privatKey = path.resolve(config.source, keypair),
			publicKey = path.resolve(config.source, keypair + '.pub'),
			oldPrivateKey = path.resolve(home ,'.ssh', 'id_rsa'),
			oldPublicKey = path.resolve(home ,'.ssh', 'id_rsa.pub');

		if (config.source === undefined) {
			return console.log(clc.red('No source set, please add a source before you try to list your keys'));
		}

		if (!fs.existsSync(privatKey) || !fs.statSync(privatKey).isFile() || !fs.existsSync(publicKey) || !fs.statSync(publicKey).isFile()) {
			return console.log(clc.red('Can\'t find the keypair for ' + keypair));
		}

		fs.copySync(privatKey, oldPrivateKey);
		fs.copySync(publicKey, oldPublicKey);

		config.current = keypair;
		console.log(clc.green('Set keypair: ' + keypair));
		saveConfig();
	}
};