const { ast_parser } = require("../lib/parser");

test("parses a simple json object", () => {
  const json_object = { a: 1, b: "test", c: null, d: true };
  const expected = {
    type: "object",
    child: [
      {
        type: "property",
        key: { type: "identifier", value: "a"},
        value: { type: "literal", value: 1 } 
      },
      {
        type: "property",
        key: { type: "identifier", value: "b"},
        value: { type: "literal", value: "test"}
      },
      {
        type: "property",
        key: { type: "identifier", value: "c"},
        value: { type: "literal", value: null } 
      },
      {
        type: "property",
        key: { type: "identifier", value: "d"},
        value: { type: "literal", value: true}
      },
    ]
  };
  expect(ast_parser(json_object)).toEqual(expected);
});
