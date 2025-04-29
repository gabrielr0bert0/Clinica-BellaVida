document.addEventListener('DOMContentLoaded', function() {
  // Função para atualizar a sidebar
  function updateSidebar() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
      
      // Esconde/Mostra links conforme o tipo de login
      document.querySelectorAll('.sidebar nav a').forEach(link => {
          if (link.textContent === 'Painel') {
              link.style.display = isLoggedIn ? 'block' : 'none';
          }
          if (link.textContent === 'Monitoramento') {
              link.style.display = isAdmin ? 'block' : 'none';
          }
          if (link.textContent === 'Sair') {
              link.style.display = (isLoggedIn || isAdmin) ? 'block' : 'none';
          }
      });
  }

  // REGISTRO
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
      registerForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const user = document.getElementById('registerUser').value;
          const pass = document.getElementById('registerPass').value;
          localStorage.setItem(user, pass);
          document.getElementById('registerMessage').innerText = 'Usuário registrado com sucesso!';
          registerForm.reset();
      });
  }

  // LOGIN
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const user = document.getElementById('loginUser').value;
          const pass = document.getElementById('loginPass').value;
          
          // Verificação para administrador
          if (user === 'RCS1415&' && pass === 'RCS.R3d3.Cib3rs3gur4nç4.Sit3s') {
              localStorage.setItem('adminLoggedIn', 'true');
              localStorage.setItem('currentUser', 'Administrador');
              updateSidebar();
              window.location.href = "monitoramento.html";
              return;
          }
          
          // Verificação para funcionário comum
          const savedPass = localStorage.getItem(user);
          if (savedPass && savedPass === pass) {
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('currentUser', user);
              updateSidebar();
              window.location.href = "painel.html";
          } else {
              document.getElementById('loginMessage').style.color = "red";
              document.getElementById('loginMessage').innerText = "Usuário ou senha incorretos!";
          }
      });
  }

  // Atualiza a sidebar ao carregar a página
  updateSidebar();
});

// FUNÇÃO DE LOGOUT
function logout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('adminLoggedIn');
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}