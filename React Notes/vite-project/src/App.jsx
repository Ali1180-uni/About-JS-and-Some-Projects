import './App.css'
// import Tab from './Tab';
// import Msg from './msgBox';
// import Products from './ProductCards';


function App() {
  function one(event){
    console.log("Button Clicked");
    event.preventDefault();
  }
  function one1(){
    console.log("Button Hover");
  }
  function one2(){
    console.log("button double");
  }
  return (
    <div>
      <button onClick={one}>Click me!</button>
      <button onMouseOver={one1}>Hover me!</button>
      <button onDoubleClick={one2}>Double me!</button>
    </div>
  );
}

export default App
