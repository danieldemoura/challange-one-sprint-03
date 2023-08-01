async function getProductCode(code) {
    try {
        const response = await fetch(`https://64c8ebb4b2980cec85c1973a.mockapi.io/api/v1/products?code=${code}`);
        const data = await response.json();
    
        return data;
    }catch (error) {
        console.log(error);
        return [];
    }
   
}


async function generateProductCode() {
    let productCode = generateRandomCode();

    let productCodeData = await getProductCode(productCode); 
    let productCodeExist = productCodeData.length > 0;

    while(productCodeExist) {
        productCode = generateRandomCode();
        
        productCodeData = await getProductCode(productCode);
        productCodeExist = productCodeData.length > 0;
    }
    
    return productCode
}

function generateRandomCode() {
    let productCode = "";

    for(let index = 0; index < 7; index++) {
        productCode += Math.floor(Math.random() * 10);
    }

    return productCode;
}


export {
    generateProductCode,
}