function Gcolour(){
    let v1 = Math.floor(Math.random() * 225) + 1;
    let v2 = Math.floor(Math.random() * 225) + 1;
    let v3 = Math.floor(Math.random() * 225) + 1;

    let colour = `rgb(${v1},${v3},${v3})`;
    return colour;
}
function Bcolour(){
    let v1 = Math.floor(Math.random() * 225) + 1;
    let v2 = Math.floor(Math.random() * 225) + 1;
    let v3 = Math.floor(Math.random() * 225) + 1;

    let colour = `rgb(${v1},${v3},${v3})`;
    return colour;
}

let h1 = document.querySelector("h1");
let div = document.querySelector(".con");
let body = document.querySelector("body");

// let rgbv = [v1,v2,v3];

function generate() {
    h1.style.color = Gcolour();
    div.style.backgroundColor = Gcolour();
}

let btn = document.querySelector("button");
btn.addEventListener("click",function(){
    body.style.backgroundColor = Bcolour();
});
btn.addEventListener("click",generate);
btn.addEventListener("click",function(){
    h1.innerText = Gcolour();
});