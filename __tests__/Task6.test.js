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
  const jsDOM = await JSDOM.fromFile('task6.html', {
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


describe("Task6",()=>{

  it('should render the first input checkbox with a boolean of true  as a prop ',() => {
    let CheckBoxFunction = window.CheckBox.toString()
    console.log(CheckBoxFunction)
    let ReturnedElementStr =CheckBoxFunction.split("return")[1]
    let HasPropsJsx=ReturnedElementStr.includes('type: "checkbox"')&&ReturnedElementStr.includes("checked: props.checked")


    // const NodeInput = document.querySelectorAll("input")
    expect(HasPropsJsx).toBe(true)
  });

})