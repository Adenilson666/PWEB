document.addEventListener('DOMContentLoaded', () => {
    const editarCadastroForm = document.getElementById('editarCadastroForm');
    const trocarSenhaForm = document.getElementById('trocarSenhaForm');

    if (editarCadastroForm) {
        editarCadastroForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const sobrenome = document.getElementById('sobrenome').value;
            const email = document.getElementById('email').value;
            const dataNascimento = document.getElementById('data-nascimento').value;
            const cpf = document.getElementById('cpf').value;
            const sexo = document.getElementById('sexo').value;

            const data = {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                dataNascimento: dataNascimento,
                cpf: cpf,
                sexo: sexo
            };

            fetch('http://localhost:8080/api/auth/atualizar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Dados atualizados com sucesso!');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao atualizar dados!');
            });
        });
    } else {
        console.error("Formulário 'editarCadastroForm' não encontrado.");
    }

    if (trocarSenhaForm) {
        trocarSenhaForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const novaSenha = document.getElementById('nova-senha').value;
            const confirmarNovaSenha = document.getElementById('confirmar-nova-senha').value;

            if (novaSenha !== confirmarNovaSenha) {
                alert('Senhas não coincidem!');
                return;
            }

            const data = {
                novaSenha: novaSenha,
                confirmarSenha: confirmarNovaSenha
            };

            fetch('http://localhost:8080/api/auth/atualizar-senha', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Senha atualizada com sucesso!');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Erro ao atualizar senha!');
            });
        });
    } else {
        console.error("Formulário 'trocarSenhaForm' não encontrado.");
    }
});