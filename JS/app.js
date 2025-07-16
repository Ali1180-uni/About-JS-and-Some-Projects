let url = "https://catfact.ninja/fact";

async function getAPI(){
    try{
    let res = await fetch(url); // await always use with promises and used in async function
    let data = await res.json(); // using await always in this call otherwise it stopped
    console.log("Data is : ", data.fact);

    let res1 = await fetch(url); 
    let data1 = await res1.json();
    console.log("Data is : ", data1.fact);

    }catch(err){
        console.log("Error ", err);
        console.log("Data not shown");
    }

    console.log("After data");
}