const postcss = require("postcss");
const plugin = require(".");

const origin = ".wb-image {  margin: 100rpx 2em 3rem 400px }";
console.log(postcss(plugin({ transformViewport: 414 })).process(origin).css);
