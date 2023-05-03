const array = [1, 2, 3, 4, 5];
const label = document.querySelector(".symbol-label");
const start = document.querySelector("#go");
start.addEventListener("click", go);
console.log(label)

function go(event) {
    const time = rand(50, 200);
    for (let i = 0; i < array.length; i++) {
        const t = setTimeout(() => {
            label.textContent = array[i];
        }, i * time);
    }
}

function rand(start, end) {
    return Math.trunc(Math.random() * (end - start) + start);
}