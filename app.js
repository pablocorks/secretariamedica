// Função para verificar se o navegador suporta Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(() => console.log('Service Worker registrado com sucesso.'))
      .catch((error) => console.error('Erro ao registrar o Service Worker:', error));
  });
}

// Função para adicionar um paciente ao "localStorage"
function adicionarPaciente(nome, cpf, horaChegada) {
  let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
  pacientes.push({ nome, cpf, horaChegada });
  localStorage.setItem('pacientes', JSON.stringify(pacientes));
  enviarNotificacao(nome, cpf, horaChegada);
}

// Função para enviar notificação para médico e secretária
function enviarNotificacao(nome, cpf, horaChegada) {
  // Simula o envio de uma notificação (pode ser implementado de forma real com Push Notifications)
  alert(`Novo paciente chegou: ${nome}, CPF: ${cpf}, Chegou em: ${horaChegada}`);
}

// Interação com a tela inicial (Escolher PACIENTE, MÉDICO ou SECRETÁRIA)
document.getElementById("paciente").addEventListener("click", () => {
  window.location.href = "paciente.html";
});

document.getElementById("medico").addEventListener("click", () => {
  window.location.href = "medico.html";
});

document.getElementById("secretaria").addEventListener("click", () => {
  window.location.href = "secretaria.html";
});

// Função para a tela do paciente (aviso de chegada ou falar com secretária)
if (document.getElementById("avisoChegada")) {
  document.getElementById("avisoChegada").addEventListener("click", () => {
    const nome = prompt("Digite seu nome completo:");
    const cpf = prompt("Digite os 3 primeiros dígitos do seu CPF:");
    if (nome && cpf) {
      const horaChegada = new Date().toLocaleString();
      adicionarPaciente(nome, cpf, horaChegada);
      alert("Sua chegada foi registrada. A secretária e o médico foram notificados.");
    }
  });
}

if (document.getElementById("falarSecretaria")) {
  document.getElementById("falarSecretaria").addEventListener("click", () => {
    window.location.href = "contato.html"; // Página de contato com a secretária
  });
}

// Função para carregar a lista de pacientes para a tela do médico e da secretária
function carregarPacientes() {
  const tabelaBody = document.querySelector("#tabelaPacientes tbody");
  const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

  // Limpa a tabela antes de adicionar novos dados
  tabelaBody.innerHTML = "";

  // Preenche a tabela com os pacientes
  pacientes.forEach((paciente) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${paciente.nome}</td>
      <td>${paciente.cpf}</td>
      <td>${paciente.horaChegada}</td>
    `;
    tabelaBody.appendChild(tr);
  });
}

// Carregar a tabela de pacientes na tela do médico ou secretária
if (document.getElementById("tabelaPacientes")) {
  carregarPacientes();
}
