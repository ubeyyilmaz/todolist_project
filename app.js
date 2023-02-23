let formData = document.getElementById("data");
let fname = document.querySelector("#fname");
let list = document.querySelector(".list");
let todo = document.querySelector(".todo");
let danger = document.querySelector(".danger");
let icon = document.getElementById("icon");
list.addEventListener("click", removeIcon);

formData.addEventListener("submit", function (e) {

    if (fname.value.trim() === "") {
        showAlert("danger", "Lütfen Kutucuğu Doldurunuz");
    } else {
        addStorage(fname.value);
        window.reload();
        loadAllUI(fname.value);
        removeIcon(fname.value);
        showAlert("success", "Başarılı bir şekilde eklendi");
        fname.value = "";
    }
    e.preventDefault();
})

function addStorage(entry) {
    let value = callStorage();
    value.push(entry);
    localStorage.setItem("value", JSON.stringify(value));
}

function callStorage() {
    let value;

    if (localStorage.getItem("value") === null) {
        value = [];
    } else {
        value = JSON.parse(localStorage.getItem("value"));
    }
    return value;
}

document.addEventListener("DOMContentLoaded", function loadAllUI() {
    let value = callStorage();
    value.forEach(function (value) {
        list.innerHTML += `
        <div id="yapildi">
        <ul>
        <li>${value}</li>
        <i class="glyphicon glyphicon-remove" id="icon"></i>
        </ul>
        </div>
        `;
    });
});

function removeIcon(e) {
    if (e.target.id === "icon") {
        e.target.parentElement.remove();
        showAlert("dark", "Tamamladınız..");
        deleteValueFromStorage(e.target.parentElement.textContent.trim());
        localStorage.setItem("value", JSON.stringify(value));
    }
}

function deleteValueFromStorage(sil) {
    let value = callStorage();
    value.forEach(function (valu, index) {
        if (valu.trim() === sil) {
            value.splice(index, 1); // Arrayden değeri silebiliriz.
        }
    });
    localStorage.setItem("value", JSON.stringify(value));
}

function showAlert(type, message) {
    let alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    danger.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 2000);
}