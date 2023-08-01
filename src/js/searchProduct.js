async function searchProduct(term) {
    try {
        const response = await fetch(`https://64c8ebb4b2980cec85c1973a.mockapi.io/api/v1/products?name=${term}`);
        const products = await response.json();

        return products
        
    } catch (error) {
        console.log(error)
    }
}

export {
    searchProduct,
}