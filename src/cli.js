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

  if (options.transform) {
    const transform_ast = transformer.apply_transform(ast, options.transform);
    const new_code = transformer.generate_code(transform_ast);

    if (options.output) {
      fs.writeFileSync(options.output, new_code, "utf-8");
      console.log("Output written to", options.output);
    } else {
      console.log(new_code);
    }
  } else {
    console.log(Json.stringify(ast, null, 2));
  }

}
