const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const rollup = require("rollup");
const uglifyEs = require("uglify-es");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const packageName = "index";
const compiledPath = path.join(__dirname, "../../.build", "compiled");
const distNpmPath = path.join(__dirname, "../../.build", "dist");

async function makeDefinitionsCode() {
  let defs = [
    "// -- interfaces definitions --",
    removeLocalImportsExports((await readFile(path.join(compiledPath, "lib", "interfaces.d.ts"), "utf-8")).trim()),
    "// -- json-res-builder definitions --",
    removeLocalImportsExports((await readFile(path.join(compiledPath, "lib", "json-res-builder.d.ts"), "utf-8")).trim()),
    "// -- Entry point definition --",
    removeSemicolons(
      removeLocalImportsExports((await readFile(path.join(compiledPath, "index.d.ts"), "utf-8")).trim()),
    )
  ]
  return defs.join("\n\n")
}

function removeLocalImportsExports(code) {
  let localImportExport = /^\s*(import|export) .* from '\.*\/[a-zA-Z\/-]*';?\s*$/;
  return code.split("\n").filter(line => {
    return !localImportExport.test(line)
  }).join("\n").trim()
}

function removeSemicolons(code) {
  return code.replace(/;/g, "")
}

async function build() {
  let bundle = await rollup.rollup({
    input: path.join(compiledPath, "index.js"),
    external: [],
  });

  // COMMONJS module version
  let cjsBundle = await bundle.generate({
    format: "cjs",
    sourcemap: false
  });

  let cjsCode = cjsBundle.output[0].code;
  let cjsCodeMinified = uglifyEs.minify(cjsCode);
  if (cjsCodeMinified.error) { throw cjsCodeMinified.error }
  await writeFile(path.join(distNpmPath, `${packageName}.js`), cjsCode);
  await writeFile(path.join(distNpmPath, `${packageName}.min.js`), cjsCodeMinified.code);

  // ES6 module version
  let esBundle = await bundle.generate({
    format: "esm",
    sourcemap: false
  });

  let esCode = esBundle.output[0].code;
  let esCodeMinified = uglifyEs.minify(esCode);
  if (esCodeMinified.error) { throw esCodeMinified.error }
  await writeFile(path.join(distNpmPath, `${packageName}.es.js`), esCode);
  await writeFile(path.join(distNpmPath, `${packageName}.es.min.js`), esCodeMinified.code);

  // Make type defenitions
  await writeFile(path.join(distNpmPath, `${packageName}.d.ts`), await makeDefinitionsCode());
}

build().then(() => {
  console.log("Done building")
}, err => console.log(err.message, err.stack));


