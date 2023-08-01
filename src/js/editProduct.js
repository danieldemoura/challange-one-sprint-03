import { createImage } from "./addProductImage.js";
const dropArea = document.querySelector("[data-drop-area]");
const category = document.querySelector("[data-category]");
const product = document.querySelector("[data-product]");
const price = document.querySelector("[data-price]");
const description = document.querySelector("[data-description]");

function populateFormWithProductData() {
    const productData = JSON.parse(localStorage.getItem("product data"));

    category.value = productData.category;
    product.value = productData.name;
    price.value = Number(productData.price).toLocaleString("pt-BR", {style: "currency", currency: "BRL"}).replace("R$", "");
    description.value = productData.info;

    createImage();
    const img = dropArea.querySelector("img");
    const fileSpan = document.querySelector("[data-file-span]");
    const buttonEdit = document.querySelector(".js-submit");
    img.src = productData.image;
    fileSpan.textContent = productData.image;
    buttonEdit.textContent = "Editar produto";
}

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

async function updateProduct(id) {
    const productImage = dropArea.querySelector(".c-file__product-image");

    try {
        const response = await fetch(`https://64c8ebb4b2980cec85c1973a.mockapi.io/api/v1/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                image: productImage.src,
                category: category.value,
                name: product.value,
                price: formatPrice(price.value),
                info: description.value,
            })
        });

        if(response.ok) {
            window.location.href = "../pages/dashboard.html";
        }

    }catch (error) {
        console.log(error);
    }
}

async function getProductData(id) {
    try {
        const response = await fetch(`https://64c8ebb4b2980cec85c1973a.mockapi.io/api/v1/products/${id}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}


async function getProductElementData(index) {
    const productId = document.querySelectorAll("[data-product-id]")[index].dataset.productId;
    const productData =  await getProductData(productId);
    
    localStorage.setItem("product data", JSON.stringify(productData));
    window.location.href = "../pages/add-product.html?edit=true";
}

function configureProductEditButtons() {
    const buttonsEdit = document.querySelectorAll(".js-edit");

    buttonsEdit.forEach((button, index) => [
        button.addEventListener("click", () => {
            getProductElementData(index)
        })
    ])
}

export {
    configureProductEditButtons,
    populateFormWithProductData,
    updateProduct,
}