import "./Tab.css"
import Price from "./Price";

function Tab({title,idx}) {
  let oldP = ["999","990","889","654"];
  let newP = ["789","690","589","23S4"];
  let description = ["8000 DPI","Intutive Touch","Programable Keys","Bold Style"]
  return (
    <div className="Tab">
      <h2>{title}</h2>
      <p>{description[idx]}</p>
      <Price oldP={oldP[idx]} newP={newP[idx]} />
    </div>
  );
}

export default Tab;