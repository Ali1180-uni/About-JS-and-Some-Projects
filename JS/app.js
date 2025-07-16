let url = "https://catfact.ninja/fact";

async function getAPI(){
    try{
        let res = await axios.get(url);
        console.log("The response is: " , res.data.fact);
    }
    catch(err){
        console.log("Error is : ", err);
    }
}