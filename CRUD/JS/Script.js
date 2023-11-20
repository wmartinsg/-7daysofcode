let formElement = document.querySelector(".form");
let formModal = document.querySelector(".form-modal");
let nameInput = document.querySelector("#name");
let birthDateInput = document.querySelector("#birth-date");
let resultElement = document.querySelector(".ul-result");
let divTitles = document.querySelector(".titles");
let modal = document.querySelector(".modal");
let background = document.querySelector(".background");
let btnSave = document.querySelector(".modal-btn-save");
let btnCancel = document.querySelector(".modal-btn-cancel");
let modalNameInput = document.querySelector(".modal-field-name");
let modalBirthInput = document.querySelector(".modal-field-birth");
let messageError = document.querySelectorAll(".message-error");
let date = new Date();
let currentYear = date.getFullYear();

// FOCUS ON NAME INPUT WHEN THE PAGE LOADS
window.onload = function () {
    nameInput.focus();
    renderValues();
};

formElement.addEventListener("submit", function addTask(e) {
    e.preventDefault();
    let valueFieldName = nameInput.value;
    let valueFieldDate = birthDateInput.value;
    let valueFieldNameCapitalize =
        valueFieldName[0].toUpperCase() +
        valueFieldName.substring(1).toLowerCase();

    let dateParts = valueFieldDate.split("-");
    let day = dateParts[2];
    let month = dateParts[1];
    let year = dateParts[0];

    let formattedDate = `${day}/${month}/${year}`;

    if (year > currentYear) {
        alert("Coloque um ano válido");
    } else {
        let person = {
            name: valueFieldNameCapitalize,
            birth: formattedDate,
        };

        nameInput.value = "";
        birthDateInput.value = "";
        nameInput.focus();

        let people = JSON.parse(localStorage.getItem("people")) || [];

        // Adiciona um novo objeto ao array
        people.push(person);

        // Converte o array de objetos em uma string JSON e armazena a string JSON atualizada no localStorage
        localStorage.setItem("people", JSON.stringify(people));

        renderValues(); // Renderiza os elementos atualizados na página
    }
});

function renderValues() {
    let people = JSON.parse(localStorage.getItem("people")) || [];

    if (people.length !== 0) {
        divTitles.classList.remove("hide");
        resultElement.classList.remove("hide");
    }

    let html = ""; // Variável para armazenar o HTML dos itens

    people.map((person, position) => {
        html += `<div class="div-itens">
          <div class="div-texts">
            <li class="li-name">${person.name}</li>
            <li class="li-birth">${person.birth}</li>
          </div>
          <div class="btns-result">
            <button class="btn-edit" title="Editar" onclick="openModal(${position})"><span class="material-symbols-outlined">
                edit
              </span>
            </button> 
            <button class="btn-delete" title="Apagar" onclick="removeItem(${position})"><span class="material-symbols-outlined">
                delete
              </span>
            </button>
          </div>
        </div>`;
    });

    resultElement.innerHTML = html; // Atribui o HTML final à propriedade innerHTML
}

function removeItem(position) {
    let userConfirmation = confirm("Você tem certeza?");

    if (userConfirmation === true) {
        let people = JSON.parse(localStorage.getItem("people"));

        // Remove o item do array
        people.splice(position, 1);

        // Atualiza o array no localStorage
        localStorage.setItem("people", JSON.stringify(people));

        renderValues();

        if (people.length === 0) {
            divTitles.classList.add("hide");
            resultElement.classList.add("hide");
        }
    }
}

function openModal(position) {
    let people = JSON.parse(localStorage.getItem("people"));
    let date = people[position].birth;
    let dateParts = date.split("/");
    let day = dateParts[0];
    let month = dateParts[1];
    let year = dateParts[2];

    let formattedDate = `${year}-${month}-${day}`;

    background.classList.remove("hide");
    modal.classList.remove("hide");
    modalNameInput.focus();

    modalNameInput.value = people[position].name;
    modalBirthInput.value = formattedDate;

    btnSave.setAttribute("data-id", position);
}

function closeModal() {
    background.classList.add("hide");
    modal.classList.add("hide");
    modalNameInput.value = "";
    modalBirthInput.value = "";
}

formModal.addEventListener("submit", function saveItem(e) {
    e.preventDefault();
    let valueModalName = modalNameInput.value;
    let valueModalBirth = modalBirthInput.value;

    let dateParts = valueModalBirth.split("-");
    let day = dateParts[2];
    let month = dateParts[1];
    let year = dateParts[0];

    let formattedDate = `${day}/${month}/${year}`;

    if (valueModalName === "" || valueModalBirth === "") {
        messageError[0].classList.remove("hide");
        messageError[1].classList.remove("hide");
    } else if (year > currentYear) {
        alert("Ano inválido");
    } else {
        messageError[0].classList.add("hide");
        messageError[1].classList.add("hide");
        let valueModalNameCapitalize =
            valueModalName[0].toUpperCase() +
            valueModalName.substring(1).toLowerCase();

        let people = JSON.parse(localStorage.getItem("people"));

        let id = parseInt(btnSave.getAttribute("data-id"));

        // Acessa o objeto no índice encontrado e faz as alterações desejadas
        people[id].name = valueModalNameCapitalize;
        people[id].birth = formattedDate;

        // Atualiza o array no localStorage
        localStorage.setItem("people", JSON.stringify(people));

        modalNameInput.value = "";
        modalBirthInput.value = "";
        closeModal();
        renderValues();
    }
});

document.addEventListener("keyup", function (e) {
    if (e.key === "Escape") {
        btnCancel.click();
    }
});