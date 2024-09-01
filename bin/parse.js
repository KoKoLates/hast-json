#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

function parseJsonAst(jsonObject) {
  if (jsonObject === null) {
    return {
      type: 'Literal',
      value: null
    };
  }

  if (typeof jsonObject === 'object' && !Array.isArray(jsonObject)) {
    return {
      type: 'Object',
      children: Object.entries(jsonObject).map(([key, value]) => ({
        type: 'Property',
        key: {
          type: 'Identifier',
          value: key
        },
        value: parseJsonAst(value)
      }))
    };
  } else if (Array.isArray(jsonObject)) {
    return {
      type: 'Array',
      children: jsonObject.map(item => parseJsonAst(item))
    };
  } else if (typeof jsonObject === 'string') {
    return {
      type: 'Literal',
      value: jsonObject
    };
  } else {
    return {
      type: 'Literal',
      value: jsonObject
    };
  }
}

program
  .argument('<file>', 'JSON input file')
  .option('-o, --output <outputFile>', 'AST output file')
  .action((file, options) => {
    const filePath = path.resolve(file);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
      }

      try {
        const jsonObject = JSON.parse(data);
        const ast = parseJsonAst(jsonObject);

        if (options.output) {
          const outputPath = path.resolve(options.output);
          fs.writeFile(outputPath, JSON.stringify(ast, null, 2), 'utf8', err => {
            if (err) {
              console.error(`Error writing output file: ${err.message}`);
              process.exit(1);
            }
            console.log(`AST written to ${outputPath}`);
          });
        } else {
          console.log(JSON.stringify(ast, null, 2));
        }
      } catch (err) {
        console.error(`Error parsing JSON: ${err.message}`);
        process.exit(1);
      }
    });
  });

program.parse(process.argv);
