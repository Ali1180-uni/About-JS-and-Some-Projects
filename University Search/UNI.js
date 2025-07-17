let url = "http://universities.hipolabs.com/search?name=";

let input = document.querySelector("input");
let p = document.querySelector("p");
let button = document.querySelector("button");
// let img  = document.querySelector(".load");

// async function name() {
//     let res = await axios.get(url);
//     console.log(res.data);
// }

button.addEventListener("click", University);

async function University() {
    let name = input.value;
    if(name === ""){
        p.innerText = "Please Enter the University Name to Search";
        return;
    }
    // Show loading GIF centered above the result
    p.innerText = "Searching...";
    let img = document.createElement("img");
    img.classList.add("load");
    img.src = "loading.gif";
    // Insert loading gif before the <p> element
    p.parentNode.insertBefore(img, p);
    try {
        let res = await axios.get(url + name);
        let data = res.data;
        img.remove();
        if (data.length === 0) {
            p.innerText = "No University Found with this name. Please try again.";
        } else {
            p.innerText = `Name : ${data[0].name}\n`;
            p.innerText += `Country : ${data[0].country}\n`;
            p.innerText += `Website : ${data[0].web_pages[0]}\n`;
        }
    } catch (err) {
        img.remove();
        console.log("Error : ", err);
        p.innerText = "Error fetching data. Please try again later.";
    }
}