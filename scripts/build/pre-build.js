const shell = require('shelljs');

// Remove directories
shell.exec('rm -rR ./.build', {silent:true});
// shell.exec('rm -rR ./.dist', {silent:true});
shell.exec('rm -rR ./dist', {silent:true});

// Recreate directories
shell.exec('mkdir ./.build', {silent:true});
shell.exec('mkdir ./.build/compiled', {silent:true});
shell.exec('mkdir ./.build/dist', {silent:true});
// shell.exec('mkdir ./.dist', {silent:true});
// shell.exec('mkdir ./.dist/dist', {silent:true});
shell.exec('mkdir ./dist', {silent:true});
