import { email, passwordConfirm, formOfLogin } from "./getElementsForm.js";
import { validFormField }  from "./validateForm.js";

async function requestLoginData(event) {
    event.preventDefault();
    const userEmail = email.value;
    const password = passwordConfirm.value;

    try {
        const response = await fetch(`https://64c8ebb4b2980cec85c1973a.mockapi.io/api/v1/users?email=${userEmail}&password=${password}`);
        const user = await response.json();
        const userExist = user.length != 0 && ( user[0].email == userEmail && user[0].password == password);

        if (userExist) {
            window.location.href = "../pages/dashboard.html";
            
        } else {
            alert("Email ou senha inválida");
        }
         
    }catch (error) {
        console.log(error);
    }
    
}

const inputs = document.querySelectorAll(".js-input");
inputs.forEach(input => input.addEventListener("blur", () => validFormField(input)));

formOfLogin.addEventListener("submit", event => requestLoginData(event))