let GameSeq = [];
let UserSeq = [];
let color = ["red","green","blue","orange"];

let started = false;
let level = 0;

let Allbtn = document.querySelectorAll(".box");
let body = document.querySelector("body");
let p = document.querySelector("p");
let h1 = document.querySelector(".h1");
body.addEventListener("click",function(){
    if(started == false){
        started = true;
        setTimeout(levelUp,1000);
    }
});

function flashbtn(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}
function Usrflashbtn(btn){
    btn.classList.add("usrflash");
    setTimeout(function(){
        btn.classList.remove("usrflash");
    }, 250);
}
function levelUp(){
    UserSeq = [];
    level++;
    p.innerText = `Level ${level}`;
    let ran = Math.floor(Math.random()*4);
    let ranindx = color[ran];
    let ranbtn = document.querySelector(`.${ranindx}`);
    GameSeq.push(ranindx);
    console.log(GameSeq);
    flashbtn(ranbtn);
}

function btnprss(){
    let btn = this;
    Usrflashbtn(this);

    let usercolor = btn.getAttribute("id");
    UserSeq.push(usercolor);
    check(UserSeq.length-1);
}

for(btn of Allbtn){
    btn.addEventListener("click",btnprss);
}

function check(indx){
    if(UserSeq[indx] === GameSeq[indx]){
        if(UserSeq.length == GameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
    p.innerText = `Game Over !\n Your Score is ${level-1}\n Press any Key to Start !`;
    let high = level-1;
    h1.innerText = `High Score : ${high}`;
    reset();
    body.classList.add("rede");
    setTimeout(function(){
        body.classList.remove("rede");
    }, 150);
    }
}

function reset(){
    started = false;
    level = 0;
    GameSeq = [];
    UserSeq = [];
}