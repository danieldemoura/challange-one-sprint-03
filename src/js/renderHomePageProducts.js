const headerTitle = document.querySelectorAll("[data-header-title]");

async function getProductData(name) {
    try {
        const response = await fetch("https://64c8ebb4b2980cec85c1973a.mockapi.io/api/v1/products");
        const products = await response.json();

        const productsByCategory = products.filter(product => {
            return product.category === name;
        })

        if(name != "") {
            return productsByCategory;

        } else {
            return products;
        }

    }catch (error) {
        console.log(error);
    }
}

function renderTitleOfCategory() {
    headerTitle.forEach(header => {
        header.textContent = header.dataset.headerTitle;
    })
}

function renderProductsFromEachCategory() {
    const listProducts = document.querySelectorAll("[data-list-products]");

    listProducts.forEach(async (list, index) => {
        const categoryName = list.dataset.listProducts;
        const category = await getProductData(categoryName);
        list.innerHTML = renderProducts(category);
    });

}

async function seeAllProducts(index) {
    const listProducts = document.querySelectorAll("[data-list-products]");

    const categoryName = listProducts[index].dataset.listProducts;
    const category = await getProductData(categoryName);
    listProducts[index].innerHTML = renderProducts(category);
}

function hiddenProductOfCategory(yes, category) {    
    const parent = category.parentNode;

    if(yes) {
        parent.classList.add("is-hidden");
    } else {
        parent.classList.remove("is-hidden");
    }
}

let productLimit = null;
function quantityOfProducts(quantity) {
    productLimit = quantity;
}

function renderProducts(products) {
    const formattedNumber = (string) => Number(string).toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
    let list = "";

    for(let index = 0; index < products.length; index++) {
        list += `
        <article class="c-product" data-product-id="${products[index].id}">
            <figure class="c-product__wrapper">
                <img class="c-product__image" src="${products[index].image}" alt="Produto">
                <figcaption class="c-product__info">
                    <h3 class="c-product__name">${products[index].name}</h3>
                    <span class="c-product__price">${formattedNumber(products[index].price)}</span>
                </figcaption>
                <span class="c-product__view-detail js-link">Ver produto</span>
            </figure>
        </article>
        `;

        if(productLimit == index) break; 
    }

    return list;
}


async function renderSearchedProducts(json) {
    const listProducts = document.querySelectorAll("[data-list-products]");
    const products = await json;

    listProducts.forEach(list => {
        list.innerHTML = "";
        hiddenProductOfCategory(true, list);

        products.forEach(product => {
            const productCategoryEqualsListCategory = list.dataset.listProducts == product.category;
            if(productCategoryEqualsListCategory) {
                list.innerHTML += renderProducts([product]);
                hiddenProductOfCategory(false, list);
            } 
        })
    })
}


export {
    renderTitleOfCategory, 
    renderProductsFromEachCategory,
    renderSearchedProducts,
    quantityOfProducts,
    getProductData,
    seeAllProducts,
}