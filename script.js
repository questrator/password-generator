const lengthInput = document.querySelector("#password-length");
const lengthOutput = document.querySelector("output[for='password-length']");
const uppercaseInput = document.querySelector("#uppercase");
const uppercaseSymbols = document.querySelector("#uppercase-symbols");
const digitsInput = document.querySelector("#digits");
const digitsSymbols = document.querySelector("#digits-symbols");

const lsButton = document.querySelector("#localstorage");
lsButton.addEventListener("click", showLocalStorage);

lengthInput.addEventListener("change", getPasswordLength);


const initConfig = {
    totalLength: 8,
    digits: "0123456789",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "",
    specials: "",
    mask: "",
    excludeSimilarities: "",
    complexity: "medium",
    pronounceable: "",
};

if (localStorage.length === 0) {
    for (let key in initConfig) {
        localStorage.setItem(key, initConfig[key]);
    }
}

function getPasswordSymbols() {
    let [digits, uppercase, lowercase, symbols] = [[], [], [], []];
    if (digitsInput.checked) {
        digits = Array.from(digitsSymbols.querySelectorAll("input[checked]")).map(e => e.value);
    }
    if (uppercaseInput.checked) {
        uppercase = Array.from(uppercaseSymbols.querySelectorAll("input[checked]")).map(e => e.value);
    }

    return [digits, uppercase, lowercase, symbols];
}

function getPasswordLength(event) {
    lengthOutput.textContent = lengthInput.value;
    return +lengthInput.value;
}

function showLocalStorage() {
    console.log(localStorage);
}

console.log(getPasswordSymbols())
