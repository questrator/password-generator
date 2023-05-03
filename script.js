const passwordInput = document.querySelector("#password");
const lengthInput = document.querySelector("#password-length");
const lengthOutput = document.querySelector("output[for='password-length']");
const uppercaseInput = document.querySelector("#uppercase");
const uppercaseSymbols = document.querySelector("#uppercase-symbols");
const digitsInput = document.querySelector("#digits");
digitsInput.addEventListener("change", enableDigits)
const digitsSymbols = document.querySelector("#digits-symbols");
const digitsCheckAll = document.querySelector("#digits-checkall");
digitsCheckAll.addEventListener("click", checkAllDigits);
const digitsSet = document.querySelector("#digits-set");
digitsSet.addEventListener("click", setDigits);

const generate = document.querySelector("#generate");
generate.addEventListener("click", generatePassword);

const lsButton = document.querySelector("#localstorage");
lsButton.addEventListener("click", showLocalStorage);

lengthInput.addEventListener("input", getPasswordLength);


const config = {
    totalLength: 8,
    digits: 1,
    digitsSymbols: "0123456789",
    lowercase: 1,
    lowercaseSymbols: "abcdefghijklmnopqrstuvwxyz",
    uppercase: 0,
    uppercaseSymbols: "",
    specials: 0,
    specialsSymbols: "",
    // mask: "",
    // excludeSimilarities: "",
    // complexity: "medium",
    // pronounceable: "",
};

for (let key in config) {
    if (localStorage.getItem(key) === null)
    localStorage.setItem(key, config[key]);
}

function rand(start, end) {
    return Math.trunc(Math.random() * (end - start) + start);
}

const cascadeBlock = document.querySelector("#cascade");

function generatePassword() {
    const symbols = config.digitsSymbols + config.lowercaseSymbols;
    const cascade = [];
    const password = [];
    for (let i = 0; i < config.totalLength; i++) {

        const label = document.createElement("div");
        label.classList.add("symbol-label");
        label.setAttribute("data-n", i);
        cascadeBlock.insertAdjacentElement("beforeend", label);

        const x = symbols[rand(0, symbols.length)];
        const n = rand(3, 9);
        const queue = [];
        for (let j = 0; j < n; j++) {
            const q = symbols[rand(0, symbols.length)];
            queue.push(q);            
        }
        cascade.push([...queue, x]);
        password.push(x);
    }
    console.log(password);
    console.log(cascade);
    passwordInput.value = password.join("");
    return password;
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
getDigits();

function setDigits() {
    const digits = Array.from(digitsSymbols.querySelectorAll("input")).reduce((r, e) => e.checked ? r + e.value : r, "");
    localStorage.setItem("digits", digits);
}

function checkAllDigits() {
    digitsInput.checked = true;
    digitsSymbols.querySelectorAll("input").forEach(e => e.checked = true);
}

function enableDigits() {
    if (!digitsInput.checked) {
        digitsSymbols.querySelectorAll("input").forEach(e => e.disabled = true);
        localStorage.setItem("digits", "");
    }
    else {
        digitsSymbols.querySelectorAll("input").forEach(e => e.disabled = false);
    }
}

function getPasswordLength(event) {
    lengthOutput.textContent = lengthInput.value;
    return +lengthInput.value;
}

function showLocalStorage() {
    console.log(localStorage);
}

