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
  const jsDOM = await JSDOM.fromFile('task7b.html', {
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


describe("Task7b",()=>{
  it("should render an element inside a div",()=>{
    let BorderFunction = window.Border.toString()
    let ReturnedElementStr =BorderFunction.split("return")[1]

    let HasPropsJsx=ReturnedElementStr.includes('/*#__PURE__*/React.createElement("div"')&&ReturnedElementStr.includes("props.children")
    
    expect(HasPropsJsx).toBeTruthy()
  })
  
  it("should render an element with a text prop",()=>{
    let TitleFunction = window.Title.toString()
    console.log(TitleFunction)
    let ReturnedElementStr =TitleFunction.split("return")[1]

    let HasJsx=ReturnedElementStr.includes('/*#__PURE__*/React.createElement(');
    let hasProps=ReturnedElementStr.includes("props.text")||ReturnedElementStr.includes("text")
    
    expect(hasProps&&HasJsx).toBeTruthy()
  })
})