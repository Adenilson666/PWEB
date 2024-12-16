// Função para cancelar consultas
function cancelarConsulta(idConsulta) {
    const consulta = document.getElementById(idConsulta);
    if (consulta) {
        consulta.remove(); // Remove a consulta da página
        alert("Consulta cancelada com sucesso!");
    }
}
