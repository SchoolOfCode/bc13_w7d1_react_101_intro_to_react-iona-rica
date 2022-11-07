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
  const jsDOM = await JSDOM.fromFile('task4.html', {
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


describe("Task4",()=>{

  it('should render an Li list with the following text ["Milk","Eggs","Flour"]',() => {
    let LiFunction = window.ListItem.toString()
    let ReturnedElementStr =LiFunction.split("return")[1]
    // ^^ return a string of a function after the word return
    let isJsxLi=ReturnedElementStr.includes("/*#__PURE__*/")
    let hasPropsText=ReturnedElementStr.includes("props.text")||ReturnedElementStr.includes("text)")
    
    expect(isJsxLi&&hasPropsText).toBe(true)

  });

})