import { password, passwordConfirm } from "./getElementsForm.js";
import { errorTypes, errorMessages } from "./error-message.js";

function validPassword(input) {
    const warning = input.parentNode.querySelector(".js-warning");

    const fieldIsNotEmpty = password.value && passwordConfirm.value;
    const passwordDoNotMatch = password.value != passwordConfirm.value;

    if(fieldIsNotEmpty && passwordDoNotMatch) {
        warning.textContent = errorMessages[password.name].customError;
        passwordConfirm.setCustomValidity("Senha não confere, verifique e tente novamente");

    } else {
        warning.textContent = "";
        passwordConfirm.setCustomValidity("");
    }
}

function validFormField(input) {
    const warning = input.parentNode.querySelector(".js-warning");
   
    for(const error of errorTypes) {
        const invalidField = !input.checkValidity() && input.validity[error];

        if(invalidField) {
            warning.textContent = errorMessages[input.name][error];
            break;

        }else {
            warning.textContent = "";
        }
    }
}

export {
    validFormField,
    validPassword,
}
