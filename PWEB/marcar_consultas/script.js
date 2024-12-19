document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const unidade = document.getElementById('unidade').value;
        const especialidade = document.getElementById('especialidade').value;
        const data = document.getElementById('data').value;
        const hora = document.getElementById('hora').value;

        // Cria um objeto com os dados da consulta
        const consulta = {
            unidade: unidade,
            especialidade: especialidade,
            data: data,
            hora: hora
        };

        // Faz a requisição POST para a API
        fetch('http://localhost:8080/api/consultas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Substitua pelo token JWT
            },
            body: JSON.stringify(consulta)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao marcar consulta.');
            }
            return response.json();
        })
        .then(data => {
            // Exibe mensagem de sucesso e limpa o formulário
            alert('Consulta marcada com sucesso!');
            form.reset();
        })
        .catch(error => {
            // Exibe mensagem de erro
            alert(error.message);
        });
    });
});