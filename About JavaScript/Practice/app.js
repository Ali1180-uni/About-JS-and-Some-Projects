let h1 = document.querySelector("h1");

function ChangeColor(color,delay){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            h1.style.color = color;
            resolve("Color is " + color);
        },delay);
    });
}

ChangeColor("red",1000)
.then(()=>{
    return ChangeColor("green",1000);
})
.then(()=>{
    return ChangeColor("orange",1000);
})
.then(()=>{
    return ChangeColor("purple",1000);
})
.then(()=>{
    return ChangeColor("lime",1000);
});