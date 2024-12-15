// Simula um banco de dados de consultas
let consultas = [
    { id: 1, data: "2024-12-20", medico: "Dr. Silva", status: "Agendada" },
    { id: 2, data: "2024-12-22", medico: "Dra. Souza", status: "Agendada" },
    { id: 3, data: "2024-12-25", medico: "Dr. Lima", status: "Agendada" }
];

// Função para cancelar uma consulta
function cancelarConsulta() {
    const idConsulta = document.getElementById("consultaId").value;
    const mensagem = document.getElementById("mensagem-cancelamento");
    
    const index = consultas.findIndex(consulta => consulta.id == idConsulta);
    if (index !== -1) {
        consultas.splice(index, 1); // Remove a consulta do array
        mensagem.textContent = `Consulta ID ${idConsulta} cancelada com sucesso.`;
        mensagem.style.color = "green";
        carregarHistorico(); // Atualiza a lista de histórico
    } else {
        mensagem.textContent = `Consulta ID ${idConsulta} não encontrada.`;
        mensagem.style.color = "red";
    }
}

// Função para carregar o histórico de consultas
function carregarHistorico() {
    const listaHistorico = document.getElementById("lista-historico");
    listaHistorico.innerHTML = ""; // Limpa a lista atual

    if (consultas.length === 0) {
        listaHistorico.innerHTML = "<li>Nenhuma consulta agendada.</li>";
    } else {
        consultas.forEach(consulta => {
            const item = document.createElement("li");
            item.textContent = `ID: ${consulta.id} - Data: ${consulta.data} - Médico: ${consulta.medico}`;
            listaHistorico.appendChild(item);
        });
    }
}
