const postcss = require("postcss");
const { isRegExp, isString } = require("./utils/type");

// 排除固定格式
function getUnitRegexp(unit) {
  return new RegExp(
    "\"[^\"]+\"|'[^']+'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)" + unit,
    "g"
  );
}

/**
 * @type {import('postcss').PluginCreator}
 */
const defaultOptions = {
  originUnit: "px", // 转换前单位
  originViewport: 375, // 转换前视口
  transformUnit: "rpx", // 转换后单位
  transformViewport: 400, // 转换后视口
  prefix: /^(\.wb)/,
  ellipsisNumber: 4, // 转换后单位的省略位数
};

const plugin = (opts = {}) => {
  opts = Object.assign({}, defaultOptions, opts);
  // Work with options here
  console.log("start execute");
  debugger;
  return {
    postcssPlugin: "postcss-unit-transform",
    Root(root, postcss) {
      console.log("----root-----");
      // console.log(JSON.stringify(root));
      root.walkRules((rule) => {
        console.log(JSON.stringify(rule));
        // 判断当前是否在转换范围内
        if (opts.prefix.test(rule.selector)) {
          // 对每个节点进行一次筛选遍历
          rule.nodes.forEach((node) => {
            if (getUnitRegexp(opts.originUnit).test(node.value)) {
              // 计算出转换后大小
              const transformedNumber = parseFloat(
                (
                  (parseFloat(node.value) / opts.originViewport) *
                  opts.transformViewport
                ).toFixed(opts.ellipsisNumber)
              );
              // 重写单位值
              node.value = node.value.replace(
                getUnitRegexp(opts.originUnit),
                `${transformedNumber}${opts.transformUnit}`
              );
            }
          });
        }
      });
    },

    // Declaration(decl, postcss) {
    //   console.log("-----declaration------");
    //   // console.log(JSON.stringify(decl));
    // },
  };
};

// console.log("-----");
// postcss([plugin({})])
//   .process(".wb-image { color: black }; div { font-size: 37.5px }")
//   .then((result) => {
//     console.log("----result----");
//     console.log(result.css);
//   });
module.exports = plugin;

module.exports.postcss = true;
