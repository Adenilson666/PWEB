<<<<<<< HEAD
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Coleta os dados do formulário
    var nome = document.getElementById('nome').value;
    var sobrenome = document.getElementById('sobrenome').value;
    var email = document.getElementById('email').value;
    var dataNascimento = document.getElementById('data-nascimento').value;
    var cpf = document.getElementById('cpf').value;
    var sexo = document.getElementById('sexo').value;
    var senha = document.getElementById('senha').value;
    var confirmarSenha = document.getElementById('confirmar-senha').value;

    // Validação da senha
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    // Cria um objeto com os dados do formulário
    var formData = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        dataNascimento: dataNascimento,
        cpf: cpf,
        sexo: sexo,
        password: senha,
        role: ["user"]
    };

    // Envia os dados para a API usando Fetch API
    fetch('http://localhost:8080/api/auth/signup', { // URL completa da API
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        // ... resto do código
        .then(response => {
            if (!response.ok) {
                // Lança um erro para ser capturado pelo catch
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            if (data.message === 'User registered successfully!') {
                window.location.href = '../tela_login/index.html';
            }
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Ocorreu um erro ao cadastrar o usuário. Verifique os dados informados.');
        });
});
=======
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
>>>>>>> 75987e5d0128a590f863782526f95395f5ce64bc
