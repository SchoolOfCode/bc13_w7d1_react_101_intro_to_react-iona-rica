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
  toHaveClass,
});

let document = null;
let window = null;

beforeEach(async () => {
  const jsDOM = await JSDOM.fromFile('task3.html', {
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

describe("Task3", () => {
  it('3a: Should have added a script to the head which loads babel',() => {
    const nodeArry = document.querySelectorAll("script");
    let BabelCDNScriptIsInTheDoc=false
    
    nodeArry.forEach((script)=>{  

      if(script.src==="https://unpkg.com/@babel/standalone/babel.min.js"){
        BabelCDNScriptIsInTheDoc=true;
      }
    });

    expect(BabelCDNScriptIsInTheDoc).toBe(true);

  });

  it('3a: Should Have Attriubute Type "text/babel"',() => {
    const node = document.querySelectorAll("script");
    let TypeTextBabelIsOnScript=false

    node.forEach((script)=>{
      if(script.type==="text/babel"){
        TypeTextBabelIsOnScript=true
      }
    })

    expect(TypeTextBabelIsOnScript).toBe(true)
    
  });

  it('3a: Should use JSX instead of React.createElement',() => {
    let title=window.Title.toString()
    let TitleToStr=title.split("return")[1]
    // ^^ return a string of a function after the word return
    let isJSX=TitleToStr.includes("/*#__PURE__*/")
    // checks is the element is jsx or not
    expect(isJSX).toBe(true)
  
  });
  it('3b: Should render an element with a classname of "container" using jsx ',() => {
    let Title2=document.querySelector(".container")
    console.log(Title2.toString())
    expect(Title2).toBeInTheDocument()
  });
  it('3b: Should render a function named Button using jsx ',() => {
    let Button=window.Button.toString()
    let BtnToStr =Button.split("return")[1]
    // ^^ return a string of a function after the word return
    let isJsxButton=BtnToStr.includes("/*#__PURE__*/")

    // ^^ check if jsx is used
    expect(isJsxButton).toBe(true);
  });
  

})