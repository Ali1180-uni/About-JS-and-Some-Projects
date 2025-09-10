import './App.css'
// import { sum } from './helper';
import Count from './counter';
import ToDo from './To-do';
import Lottary from './Lottary';
import { Ticket } from './Ticket';
import Counter from "./CounterUseEffect()"
import Joke from "./JokeRandomApi"

function App(){
  return (
    <div>
      <Joke />
    </div>
  );
}
// function App(){
//   let WinningFunc = (arr) => {
//     // return sum(arr) === 15;
//     return arr.every((num)=> num === arr[0]);
//   }
//   return (
//     <div>
//       <Lottary n={3} winFunc={WinningFunc}/>
//     </div>
//   );
// }

export default App
