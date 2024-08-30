function build_ast(node) {
  if (Array.isArray(node)) {
    return {
      type: "Array",
      child: node.map(build_ast),
    };
  }

  if (typeof node === 'object' && node !== null) {
    if (node instanceof Object && !Array.isArray(node)) {
      const child = Object.entries(node).map(([key, value]) => ({
        type: "Property",
        key: {
          type: "Identifier",
          value: key,
          raw: JSON.stringify(key),
        },
        value: build_ast(value),
      }));

      return {
        type: "Object",
        child,
      };
    }

    if (node === null || typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') {
      return {
        type: "Literal",
        value: node,
        raw: JSON.stringify(node),
      };
    }
  }
  throw new Error("Unsupported JSON value");
}

module.exports = { build_ast };
