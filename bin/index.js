#!/usr/bin/env node

const path = require("path");
const { program } = require("commander");
const { ast_parser } = require("../lib/parser");
const { read_file, write_file } = require("../lib/fhandler");

program
  .version("1.0.0")
  .description("command-line interface to parse json into ast")
  .argument("<file>", "json input file")
  .option("-o, --output <output_file>", "ast output file")
  .action((file, options) => {
    const file_path = path.resolve(file);

    read_file(file_path)
      .then(data => {
        const json_object = JSON.parse(data);
        const ast = ast_parser(json_object);

        if (options.output) {
          const output_path = path.resolve(options.output);
          return write_file(output_path, JSON.stringify(ast, null, 2));
        } else {
          console.log(JSON.stringify(ast, null, 2));
        }
      })
      .catch(error => {
        console.error(error.message);
        process.exit(1);
      });
  });

program.parse(process.argv)
