let url = "http://universities.hipolabs.com/search?name=";

let input = document.querySelector("input");
let p = document.querySelector("p");
let button = document.querySelector("button");

button.addEventListener("click", University);

async function University() {
    let name = input.value;
    if(name === ""){
        p.innerText = "Please Enter the University Name to Search";
        return;
    }
    p.innerText = "Searching...";
    let spinner = document.createElement("div");
    spinner.className = "load spinner-border text-light";
    spinner.setAttribute("role", "status");
    spinner.innerHTML = `<span class="visually-hidden">Loading...</span>`;
    p.parentNode.insertBefore(spinner, p);

    try {
        let res = await axios.get(url + name);
        let data = res.data;
        spinner.remove();
        if (data.length === 0) {
            p.innerText = "No University Found with this name. Please try again.";
        } else {
            p.innerText = `Name : ${data[0].name}\n`;
            p.innerText += `Country : ${data[0].country}\n`;
            p.innerText += `Website : ${data[0].web_pages[0]}\n`;
        }
    } catch (err) {
        spinner.remove();
        console.log("Error : ", err);
        p.innerText = "Error fetching data. Please try again later.";
    }
}
