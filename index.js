// Verificar si el navegador soporta Service Workers
if ('serviceWorker' in navigator) {
    // Registrar el Service Worker
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration.scope);
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  }
  
  // Detectar si la app puede ser instalada (beforeinstallprompt)
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevenir el comportamiento por defecto
    event.preventDefault();
    deferredPrompt = event;
    console.log('Evento beforeinstallprompt capturado.');
  
    // Mostrar un botón para instalar la aplicación
    const installButton = document.createElement('button');
    installButton.textContent = 'Instalar easyJournal';
    installButton.classList.add('install-button');
    document.body.appendChild(installButton);
  
    // Manejar el clic en el botón
    installButton.addEventListener('click', () => {
      installButton.remove(); // Eliminar el botón después del clic
      deferredPrompt.prompt(); // Mostrar el prompt de instalación
  
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('El usuario aceptó instalar la aplicación.');
        } else {
          console.log('El usuario rechazó instalar la aplicación.');
        }
        deferredPrompt = null;
      });
    });
  });
  
  // Detectar si la app está instalada
  window.addEventListener('appinstalled', () => {
    console.log('easyJournal fue instalada exitosamente.');
  });
  
  // Lógica adicional para tu botón "Log-In"
  document.querySelector('.btn').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Botón "Log-In" presionado.');
    // Aquí puedes añadir lógica para redirigir al usuario o manejar la autenticación
  });
  
