let div = document.querySelector(".max");
let input = document.querySelector("input");
let  btn = document.querySelector("button");
let ul = document.querySelector("ul");

btn.addEventListener("click",function(event){
let li = document.createElement("li");
let btn2 = document.createElement("button");
btn2.classList.add("Delete");
btn2.innerText = "Delete";

ul.appendChild(li);
    li.innerText = input.value;
    li.appendChild(btn2);
    if(btn2.addEventListener("click",function(){
        li.remove();
    }));
    input.value = "";
});