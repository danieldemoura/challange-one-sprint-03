import { renderTitleOfCategory, renderProductsFromEachCategory, renderSearchedProducts, quantityOfProducts, seeAllProducts } from "./src/js/renderHomePageProducts.js";
import { validFormField }  from "./src/js/validateForm.js";
import { searchProduct } from "./src/js/searchProduct.js";

const buttonsViewMore = document.querySelectorAll(".js-view-more");
const search = document.querySelector("[data-search]");
const btnSearch = document.querySelector("[data-btn-search]");
const inputs = document.querySelectorAll(".js-input");


renderTitleOfCategory();
renderProductsFromEachCategory();
quantityOfProducts(5);

setTimeout(renderOpenProductPageButton, 500);

function renderOpenProductPageButton() {
    const productPageLinks = document.querySelectorAll(".js-link");
    const productsId = document.querySelectorAll("[data-product-id]");

    productPageLinks.forEach((link, index) => {
        link.addEventListener("click", () => {
            const id = productsId[index].dataset.productId;
            openProductPage(id);
        })    
    })
}

function openProductPage(id) {
    window.location.href = `./src/pages/product.html?id=${id}`;
}

function searchProducts() {
    searchProduct(search.value).then((products) => {
        console.log(products)
        renderSearchedProducts(products);
        search.value = "";
    });
    
}

buttonsViewMore.forEach((button, index) => {
    let clicked = true;
    
    button.addEventListener("click", () => {
        if(clicked) {
            button.textContent = "Ver menos";
            quantityOfProducts(null);
            seeAllProducts(index);
            setTimeout(renderOpenProductPageButton, 500);
            
            clicked = false;
        } else {
            button.textContent = "Ver tudo";
            quantityOfProducts(5);
            seeAllProducts(index);
            setTimeout(renderOpenProductPageButton, 500);

            clicked = true;
        }
    });
})



search.addEventListener("keydown", (event) => {
    if(event.key == "Enter" && search.value !== "") {
        searchProducts();
    }
})

btnSearch.addEventListener("click", () => {
    if(search.value !== "") searchProducts();
});

inputs.forEach(input => input.addEventListener("blur", () => validFormField(input)));