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
        clone.querySelector("#name").textContent = elem.name;

        if (elem.discount == 0) {
            clone.querySelector("#price").textContent = "kr. " + elem.price;
        } else {
            clone.querySelector("#price").textContent = "kr. " + elem.price;
            clone.querySelector("#price").style.textDecoration = "line-through";
            
           
            
            clone.querySelector("#newPrice").textContent = "kr. " + Math.floor(elem.price - (elem.price * elem.discount / 100)); 
        }


        if (elem.soldout == false) {
            clone.querySelector("#sold").textContent = "";
        }
        if (elem.vegetarian == true && elem.category != "drinks") {
            clone.querySelector("#veggie").textContent = "- vegetarian -";
        }
        else{
            clone.querySelector("#veggie").textContent = "";
        }
        clone.querySelector("#description").textContent = elem.shortdescription;

        const modal = document.querySelector(".modal");

        /*modal.addEventListener("click", ()=>modal.classList.add("hide"));*/

        const pLink = "http://kea-alt-del.dk/t5/api/product?id=";



        clone.querySelector(".detail-button").addEventListener("click", () => {
            fetch(pLink + elem.id).then(res => res.json()).then(product => showDetails(product));
        });

        section.appendChild(clone);
    })
}

function showDetails(data) {
    const modal = document.querySelector(".modal");
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-image").src = imgLink + data.image + "-sm.jpg";

    if (data.longdescription) {
        modal.querySelector(".modal-description").textContent = data.longdescription;
    } else {
        modal.querySelector(".modal-description").textContent = data.shortdescription;
    }



    if (data.alcohol != 0) {
        modal.querySelector(".modal-alcohol").textContent = "Alcohol: " + data.alcohol + "%";
    } else {
        modal.querySelector(".modal-alcohol").textContent = "";
    }

    const price = modal.querySelector(".modal-price");
    if (data.discount) {
        let newPrice = Math.floor(data.price - (data.price * data.discount / 100));
        if (data.soldout == false) {
            price.textContent = "Now only: " + newPrice + ",-";
        } else {
            price.textContent = "Sold Out";
        }
    } else {
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
        h2.style.textTransform = "capitalize";
        section.appendChild(h2);
        main.appendChild(section);
    });
    fetch(pListLink).then(result => result.json()).then(productlist => show(productlist));
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
    const modal = document.querySelector(".modal");
    modal.classList.add("hide");

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    let modal = document.querySelector(".modal");
    if (event.target == modal) {
        modal.classList.add("hide");
    }
}

// When the user clicks Esc button, close the modal
document.onkeydown = function (evt) {
    evt = evt || window.event;
    let modal = document.querySelector(".modal");
    if (evt.keyCode == 27) {
        modal.classList.add("hide");
    }
};
