const passwordInput = document.querySelector("#password");
const lengthInput = document.querySelector("#password-length");
lengthInput.addEventListener("input", setLength);
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
    cascadeBlock.innerHTML = "";
    const symbols = config.digitsSymbols + config.lowercaseSymbols;
    const password = [];
    for (let i = 0; i < localStorage.totalLength; i++) {

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
        queue.push(x);
        console.log(queue)
        password.push(x);
        go(label, queue);

        function go(label, queue) {
            const time = rand(20, 100);
            for (let i = 0; i < queue.length; i++) {
                const t = setTimeout(() => {
                    label.innerHTML = Number.isNaN(+queue[i]) ? `<span class='char'>${queue[i]}</span>` : `<span class='number'>${queue[i]}</span>`;
                }, i * time);
            }
        }
    }
    console.log(password);
    passwordInput.value = password.join("");
    return password;
}



function getDigits() {
    const digits = localStorage.getItem("digits");
    const digitsSymbols = localStorage.getItem("digitsSymbols");
    if (digits !== "0") {
        digitsInput.checked = true;
        for (let digit of digitsSymbols) {
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
        localStorage.setItem("digits", "0");
    }
    else {
        digitsSymbols.querySelectorAll("input").forEach(e => e.disabled = false);
        localStorage.setItem("digits", "1");
    }
}

function getPasswordLength(event) {
    lengthOutput.textContent = lengthInput.value;
    return +lengthInput.value;
}

function setLength() {
    localStorage.setItem("totalLength", lengthInput.value)
}

function showLocalStorage() {
    console.log(localStorage);
}

