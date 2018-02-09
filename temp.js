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
        else{
            clone.querySelector("#sold").style.letterSpacing = "2px";
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
    modal.querySelector(".modal-name").style.textAlign = "center";
    modal.querySelector(".modal-name").style.fontSize = "22px";
    modal.querySelector(".modal-image").src = imgLink + data.image + "-sm.jpg";
    modal.querySelector(".modal-image").style.width = "277px";

    if (data.longdescription) {
        modal.querySelector(".modal-description").textContent = data.longdescription;
        modal.querySelector(".modal-description").style.textAlign = "center";
    } else {
        modal.querySelector(".modal-description").textContent = data.shortdescription;
        modal.querySelector(".modal-description").style.textAlign = "center";
    }



    if (data.alcohol != 0) {
        modal.querySelector(".modal-alcohol").textContent = "Alcohol: " + data.alcohol + "%";
        modal.querySelector(".modal-alcohol").style.textAlign = "center";
        
    } else {
        modal.querySelector(".modal-alcohol").textContent = "";
    }
    
    if(data.region != 0){
        modal.querySelector(".modal-region").textContent = "Item region: " + data.region;
        modal.querySelector(".modal-region").style.textAlign = "center";
        modal.querySelector(".modal-region").style.marginBottom = "0";
        modal.querySelector(".modal-region").style.fontSize = "20px";
    }
    
    else{
        modal.querySelector(".modal-region").textContent = "";
    }
    
    if(data.allergens != 0){
        modal.querySelector(".modal-allergens").textContent = "Allergens: " + data.allergens;
        modal.querySelector(".modal-allergens").style.textAlign = "center";
        modal.querySelector(".modal-allergens").style.marginTop = "0";
        modal.querySelector(".modal-allergens").style.fontSize = "20px";
    }
    else{
        modal.querySelector(".modal-allergens").textContent = "";
    }
    
    var starSymbol = String.fromCharCode(9733);
    var emptySymbol = String.fromCharCode(9734);
    
    if(data.stars == 1){
        modal.querySelector(".modal-stars").textContent = "Rating: " + starSymbol + emptySymbol + emptySymbol + emptySymbol +emptySymbol;
        modal.querySelector(".modal-stars").style.fontSize = "25px";
        modal.querySelector(".modal-stars").style.textAlign = "center";
    }
    
    if(data.stars == 2){
        modal.querySelector(".modal-stars").textContent = "Rating: " + starSymbol + starSymbol +emptySymbol +emptySymbol +emptySymbol;
        modal.querySelector(".modal-stars").style.fontSize = "25px";
        modal.querySelector(".modal-stars").style.textAlign = "center";
    }
    
    if(data.stars == 3){
        modal.querySelector(".modal-stars").textContent = "Rating: " + starSymbol + starSymbol + starSymbol +emptySymbol +emptySymbol;
        modal.querySelector(".modal-stars").style.fontSize = "25px";
        modal.querySelector(".modal-stars").style.textAlign = "center";
    }
    
    if(data.stars == 4){
        modal.querySelector(".modal-stars").textContent = "Rating: " + starSymbol + starSymbol + starSymbol + starSymbol + emptySymbol;
        modal.querySelector(".modal-stars").style.fontSize = "25px";
        modal.querySelector(".modal-stars").style.textAlign = "center";
    }
    
    if(data.stars == 5){
        modal.querySelector(".modal-stars").textContent = "Rating: " + starSymbol + starSymbol + starSymbol + starSymbol + starSymbol;
        modal.querySelector(".modal-stars").style.fontSize = "25px";
        modal.querySelector(".modal-stars").style.textAlign = "center";
    }

    const price = modal.querySelector(".modal-price");
    if (data.discount) {
        let newPrice = Math.floor(data.price - (data.price * data.discount / 100));
        if (data.soldout == false) {
            price.textContent = "Now only: " + newPrice + ",-";
            price.style.textAlign = "center";
            price.style.fontSize = "22px";
        } else {
            price.textContent = "Sold Out";
            price.style.textAlign = "center";
            price.style.fontSize = "22px";
        }
    } else {
        price.textContent = "Price: " + data.price + ",-";
        price.style.textAlign = "center";
        price.style.fontSize = "22px";
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
        h2.style.textTransform = "uppercase";
        h2.style.color = "#696969";
        h2.style.fontWeight = "bold";
        h2.style.letterSpacing = "4px";
        h2.style.textAlign = "center";
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
