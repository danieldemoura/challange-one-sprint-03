import { email, passwordConfirm, formOfSignUp } from "./getElementsForm.js";
import { validFormField, validPassword }  from "./validateForm.js";

async function registerUser() {
    try {
        const response = await fetch("https://64c8ebb4b2980cec85c1973a.mockapi.io/api/v1/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email: email.value,
                password: passwordConfirm.value,
            }),
        });

        if(response.ok) {
            window.location.href = "../pages/login.html";
        }

    }catch (error) {
        console.log(error);
    }
}

const inputs = document.querySelectorAll(".js-input");
inputs.forEach(input => input.addEventListener("blur", () => validFormField(input)));

passwordConfirm.addEventListener("input", () => validPassword(passwordConfirm));
formOfSignUp.addEventListener("submit", (event) => { 
    event.preventDefault();
    registerUser();
});