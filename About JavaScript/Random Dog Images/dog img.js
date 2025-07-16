let url = "https://dog.ceo/api/breeds/image/random";

let btn = document.querySelector("button");
let img = document.querySelector("#im");

btn.addEventListener("click", async ()=>{
    // Fade out
    img.classList.add("fade");
    // Wait for fade-out transition
    setTimeout(async () => {
        let link = await getimg();
        img.setAttribute("src", link);
        // When image loads, fade in
        img.onload = () => { //The purpose of onload here is to ensure the fade-in effect happens only after the new image has fully loaded. When you set a new src for the image, the onload event fires once the image is downloaded and ready to display
            img.classList.remove("fade");
        };
    }, 500); // match transition duration
});

async function getimg(){
    try{
        let link = await axios.get(url);
        console.log(link.data.message)
        return link.data.message;
    }
    catch(err){
        console.log("Error is : ", err);
        return "Data Not found";
    }
}