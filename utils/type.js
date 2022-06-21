[
  "Null",
  "Undefined",
  "String",
  "Number",
  "Boolean",
  "Function",
  "Date",
  "Array",
  "Object",
  "RegExp",
].forEach((type) => {
  exports[`is${type}`] = (data) =>
    Object.prototype.toString.call(data) === `[object ${type}]`;
});
