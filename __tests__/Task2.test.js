const { fireEvent } = require("@testing-library/dom");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let document = null;
let window = null;

beforeEach(async () => {
  const jsDOM = await JSDOM.fromFile("task2.html", {
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

describe("Task2", () => {
  it('should have a class called "button"', () => {
    const node = document.querySelector(".button");
    expect(window.ReactDOM.findDOMNode(node).className).toBe("button");
  });

  it("should create a button element", () => {
    const node = document.querySelector("button");
    expect(window.ReactDOM.findDOMNode(node).tagName).toBe("BUTTON");
  });

  it("should have an onClick attribute that calls a function handleClick", () => {
    // const node = document.querySelector('button');
    let handleClickStr = window.Button.toString();
    let BtnToStr = handleClickStr.split("return")[1];
    // ^^ return a string of a function after the word return
    let ReactCreateElementInStr = BtnToStr.includes(`React.createElement`);
    let onCLickInStr = BtnToStr.includes("onClick");

    let wordAreInString = ReactCreateElementInStr && onCLickInStr;
    // ^^ check if React.creactElement and onClick and handle click are present in the string
    expect(wordAreInString).toBe(true);
  });

  it("alerts on handle click", async () => {
    const node = document.querySelector("button");
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    fireEvent.click(node);
    expect(alertMock).toHaveBeenCalledTimes(1);
  });
});
