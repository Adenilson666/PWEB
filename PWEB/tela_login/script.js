document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var perfil = document.getElementById('perfil').value;
        var cpf = document.getElementById('cpf').value;
        var senha = document.getElementById('senha').value;

        // Validações dos campos
        if (!perfil || !cpf || !senha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        var formData = {
            cpf: cpf,
            password: senha,
            perfil: perfil
        };

        fetch('https://pweb-project-api.onrender.com/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    
                    if (response.status === 401) {
                        alert('CPF ou senha inválidos.');
                    } else {
                        alert('Erro na requisição: ' + response.status);
                    }
                    throw new Error('Erro na requisição');
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('token', data.token);

                
                window.location.href = '../tela_menu_principal/menu_principal.html';
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
            });
    });
});