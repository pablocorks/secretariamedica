document.getElementById("paciente").addEventListener("click", () => {
  alert("Abrindo tela do Paciente...");
  // Aqui você redirecionará para outra página ou seção
});

document.getElementById("medico").addEventListener("click", () => {
  const senha = prompt("Digite a senha para acessar:");
  if (senha === "1803") {
    alert("Abrindo tela do Médico...");
    // Aqui você redirecionará para outra página ou seção
  } else {
    alert("Senha incorreta!");
  }
});

document.getElementById("secretaria").addEventListener("click", () => {
  const senha = prompt("Digite a senha para acessar:");
  if (senha === "1803") {
    alert("Abrindo tela da Secretária...");
    // Aqui você redirecionará para outra página ou seção
  } else {
    alert("Senha incorreta!");
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log("Service Worker registrado com sucesso."))
    .catch(err => console.error("Erro ao registrar o Service Worker:", err));
}
