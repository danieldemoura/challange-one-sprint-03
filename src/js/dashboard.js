import { validFormField }  from "./validateForm.js";
import { searchProduct } from "./searchProduct.js";
import { displayProducts, renderSearchedProducts } from "./renderDashboardPageProducts.js";
import { configureProductDeletionButtons, closeModal, yesDeleteProduct } from "./deleteProduct.js";
import { configureProductEditButtons } from "./editProduct.js"; 

const search = document.querySelector("[data-search]");
const btnSearch = document.querySelector("[data-btn-search]");
const inputs = document.querySelectorAll(".js-input");
const buttonNot = document.querySelector(".js-modal-not");
const buttonYes = document.querySelector(".js-modal-yes");

displayProducts().then(() => {
    configureProductDeletionButtons();
    configureProductEditButtons();
});

buttonYes.addEventListener("click", yesDeleteProduct);
buttonNot.addEventListener("click", closeModal);

function searchProducts() {
    const products = searchProduct(search.value);
    renderSearchedProducts(products);
    search.value = "";
}

search.addEventListener("keydown", (event) => {
    if(event.key == "Enter" && search.value !== "") {
        searchProducts();
    }
})

btnSearch.addEventListener("click", () => {
    if(search.value !== "") searchProducts();
});

inputs.forEach(input => input.addEventListener("blur", () => validFormField(input)));
