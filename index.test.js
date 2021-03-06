const stylelint = require("stylelint");

describe("stylelint-config-react-native-css-modules", () => {
  it("does not allow vendor prefixes in values", () => {
    const css = ".test { display: -webkit-flex; }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(true);
        expect(result.output.includes("value-no-vendor-prefix")).toBe(true);
      });
  });

  it("does not allow vendor prefixes in properties", () => {
    const css = ".test { -webkit-transform: scale(1); }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(true);
        expect(result.output.includes("property-no-vendor-prefix")).toBe(true);
      });
  });

  it("does not allow vendor prefixes in at-rules", () => {
    const css =
      ".test { @-webkit-keyframes() { 0% { color: blue } 100% { color: red; } }  }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(true);
        expect(result.output.includes("at-rule-no-vendor-prefix")).toBe(true);
      });
  });

  it("does not allow vendor prefixes in media features", () => {
    const css =
      "@media (-webkit-min-device-pixel-ratio: 1) { .foo { color: blue; } }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(true);
        expect(
          result.output.includes("media-feature-name-no-vendor-prefix")
        ).toBe(true);
      });
  });

  it("does not allow unknown properties", () => {
    const css = ".test { word-wrap: break-word; }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(true);
        expect(
          result.output.includes("react-native/css-property-no-unknown")
        ).toBe(true);
      });
  });

  it("warns for id selectors", () => {
    const css = "#test { flex: 1 }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("id selectors are ignored")).toBe(true);
      });
  });

  it("warns for type selectors", () => {
    const css = "input { flex: 1 }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("type selectors are ignored")).toBe(true);
      });
  });

  it("warns for universal selectors", () => {
    const css = "* { flex: 1 }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("universal selectors are ignored")).toBe(
          true
        );
      });
  });

  it("warns for combinator selectors", () => {
    const css = ".foo + .bar { flex: 1 }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("combinator selectors are ignored")).toBe(
          true
        );
      });
  });

  it("warns for attribute selectors", () => {
    const css = "[type='text'] { flex: 1 }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("attribute selectors are ignored")).toBe(
          true
        );
      });
  });

  it("warns for qualifying type selectors", () => {
    const css = "a.link { flex: 1 }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("type selectors are ignored")).toBe(true);
      });
  });

  it("warns for pseudo classes", () => {
    const css = ".foo:before { flex: 1 }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(
          result.output.includes("pseudo class selectors are ignored")
        ).toBe(true);
      });
  });

  it("does not warn for ICSS :export pseudo-selector", () => {
    const css = ":export { color: red; }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output).toBe("");
      });
  });

  it("does not warn for :root pseudo-selector", () => {
    const css = ":root { --my-color: red; }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output).toBe("");
      });
  });

  it("warns for font-weights that are not compatible with Android", () => {
    const css = ".foo { font-weight: 300 }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("font-weight value")).toBe(true);
      });
  });

  it("warns for incompatible @-rules", () => {
    const css =
      ".foo { @keyframes() { 0% { color: blue } 100% { color: red; } } }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("the @-rule is ignored")).toBe(true);
      });
  });

  it("warns for @charset", () => {
    const css = '@charset "utf-8";';
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("the @-rule is ignored")).toBe(true);
      });
  });

  it("warns for incompatible units", () => {
    const css = ".foo { font-size: 1ch; }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(
          result.output.includes(
            "the unit is ignored by React Native CSS modules"
          )
        ).toBe(true);
      });
  });

  it("warns for linear-gradient function", () => {
    const css =
      ".foo { background: linear-gradient(to right, red 5%, green 30%, yellow 75%); }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("the function is ignored by")).toBe(true);
      });
  });

  it("warns for radial-gradient function", () => {
    const css = ".foo { background: radial-gradient(yellow, red); }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("the function is ignored by")).toBe(true);
      });
  });

  it("warns for repeating-linear-gradient function", () => {
    const css =
      ".foo { background: repeating-linear-gradient(gold 15%, orange 30%); }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("the function is ignored by")).toBe(true);
      });
  });

  it("warns for repeating-radial-gradient function", () => {
    const css =
      ".foo { background: repeating-radial-gradient(yellow 20%, red 40%); }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("the function is ignored by")).toBe(true);
      });
  });

  it("warns for calc function", () => {
    const css = ".foo { width: calc(100% - 80px); }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("the function is ignored by")).toBe(true);
      });
  });

  it("warns for url function", () => {
    const css = ".foo { background: url(/images/image.png); }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("the function is ignored by")).toBe(true);
      });
  });

  it("warns for translate3d function", () => {
    const css = ".foo { transform: translate3d(60px,0,0); }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("the function is ignored by")).toBe(true);
      });
  });

  it("warns for rotate3d function", () => {
    const css = ".foo { transform: rotate3d(1, 0, 0, 60deg); }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("the function is ignored by")).toBe(true);
      });
  });

  it("warns for matrix3d function", () => {
    const css =
      ".foo { transform: matrix3d(0.583333, 0.186887, 0.79044, 0, -0.52022, 0.833333, 0.186887, 0, -0.623773, -0.52022, 0.583333, 0, 0, 0, 0, 1); }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("the function is ignored by")).toBe(true);
      });
  });

  it("warns for scale3d function", () => {
    const css = ".foo { transform: scale3d(3, 3, 1); }";
    expect.assertions(2);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
        expect(result.output.includes("the function is ignored by")).toBe(true);
      });
  });

  it("allows pseudo and type selectors (ignored by React Native CSS modules, but can be used for web when creating hybrid apps)", () => {
    const css =
      ".test:hover { color: blue; } .test input[type=text] { color: red; }";
    expect.assertions(1);

    return stylelint
      .lint({
        code: css,
        formatter: "string",
        config: {
          extends: "./index"
        }
      })
      .then(result => {
        expect(result.errored).toBe(false);
      });
  });
});
