let url = "https://catfact.ninja/fact";

fetch(url).then((res) => {
    return res.json();
}).then((data) => { // now this second then is the then of res.json which show data
    console.log("data is ", data.fact); //.fact is just the data in this api which might be different in others
    return fetch(url);
}).then((res) => {
    return res.json();
}).then((data2) => {
    console.log("data 2 ", data2.fact);
}).catch((err) => {
    console.log("Error is ", err);
});