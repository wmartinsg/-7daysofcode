const cadastroPessoa = document.querySelector('.js-form');
const inputName = cadastroPessoa.querySelector('.js-field__name');
const inputBirthDate = cadastroPessoa.querySelector('.js-field__birth-date');
const submitForm = document.querySelector('.button');
const tabela = document.querySelector(".js-tabela");

const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];

exibirDados();

const handleSubmitForm = (event) => {
    event.preventDefault();
    console.log({ name: inputName.value, birthDate: inputBirthDate.value});
    if (!inputName.validity.valid) {
        alert('Nome invalido');
    } if (!inputBirthDate.validity.valid) {
        alert('Data invalida');
    } else (inputName.validity.valid && inputBirthDate.validity.valid);{
        pessoas.push({nome: inputName.value, nascimento: inputBirthDate.value});
        localStorage.setItem('pessoas', JSON.stringify(pessoas));
        
        cadastroPessoa.reset();
    }
}

tabela.addEventListener('click', (event) => {
    event.preventDefault();
    
    if (event.target.parentNode.id) {
        const idNumber = parseInt(event.target.parentNode.id);
        if (inputName.value == "" || inputBirthDate.value == ""){
            alert("Insira os dados que deseja alterar");
            inputName.focus();
        } else {
            if (!inputName.validity.valid) {
                alert('Nome invalido');
            } if (!inputBirthDate.validity.valid) {
                alert('Data invalida');
            } else {
                pessoas.splice(idNumber, 1, {nome: inputName.value, nascimento: inputBirthDate.value});
                localStorage.setItem('pessoas', JSON.stringify(pessoas));
                resetarPagina();
            }
        }
        if(event.target.attributes.class.nodeValue == "pessoa-excluir"){
            alert(`Dados do: ${ pessoas[idNumber].nome} foram excluidos`);
            pessoas.splice(idNumber,1);
            localStorage.setItem('pessoas', JSON.stringify(pessoas));
            resetarPagina();
        }
    }
})

function getFormattedDate(dateString) {
    const date = new Date(dateString)
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = (1 + date.getDate()).toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
}

function resetarPagina(){
    inputName.value = "";
    inputBirthDate.value = "";
    window.location.reload();
}

function exibirDados(){
    for(var i = 0; i < pessoas.length; i++) {
        tabela.insertAdjacentHTML("beforeend",`
        <tr>
            <td>${pessoas[i].nome}</td>
            <td>${getFormattedDate(pessoas[i].nascimento)}</td>
            <td id=${i} ><a class="pessoa-editar" href="#">editar</a> <a class="pessoa-excluir" href="#">excluir</a></td>
        </tr>
        `);
        
    }
}
