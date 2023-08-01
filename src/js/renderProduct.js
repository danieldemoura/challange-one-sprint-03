
async function getProductData(id) {
    try {
        const response = await fetch(`https://64c8ebb4b2980cec85c1973a.mockapi.io/api/v1/products/${id}`);
        const product = await response.json();
        
        return product;
    }catch (error) {
        console.log(error);
    }
}


function populatePageWithProductData(product) {
    const productArticle = document.querySelector(".js-product");
    const formattedNumber = Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL"});

    productArticle.innerHTML += `
        <figure class="c-product-preview__wrapper">
            <img class="c-product-preview__img" src="${product.image}" alt="Imagem de um ${product.name}">
            <figcaption class="c-info">
                <h3 class="c-info__name">${product.name}</h3>
                <span class="c-info__price">${formattedNumber}</span>
                <p class="c-info__desc">
                    ${product.info}
                </p>
            </figcaption>
        </figure>  
    `
    similarRandomProducts(product);
}

async function getProductsSimilar(category) {
    try {
        const reponse = await fetch(`https://64c8ebb4b2980cec85c1973a.mockapi.io/api/v1/products?category=${category}`);
        const products = await reponse.json();

        return products
    } catch (error) {
        console.log(error);
    }
}

async function similarRandomProducts(currentProduct) {
    const products = await getProductsSimilar(currentProduct.category);
    let amountOfProductsAdded = 0;

    for(let index = 0; index < products.length; index++) {
        const itsNotTheSameProduct = products[index].id !== currentProduct.id;
        
        if(itsNotTheSameProduct) {
            populatePageWithProductSimilar(products[index], products[index].id);
            amountOfProductsAdded++
        }
        console.log(index)
        if(amountOfProductsAdded === 6) break;
    }
}

function populatePageWithProductSimilar(product, id) {
    const listProducts = document.querySelector(".js-list-product");
    const formattedNumber = Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
    
    listProducts.innerHTML += `
    <article class="c-product">
        <figure class="c-product__wrapper">
            <img class="c-product__image" src="${product.image}" alt="Imagem de um ${product.name}">
            <figcaption class="c-product__info">
                <h3 class="c-product__name">${product.name}</h3>
                <span class="c-product__price">${formattedNumber}</span>
            </figcaption>
            <a class="c-product__view-detail" href="../pages/product.html?id=${id}">Ver produto</a>
        </figure>
    </article>
    `
}


function renderProductAccordingToId() {
    const parameter = new URLSearchParams(window.location.search);
    const id = parameter.get("id");
    
    getProductData(id).then(product => {
        populatePageWithProductData(product);
    });
}

renderProductAccordingToId();
