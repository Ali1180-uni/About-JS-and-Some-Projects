let url = "https://catfact.ninja/fact";

let btn = document.querySelector("button");
let p = document.querySelector("p");

btn.addEventListener("click", async ()=>{ // always use async in this eventlister who use the async function
    let result = await getAPI(); // also write await at here for async
    p.innerText = result;
});

async function getAPI(){
    try{
        let res = await axios.get(url);
        return res.data.fact;
    }
    catch(err){
        console.log("Error is : ", err);
        return "Data Not found";
    }
}