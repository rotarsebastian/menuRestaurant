"use strict"
const template = document.querySelector("#template").content;
const main = document.querySelector("main");
const pListLink = "http://kea-alt-del.dk/t5/api/productlist"; //taking it from API
const catLink = "http://kea-alt-del.dk/t5/api/categories";
const imgLink = "http://kea-alt-del.dk/t5/site/imgs/small/";



function show(data) {
    data.forEach(elem => {
        const section = document.querySelector("#" + elem.category);
        const clone = template.cloneNode(true);
        clone.querySelector("img").src = imgLink + elem.image + "-sm.jpg";
        clone.querySelector("h2").textContent = elem.name;
        clone.querySelector("#price").textContent = "kr. " + elem.price;
        if (elem.soldout == false) {
            clone.querySelector("#sold").textContent = "In Stock";
        }
        clone.querySelector("p").textContent = elem.shortdescription;

        const modal = document.querySelector("#modal");

        /*modal.addEventListener("click", ()=>modal.classList.add("hide"));*/

        const pLink = "http://kea-alt-del.dk/t5/api/product?id=";

        clone.querySelector(".detail-button").addEventListener("click", () => {
            fetch(pLink.elem.id).then(res=> res.json()).then(product => showDetails(product));
        });

        section.appendChild(clone);
    })
}

function showDetails(data){
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-image").textContent = data.image + "-sm.jpg";
    modal.querySelector(".modal-description").textContent = data.longdescription;
    let price = modal.querySelector(".modal-price");
    if(data.discount){
        let newPrice = Math.floor(data.price-(data.price*data.discount/100));
        price.textContent = "Now only: " + newPrice + ",-";   
    }
    else{
        price.textContent = "Price: " + data.price + ",-";
    }
    modal.classList.remove("hide");
}


fetch(catLink).then(result => result.json()).then(data => createCats(data));

function createCats(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        const h2 = document.createElement("h2");
        section.id = category;
        h2.textContent = category;
        section.appendChild(h2);
        main.appendChild(section);
    });
    fetch(pListLink).then(result => result.json()).then(productlist => show(productlist));
}
