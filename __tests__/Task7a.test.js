const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const {
  toBeInTheDocument,
  toBeEmptyDOMElement,
  toHaveStyle,
  toHaveAttribute,
  toHaveClass,
} = require('@testing-library/jest-dom/matchers');

const {default: userEvent} = require('@testing-library/user-event');
const { Script } = require("vm");
const { getByText } = require("@testing-library/dom");


expect.extend({
  toBeInTheDocument,
  toBeEmptyDOMElement,
  toHaveStyle,
  toHaveAttribute,
  toHaveClass
});

let document = null;
let window = null;

beforeEach(async () => {
  const jsDOM = await JSDOM.fromFile('task7a.html', {
    runScripts: 'dangerously',
    resources: 'usable',
    url: `file://${__dirname}/`,
    features: {
      FetchExternalResources: ['script'],
      ProcessExternalResources: ['script'],
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


describe("Task7a",()=>{

  it('should render a button with inline styles',() => {
    const NodeButton = document.querySelector("button")
    console.log(NodeButton.style.length)
    expect(NodeButton.style.length).toBeGreaterThan(0)
  });

})