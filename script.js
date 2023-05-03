const lengthInput = document.querySelector("#password-length");
const lengthOutput = document.querySelector("output[for='password-length']");
const uppercaseInput = document.querySelector("#uppercase");
const uppercaseSymbols = document.querySelector("#uppercase-symbols");
const digitsInput = document.querySelector("#digits");
const digitsSymbols = document.querySelector("#digits-symbols");
const digitsCheckAll = document.querySelector("#digits-checkall");
const digitsSet = document.querySelector("#digits-set");
digitsSet.addEventListener("click", setDigits);

const lsButton = document.querySelector("#localstorage");
lsButton.addEventListener("click", showLocalStorage);

lengthInput.addEventListener("change", getPasswordLength);


const config = {
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

for (let key in config) {
    if (localStorage.getItem(key) === null)
    localStorage.setItem(key, config[key]);
}

function getDigits() {
    const digits = localStorage.getItem("digits");
    if (digits !== "") {
        digitsInput.checked = true;
        for (let digit of digits) {
            digitsSymbols.querySelector(`input[value='${digit}']`).checked = true;
        }
    }
};
function setDigits() {
    const digits = Array.from(digitsSymbols.querySelectorAll("input")).reduce((r, e) => e.checked ? r + e.value : r, "");
    localStorage.setItem("digits", digits);
}
getDigits();

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
