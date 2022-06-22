const postcss = require("postcss");
const plugin = require(".");

describe("postcss-unit-transform测试", () => {
  // 私有范围触发
  beforeEach(() => {});

  afterEach(() => {
    console.log("完成测试");
  });

  test("origin Unit to transform", () => {
    const origin = `.wb-image { height: 300px } .test { hegiht: 400px }`;
    const tranfromed = `.wb-image { height: 300rpx } .test { hegiht: 400px }`;
    expect(
      postcss(plugin({ transformViewport: 375 })).process(origin).css
    ).toBe(tranfromed);
  });

  test("match the right perfix", () => {
    const origin = `.z-image { height: 300px } .test { hegiht: 400px }`;
    const tranfromed = `.z-image { height: 300px } .test { hegiht: 400px }`;
    expect(
      postcss(plugin({ transformViewport: 375 })).process(origin).css
    ).toBe(tranfromed);
  });

  test("test unit in the multiple selector value", () => {
    const origin = `.wb-image { height: 300px; margin: 100px 2em 3rem 40rpx }`;
    const tranfromed = `.wb-image { height: 300rpx; margin: 100rpx 2em 3rem 40rpx }`;
    expect(
      postcss(plugin({ transformViewport: 375 })).process(origin).css
    ).toBe(tranfromed);
  });
});

// console.log(postcss(plugin()).process(input).css);
