#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const { parse } = require("../lib/parser");


program
  .version("1.0.0")
  .description("Parse a JOSN file into an abstract syntax tree")
  .argument("<file>", "path to JSON file")
  .action((file) => {
    try {
      const file_path = path.resolve(file);
      const json_content = fs.readFileSync(file_path, "utf-8");
      const json_object = JSON.parse(json_content);
      const ast = parse(json_object);

      console.log(JSON.stringify(ast, null, 2));
    } catch (error) {
      console.error("Error", error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
