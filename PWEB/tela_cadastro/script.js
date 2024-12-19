document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cadastroForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário

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

        // Validações dos campos (adicionadas)
        if (!nome || !sobrenome || !email || !dataNascimento || !cpf || !sexo || !senha) {
            alert("Por favor, preencha todos os campos.");
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
        fetch('https://pweb-project-api.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
                if (data.message === 'User registered successfully!') {
                    // Redireciona para a URL da página de login (corrigido)
                    window.location.href = '../tela_login/index.html';
                }
            })
            .catch(error => {
                console.error('Erro ao cadastrar usuário:', error);
                alert('Ocorreu um erro ao cadastrar o usuário. Verifique os dados informados e a conexão com a internet.');
            });
    });
});