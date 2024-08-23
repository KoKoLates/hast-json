#!/usr/bin/env node

import { fs } from "fs";
import { program } from "commander";

program
  .option("-f, --file <path>", "JavaScript file to parse")
  .option("-o, --output <path>", "Results output file path")
  .option("-t, --transform <type>", "Transform code with specific logic");

program.parse(process.argv)

const options = program.opts();

if (options.file) {
  const code = fs.readFileSync(options.file, "utf-8");
  const ast = parser.parse(code);
}
