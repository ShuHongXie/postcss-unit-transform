const postcss = require("postcss");

/**
 * @description: 默认配置
 */
const defaultOptions = {
  originUnit: "px", // 转换前单位
  originViewport: 375, // 转换前视口
  transformUnit: "rpx", // 转换后单位
  transformViewport: 414, // 转换后视口
  prefix: /^(\.wb)/, // 适配前缀
  proportion: 1, // 比例
  ellipsisNumber: 4, // 转换后单位的省略位数
};

module.exports = postcss.plugin("postcss-unit-transform", function (opts = {}) {
  opts = Object.assign({}, defaultOptions, opts);
  return function (css, result) {
    css.walkRules(function (rule) {
      if (opts.prefix.test(rule.selector)) {
        // 对每个节点进行一次筛选遍历
        rule.nodes.forEach((node) => {
          if (getUnitRegexp(opts.originUnit).test(node.value)) {
            let value = 0;
            // 区分属性值样式 单独进行处理
            // 1.单个形式 例：font-size: 100px
            // 2.复合形式 例：margin: 100px 200px 20em 30rpx
            if (node.value.split(matchSpaceRule).length > 1) {
              // 分割复合的值
              let splitValue = node.value.split(matchSpaceRule);
              splitValue.forEach((value, index) => {
                if (getUnitRegexp(opts.originUnit).test(value)) {
                  splitValue[index] = `${getTransformedNumber(value, opts)}${
                    opts.transformUnit
                  }`;
                }
              });
              splitValue = splitValue.join(" ");
              // 重写单位值
              node.value = splitValue;
            } else {
              value = getTransformedNumber(node.value, opts);
              node.value = node.value.replace(
                getUnitRegexp(opts.originUnit),
                `${value}${opts.transformUnit}`
              );
            }
          }
        });
      }
    });
  };
});

/**
 * @description: 匹配所有空格部分
 */
const matchSpaceRule = /\s+/gi;

/**
 * @description: 获取计算后的值
 * @param {*} value css属性的值
 * @param {*} opts 基础配置
 * @return {*}
 */
function getTransformedNumber(value, opts) {
  return parseFloat(
    (
      (parseFloat(value) / opts.originViewport) *
      opts.transformViewport *
      opts.proportion
    ).toFixed(opts.ellipsisNumber)
  );
}

/**
 * @description: 排除固定格式 ['']或[""]或url("")的文本
 * @param {*} unit 匹配的计量单位
 * @return {*}
 */
function getUnitRegexp(unit) {
  return new RegExp(
    "\"[^\"]+\"|'[^']+'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)" + unit,
    "g"
  );
}
