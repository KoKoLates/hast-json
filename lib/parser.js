const { build_ast } = require("./ast");

function parse(json) {
  return build_ast(json);
}

module.exports = { parse };
