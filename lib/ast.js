function create_loc(start, end, source) {
  return {
    start, 
    end, 
    source
  };
}

function create_identifier(value, raw, loc) {
  return {
    type: "identifier",
    value,
    raw,
    loc
  };
}

function create_literal(value, raw, loc) {
  return {
    type: "literal",
    value, 
    raw, 
    loc
  };
}

function create_property(key, value, loc) {
  return {
    type: "property",
    key,
    value,
    loc
  };
}

function create_object(child, loc) {
  return {
    type: "object",
    child,
    loc
  };
}

function create_array(child, loc) {
  return {
    type: "array",
    child,
    loc
  };
}

module.exports = {
  create_array,
  create_identifier,
  create_literal,
  create_loc,
  create_object,
  create_property,
}
