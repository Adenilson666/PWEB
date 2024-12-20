document.addEventListener('DOMContentLoaded', () => {
    // Verifica se o usuário está autenticado
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated) {
        // Redireciona para a página de login
        window.location.href = '../tela_login/index.html'; 
    }

    // Busca as consultas do usuário na API
    fetch('https://pweb-project-api.onrender.com/api/consultas', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(consultas => {
        const proximasConsultasSection = document.getElementById('proximas-consultas');
        const historicoConsultasSection = document.getElementById('historico-consultas');

        consultas.forEach(consulta => {
            const dataConsulta = new Date(consulta.data + 'T' + consulta.hora);
            const agora = new Date();

            const consultaDiv = document.createElement('div');
            consultaDiv.classList.add('consulta');
            consultaDiv.id = `consulta-${consulta.id}`; // Adiciona um ID único à div da consulta

            consultaDiv.innerHTML = `
                <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
                <p><strong>Data:</strong> ${consulta.data}</p>
                <p><strong>Hora:</strong> ${consulta.hora}</p>
                <p><strong>Local:</strong> ${consulta.unidade}</p>
            `;

            if (dataConsulta > agora) {
                // Consulta futura
                const cancelarBtn = document.createElement('button');
                cancelarBtn.classList.add('cancelar-btn');
                cancelarBtn.textContent = 'Cancelar';
                cancelarBtn.addEventListener('click', () => {
                    if (confirm('Tem certeza de que deseja cancelar esta consulta?')) {
                        fetch(`https://pweb-project-api.onrender.com/api/consultas/${consulta.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Erro ao cancelar consulta.');
                            }
                            // Remove a consulta da página
                            consultaDiv.remove();
                            alert('Consulta cancelada com sucesso!');
                        })
                        .catch(error => {
                            alert(error.message);
                        });
                    }
                });
                consultaDiv.appendChild(cancelarBtn);
                proximasConsultasSection.appendChild(consultaDiv);
            } else {
                // Consulta passada
                const verProntuarioBtn = document.createElement('button');
                verProntuarioBtn.classList.add('ver-prontuario');
                verProntuarioBtn.textContent = 'Ver Prontuário';
                verProntuarioBtn.addEventListener('click', () => {
                    // Implemente a lógica para visualizar o prontuário (ex: abrir em nova aba)
                   window.location.href = '/PWEB/prontuario_paciente/index.html'
                });
                consultaDiv.appendChild(verProntuarioBtn);
                historicoConsultasSection.appendChild(consultaDiv);
            }
        });
    })
    .catch(error => {
        console.error('Erro ao buscar consultas:', error);
        // Aqui você pode adicionar código para exibir uma mensagem de erro ao usuário
    });
});