const listProducts = document.querySelector("[data-list-products]");

async function getProductData() {
    try {
        const response = await fetch("https://64c8ebb4b2980cec85c1973a.mockapi.io/api/v1/products");
        const products = await response.json();

        return products;
    }catch (error) {
        console.log(error);
    }
}

function displayProducts() {
    return new Promise(async (resolve, reject) => {
        try {
            const products = await getProductData();
            products.forEach((product) => {
                listProducts.innerHTML += renderProductsOfDashboard(product);
            });
            
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

function renderProductsOfDashboard(product) {
    const formattedNumber = Number(product.price).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return `
    <article class="c-product" data-product-id="${product.id}">
        <div class="c-controls">
            <img class="c-controls__img js-delete" src="../../assets/svg/delete.svg" alt="Icone de uma lixeira">
            <img class="c-controls__img js-edit" src="../../assets/svg/edit.svg" alt="Icone de um lapiz">
        </div>
        <figure class="c-product__wrapper">
            <img class="c-product__image js-product-image" loading="lazy" src="${product.image}" alt="Produto">
            <figcaption class="c-product__info">
                <h3 class="c-product__name js-product-name">${product.name}</h3>
                <span class="c-product__price js-product-price">${formattedNumber}</span>
            </figcaption>
            <span class="c-product__code">#${product.code}</span>
        </figure>
    </article>
    `  
}

async function renderSearchedProducts(json) {
    try{
        const products = await json;
    
        listProducts.innerHTML = "";
        products.forEach(product => {
            listProducts.innerHTML += renderProductsOfDashboard(product);
        })

    }catch (error) {
        console.log(error)
    }
}


export {
    displayProducts,
    renderSearchedProducts,
}