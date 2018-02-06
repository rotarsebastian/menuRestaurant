var i = 1;
if (i == 1) {
    let coursesContainer = document.querySelector("#courses");
    let template = document.querySelector("#coursesTemplate").content;

    let myCopy = template.cloneNode(true);
    // Get the modal
    var modal = myCopy.querySelector("#myModal");

    // Get the button that opens the modal
    var btn = myCopy.querySelector("#myBtn");

    // Get the <span> element that closes the modal
    var span = myCopy.querySelector("#close");

    let image = myCopy.querySelector("img");
    let product = myCopy.querySelector("h2");
    let description = myCopy.querySelector("h1");
    let price = myCopy.querySelector("#price");
    let sold = myCopy.querySelector("#sold");
    let discount = myCopy.querySelector("#discount");
    let alcohol = myCopy.querySelector("#alcohol");
    let allergens = myCopy.querySelector("#allergens");

    image.src = "imgs/medium/caviarbruschetta-md.jpg";
    product.textContent = "Caviar bruschetta ";
    description.textContent = "Til denne dejlige Bruschetta anvender vi kun de dejligste sibiriske Caviar. Caviarerne presses ud..";
    price.textContent = "49 kr ";
    sold.textContent = "In Stock";
    discount.textContent = "";
    alcohol.textContent = "";
    allergens.textContent = "No allergens";


    coursesContainer.appendChild(myCopy);

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    i++;
}

if (i == 2) {
    let coursesContainer = document.querySelector("#courses");
    let template = document.querySelector("#coursesTemplate").content;

    let myCopy = template.cloneNode(true);
    // Get the modal
    var modal = myCopy.querySelector("#myModal");
    
    // Get the button that opens the modal
    var btn = myCopy.querySelector("#myBtn");

    // Get the <span> element that closes the modal
    var span = myCopy.querySelector("#close");

    let image = myCopy.querySelector("img");
    let product = myCopy.querySelector("h2");
    let description = myCopy.querySelector("h1");
    let price = myCopy.querySelector("#price");
    let sold = myCopy.querySelector("#sold");
    let discount = myCopy.querySelector("#discount");
    let alcohol = myCopy.querySelector("#alcohol");
    let allergens = myCopy.querySelector("#allergens");
    //let modalContent = myCopy.querySelector("#text-modal");

    image.src = "imgs/medium/baltiskbondesuppe-md.jpg";
    product.textContent = "Baltic farmers Soup";
    description.textContent = "Baltisk bondesuppe er en solid starter. Godt til dig, der skal drikke godt igennem und";
    price.textContent = "79 kr ";
    sold.textContent = "In Stock";
    discount.textContent = "";
    alcohol.textContent = "";
    allergens.textContent = "No allergens";
    //modalContent.textContent = "Ddada";


    coursesContainer.appendChild(myCopy);

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    i++;


}
