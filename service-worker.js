const CACHE_NAME = "secretaria-medica-cache-v1";

// Instalar o Service Worker
self.addEventListener("install", event => {
  // O Service Worker é instalado, mas não estamos usando cache para nada
  console.log("Service Worker instalado");
});

// Acionar notificações push (sempre que uma notificação for enviada ao usuário)
self.addEventListener("push", event => {
  let options = {
    body: event.data.text(), // Mensagem da notificação
    icon: "/icon-192x192.png", // Ícone que será exibido na notificação
    badge: "/icon-192x192.png", // Ícone de badge (opcional)
  };

  // Exibir a notificação
  event.waitUntil(
    self.registration.showNotification("Novo Paciente Chegando!", options)
  );
});

// Acionar quando o usuário clicar na notificação
self.addEventListener("notificationclick", event => {
  event.notification.close(); // Fechar a notificação ao clicar

  // Aqui você pode redirecionar para a página do médico ou secretária, por exemplo
  event.waitUntil(
    clients.openWindow("/medico.html") // Ou outra página relevante
  );
});

// Ativar e limpar caches antigos (remover apenas se realmente não estiver usando)
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Limpar caches antigos
          }
        })
      );
    })
  );
});
