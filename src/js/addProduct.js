import { dropImage, getFileFromComputer, prodImage } from "./addProductImage.js";
import { generateProductCode } from "./generateProductCode.js";
import { validFormField }  from "./validateForm.js";
import { populateFormWithProductData, updateProduct } from "./editProduct.js";

const inputs = document.querySelectorAll(".js-input");
const fileButton = document.querySelector("[data-file-button]");
const inputFile = document.querySelector("[data-file]");
const dropArea = document.querySelector("[data-drop-area]");
const category = document.querySelector("[data-category]");
const product = document.querySelector("[data-product]");
const price = document.querySelector("[data-price]");
const description = document.querySelector("[data-description]");
const formAddProduct = document.querySelector("[data-add-product]");

function formatPrice(price) {
    const numberHasMoreThan6DecimalPlacesWithComma = price.length > 6;

    if(numberHasMoreThan6DecimalPlacesWithComma) {
        const pointRemoved = price.replace(".", "");
        const formmattedPrice = pointRemoved.replace(",", ".");

        return formmattedPrice;
    } else {
        return price.replace(",", ".");
    }
}

async function addProduct() {
    try {
        const response = await fetch("https://64c8ebb4b2980cec85c1973a.mockapi.io/api/v1/products", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                image: prodImage,
                category: category.value,
                name: product.value,
                price: formatPrice(price.value),
                info: description.value,
                code: await generateProductCode(),
            })
        });

        if(response.ok) {
            window.location.reload();
        }

    } catch (error) {
        console.log(error)
    }
}

window.addEventListener("load", () =>{ 
    const parameter = new URLSearchParams(window.location.search);
    const edit = parameter.get("edit");

    if(edit) { 
        populateFormWithProductData();
        const productData = JSON.parse(localStorage.getItem("product data"));

        formAddProduct.addEventListener("submit", async (event) => {
            event.preventDefault();
            updateProduct(productData.id);
        });

    } else {
        formAddProduct.addEventListener("submit", (event) => {
            event.preventDefault();
            addProduct();
        })
    }
})

inputs.forEach(input => input.addEventListener("blur", () => validFormField(input)));
fileButton.addEventListener("click", () => inputFile.click());

inputFile.addEventListener("change", event => getFileFromComputer(event));

price.addEventListener("input", () => {
    price.value = price.value.replace(/[^0-9\.\,]/g, "");
})

dropArea.addEventListener("dragover", event => {
    event.preventDefault();
    dropArea.classList.add("is-drag-over");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("is-drag-over");
});

dropArea.addEventListener("drop", (event) => { 
    dropImage(event); 
});
