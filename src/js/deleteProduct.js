async function deleteProduct(id) {
    try {
        const response = await fetch(`https://64c8ebb4b2980cec85c1973a.mockapi.io/api/v1/products/${id}`, {
            method: "DELETE",
            hearders: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                id: id
            })
        });

        if(response.ok) {
            window.location.reload();
        }

    } catch (error) {
        console.log(error);
    }
}

let idOfProduct = null;

function configureProductDeletionButtons() {
    const products = document.querySelectorAll("[data-product-id]");
    const buttonsDelete = document.querySelectorAll(".js-delete");
    const modal = document.querySelector("dialog");
    const titleModal = modal.querySelector("h3");
    const productNames = document.querySelectorAll(".js-product-name");
  
    buttonsDelete.forEach((button, index) => {
        button.addEventListener("click", () => {
            idOfProduct = products[index].dataset.productId;
            titleModal.textContent = `Excluir: ${productNames[index].textContent}`;
            modal.showModal();
        });
    })
}

function closeModal() {
    const modal = document.querySelector("dialog");
    modal.close();
}

function yesDeleteProduct() {
    deleteProduct(idOfProduct);
    closeModal();
}

export {
    configureProductDeletionButtons,
    closeModal,
    yesDeleteProduct,
}

