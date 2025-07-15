let h1 = document.querySelector("h1");
function changecolor(color,delay){
    return new Promise((resolve,reject)=>{
        let ran = Math.floor(Math.random()*5)+1;
        if(ran < 2){
            reject("Promise is breaked");
        }
        else{
            setTimeout(()=>{
            h1.style.color = color;
            console.log(`Color is ${color}`);
            resolve(`Color is ${color}`);
        },delay);
        }
    });
}

async function Run() {
try{
    await changecolor("Red",1000);
    await changecolor("lime",1000);
    await changecolor("orange",1000);
    await changecolor("green",1000);
}
catch(err){
    console.log("this is Error ", err);
}
console.log("Next time i will generate more");
}