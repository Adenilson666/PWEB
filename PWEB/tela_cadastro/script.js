const formulario = document.querySelector("form");

const Inome = document.querySelector("#nome");
const Isobrenome = document.querySelector("#sobrenome");
const Iemail = document.querySelector("#email");
const Idata = document.querySelector("#data-nascimento");
const Icpf = document.querySelector("#cpf");
const Isexo = document.querySelector("#sexo");
const Isenha = document.querySelector("#senha");
const Iconfirmar_senha = document.querySelector("confirmar-senha");

function cadastrar() {

    fetch("http://localhost:8080/cadastrar",
        {
            headers: {
                'Accept': 'application/json', 
                'Content-Type: application/json'
            },
            method:"POST",
            body: JSON.stringify({
                nome: Inome.value,
                sobrenome: Isobrenome.value,
                email: Iemail.value,
                data: Idata.value,
                cpf: Icpf.value,
                sexo: Isexo.value,
                senha: Isenha.value,
                confirmar: Iconfirmar_senha.value})
        })
        .then(function (res) {console.log(res)})
        .catch(function (res) {console.log(res)})
}

function limpar() {
    Inome.value = "";
    Isobrenome.value = "";
    Iemail.value = "";
    Idata.value = "";
    Icpf.value = "";
    Isexo.value = "";
    Isenha.value = "";
    Iconfirmar_senha.value = "";
};

formulario.addEventListener('submit', function () {
    event.preventDefault();


    cadastrar();
    limpar();
})
