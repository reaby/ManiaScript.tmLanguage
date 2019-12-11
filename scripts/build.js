#!/usr/bin/env node

require('events').EventEmitter.prototype._maxListeners = 100;

const fs = require('fs'), YAML = require('yamljs'), chalk = require('chalk'), plist = require('plist'),
    yamlLoader = require('./yaml-import-loader');

yamlLoader('src/syntaxes/_index.yaml', (err, res) => {
    if (err) {
        console.log(err);
        throw new Error();
    }
    const encodeObject = (obj) => {
        const str = JSON.stringify(obj);
        const esc = str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&apos;');

        return JSON.parse(esc)
    };

    const yamlString = res.buffer;
    const pojo = encodeObject(YAML.parse(yamlString));
    const jsonString = JSON.stringify(YAML.parse(yamlString), null, 4);
    const plistString = plist.build(pojo);
    const builds = [
        ['build/syntaxes/ManiaScript.YAML-tmLanguage', yamlString],
        ['build/syntaxes/ManiaScript.json', jsonString],
        ['build/syntaxes/ManiaScript.tmLanguage', plistString]
    ];

    builds.forEach(([path, buffer]) =>
        fs.writeFileSync(path, buffer, 'utf8',
            console.log(chalk.yellow('write'), chalk.green(`${path}... done!`))))
});
