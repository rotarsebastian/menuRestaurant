"use strict"
const template = document.querySelector("template").content;
const main = document.querySelector("main");
const link = "http://kea-alt-del.dk/t5/api/productlist"; //taking it from API
const imglink = "http://kea-alt-del.dk/t5/site/imgs";

fetch(link).then(result=>result.json()).then(productlist=>show(productlist));

function show(data){
    data.forEach(elem=>{
        console.log(elem.name);
        const clone = template.cloneNode(true);
        clone.querySelector("img").src = "http://kea-alt-del.dk/t5/site/imgs/small/" + elem.image + "-sm.jpg";
        clone.querySelector("h2").textContent = elem.name;
        clone.querySelector("p").textContent = elem.shortdescription;
        main.appendChild(clone);
    })
}