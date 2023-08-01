const errorTypes = [
    "valueMissing",
    "typeMismatch",
    "tooShort",
    "customError"
]

const errorMessages = {

    name: {
        valueMissing: "Por favor, preencha esse campo",
        tooShort: "Um nome deve ter pelo meno 3 caracteres",
    },
    message: {
        valueMissing: "Por favor, preencha esse campo",
        tooShort: "A mensagem deve ter no mínimo 5 caracteres",
    },
    email: {
        valueMissing: "Por favor, preencha esse campo",
        typeMismatch: "Insira uma endereço de email válido",
    },
    password: {
        valueMissing: "Por favor, preencha esse campo",
        tooShort: "A senha deve ter no mínimo 4 caracteres",
        customError: "A senha não confere, tente novamente",
    },
    category: {
        valueMissing: "Por favor, selecione uma opção"
    },
    product: {
        valueMissing: "Por favor, preencha esse campo"
    },
    price: {
        valueMissing: "Por favor, preencha esse campo"
    }

}


export {
    errorTypes,
    errorMessages,
}

