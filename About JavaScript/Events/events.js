// let div = document.querySelector("div");
// let form = document.querySelector("form");

// div.addEventListener("keydown",function(event){
//     console.log(event.code);
//     if(event.code == "ArrowUp"){
//         console.log(event.code);
//         div.style.marginBottom += 3;
//     }
//     else if(event.code == "ArrowDown"){
//         console.log(event.code);
//         div.style.marginTop += 3;
//     }
//     else if(event.code == "ArrowLeft"){
//         console.log(event.code);
//         div.style.marginRight += 3;
//     }
//     else if(event.code == "ArrowDown"){
//         console.log(event.code);
//         div.style.marginLeft += 3;
//     }
// });

// div.addEventListener("keydown",function(event){
//     console.log(event);
// });

// form.addEventListener("submit",function(event){
//     event.preventDefault(); // it is used to stop the action which done by default when the form is execute
//     let input = document.querySelector("input");
//     alert("form Submit and Text is " + input.value);
// });


let p = document.querySelector("p");
let inp = document.querySelector("input");
let btn = document.querySelector("button");

inp.addEventListener("input",function(){
    p.innerText = inp.value;
});

btn.addEventListener("click",function(){
    p.style.color = "red";
});