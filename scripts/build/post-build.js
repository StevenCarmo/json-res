const shell = require('shelljs');

// Clean temp directories
shell.exec('rm -rR ./.build', {silent:true});
