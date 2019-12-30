const shell = require('shelljs');

shell.cp('-R', './.build/dist', './');

// using a dot folder
// shell.exec('cp package.json ./.dist/package.json', {silent:true});
// shell.cp('-R', './.build/dist', './.dist');
