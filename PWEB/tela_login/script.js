document.addEventListener('DOMContentLoaded', function() {  // Aguarda o DOM carregar
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var perfil = document.getElementById('perfil').value;
        var cpf = document.getElementById('cpf').value;
        var senha = document.getElementById('senha').value;

        var formData = {
            cpf: cpf,
            password: senha,
            perfil: perfil // Incluindo o perfil no formData
        };

        fetch('http://localhost:8080/api/auth/signin', {  // URL da sua API
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data.token);

                // Redireciona para a página index.html dentro da pasta marcar_consultas
                window.location.href = '../marcar_consultas/index.html';
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
                alert('CPF ou senha inválidos.');
            });
    });
});