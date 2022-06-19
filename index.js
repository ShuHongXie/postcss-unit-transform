const postcss = require("postcss");

/**
 * @type {import('postcss').PluginCreator}
 */
// module.exports = plugin;

const plugin = (opts = {}) => {
  // Work with options here
  console.log("start execute");
  debugger;
  return {
    postcssPlugin: "postcss-unit-transform",

    Root(root, postcss) {
      console.log("----root-----");
      console.log(root);
      debugger;
      // Transform CSS AST here
    },

    Declaration(decl, postcss) {
      console.log("-----declaration------");
      console.log(decl);
      // The faster way to find Declaration node
    },

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  };
};
plugin.postcss = true;

console.log("-----");
postcss([plugin])
  .process("a { color: black }", { from: undefined })
  .then((result) => {
    // console.log(result.css);
  });

// module.exports.postcss = true;
