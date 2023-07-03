// 1. Create this Variable
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");


// 5. To get the data from local storage, so when refresh the page he task list still there.
let list = JSON.parse(localStorage.getItem("list"));
list.forEach(task => {
    toDoList(task);
})


// 2. Add this eventListener
formEl.addEventListener("submit", (event) => {
    event.preventDefault(); // to avoid from refresh page
    toDoList();
})

// 3. Create This Function, the (task) parameter added for the step 5.
function toDoList(task) {
    let newTask = inputEl.value;

    // 6. add this logic
    if (task) {
        newTask = task.name
    }

    const liEl = document.createElement("li");
    liEl.innerText = newTask;
    ulEl.appendChild(liEl);

    // 7. add this logic
    if (task && task.checked) {
        liEl.classList.add("checked");
    }

    inputEl.value = ""; // To make the input empty after submit

    const checkBtnEl = document.createElement("div");
    checkBtnEl.innerHTML = `<i class="fa-solid fa-square-check"></i>`;
    liEl.appendChild(checkBtnEl);

    const trashBtnEl = document.createElement("div");
    trashBtnEl.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    liEl.appendChild(trashBtnEl);

    checkBtnEl.addEventListener("click", () => {
        liEl.classList.toggle("checked");
        updateLocalStorage();
    });

    trashBtnEl.addEventListener("click", () => {
        liEl.remove();
        updateLocalStorage();
    });

    updateLocalStorage();
}

//4. Function to store the task list in the local storage
function updateLocalStorage() {
    const liEls = document.querySelectorAll("li");
    list = [];
    liEls.forEach(liEl => {
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.contains("checked")
        })
    })
    localStorage.setItem("list", JSON.stringify(list));
}