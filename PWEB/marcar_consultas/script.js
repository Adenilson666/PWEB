document.addEventListener('DOMContentLoaded', function () {
    // Verifica autenticação
    const isAuthenticated = !!localStorage.getItem('token');
    if (!isAuthenticated) {
        window.location.href = '../tela_login/index.html';
        return;
    }

    const dataInput = document.getElementById("data");
    const horaInput = document.getElementById("hora");
    const formConsulta = document.getElementById("form-consulta");

    // Função para bloquear dias de fim de semana no calendário
    const bloquearFinsDeSemana = () => {
        dataInput.addEventListener("input", () => {
            const dataSelecionada = new Date(dataInput.value);
            const diaSemana = dataSelecionada.getDay();
            if (diaSemana === 0 || diaSemana === 6) {
                alert("Selecione um dia útil (segunda a sexta). Dias de fim de semana não são permitidos.");
                dataInput.value = ""; // Limpa o campo de data
            }
        });
    };

    // Função para gerar horários de consulta
    const gerarHorarios = () => {
        const horarios = [];
        const periodos = [
            { inicio: "08:00", fim: "11:30" },
            { inicio: "14:00", fim: "17:00" }
        ];

        periodos.forEach(({ inicio, fim }) => {
            let [hora, minuto] = inicio.split(":" ).map(Number);
            const [horaFim, minutoFim] = fim.split(":" ).map(Number);

            while (hora < horaFim || (hora === horaFim && minuto < minutoFim)) {
                horarios.push(`${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`);
                minuto += 30;
                if (minuto >= 60) {
                    minuto = 0;
                    hora++;
                }
            }
        });

        return horarios;
    };

    // Função para carregar horários disponíveis
    const carregarHorariosDisponiveis = async (dataSelecionada) => {
        try {
            const response = await fetch(`https://pweb-project-api.onrender.com/api/consultas/horarios?data=${dataSelecionada}`);
            if (!response.ok) throw new Error("Erro ao buscar horários disponíveis.");

            const horariosOcupados = await response.json();
            const horariosValidos = gerarHorarios();

            horaInput.innerHTML = "<option value=''>-- Selecione um horário --</option>";
            horariosValidos.forEach(horario => {
                if (!horariosOcupados.includes(horario)) {
                    const option = document.createElement("option");
                    option.value = horario;
                    option.textContent = horario;
                    horaInput.appendChild(option);
                }
            });
        } catch (error) {
            console.error("Erro ao carregar horários disponíveis:", error);
            alert("Erro ao carregar horários disponíveis.");
        }
    };

    // Evento para carregar horários ao selecionar uma data válida
    dataInput.addEventListener("input", () => {
        const dataSelecionada = dataInput.value;
        carregarHorariosDisponiveis(dataSelecionada);
    });

    // Evento de envio do formulário
    formConsulta.addEventListener("submit", async (event) => {
        event.preventDefault();

        const unidade = document.getElementById("unidade").value;
        const especialidade = document.getElementById("especialidade").value;
        const data = dataInput.value;
        const hora = horaInput.value;

        if (!unidade || !especialidade || !data || !hora) {
            alert("Por favor, preencha todos os campos antes de enviar.");
            return;
        }

        try {
            const response = await fetch("https://pweb-project-api.onrender.com/api/consultas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ unidade, especialidade, data, hora }),
            });

            if (!response.ok) throw new Error("Erro ao marcar consulta.");

            alert("Consulta marcada com sucesso!");
            formConsulta.reset();
            horaInput.innerHTML = "<option value=''>-- Selecione um horário --</option>";
        } catch (error) {
            console.error("Erro ao marcar consulta:", error);
            alert("Erro ao marcar consulta. Tente novamente mais tarde.");
        }
    });

    bloquearFinsDeSemana();
});
