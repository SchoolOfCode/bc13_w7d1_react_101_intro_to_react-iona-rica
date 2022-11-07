const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let document = null;
let window = null;

beforeEach(async () => {
  const jsDOM = await JSDOM.fromFile("task1.html", {
    runScripts: "dangerously",
    resources: "usable",
    url: `file://${__dirname}/`,
    features: {
      FetchExternalResources: ["script"],
      ProcessExternalResources: ["script"],
    },
  });
  await new Promise((res) => {
    jsDOM.window.onload = res;
  });
  document = jsDOM.window.document;
  window = jsDOM.window;
});

afterEach(() => {
  document = null;
  window = null;
});

describe("Task1", () => {
  it("Should load React Dev CDN Scripts Tag", () => {
    const nodeArry = document.querySelectorAll("script");
    let React17CDNScriptIsInTheDoc = false;
    let ReactDOM17CDNScriptIsInTheDoc = false;

    nodeArry.forEach((script) => {
      if (
        script.src === "https://unpkg.com/react@18/umd/react.development.js"
      ) {
        React17CDNScriptIsInTheDoc = true;
      }
      if (
        script.src ===
        "https://unpkg.com/react-dom@17/umd/react-dom.development.js"
      ) {
        ReactDOM17CDNScriptIsInTheDoc = true;
      }
    });

    expect(React17CDNScriptIsInTheDoc).toBe(true);
    expect(ReactDOM17CDNScriptIsInTheDoc).toBe(true);
  });

  it("should have a class called `.container`", () => {
    const Node = document.querySelector(".container");
    expect(window.ReactDOM.findDOMNode(Node).className).toBe("container");
  });

  it("should be a `div` element tag", () => {
    const Node = document.querySelector(".container");
    expect(window.ReactDOM.findDOMNode(Node).tagName).toBe("DIV");
  });

  it("should have text `Hello World`", () => {
    const Node = document.querySelector(".container");
    expect(window.ReactDOM.findDOMNode(Node).textContent).toBe("Hello World");
  });
});
