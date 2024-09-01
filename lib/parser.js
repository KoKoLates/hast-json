/**
 * 
 */
function ast_parser(json_object) {
  if (json_object === null) {
    return {
      type: "literal",
      value: null
    };
  }

  if (typeof json_object === "object" && !Array.isArray(json_object)) {
    return {
      type: "object",
      child: Object.entries(json_object).map(([key, value]) => ({
        type: "property",
        key: {
          type: "identifier",
          value: key
        },
        value: ast_parser(value)
      }))
    };
  } else if (Array.isArray(json_object)) {
    return {
      type: "array",
      child: json_object.map(item => ast_parser(item))
    };
  } else {
    return {
      type: "literal",
      value: json_object
    };
  }
}

module.exports = { ast_parser };
