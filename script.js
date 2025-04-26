document.addEventListener('DOMContentLoaded', function() {
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
        const savedPass = localStorage.getItem(user);
  
        fetch('https://ipapi.co/json/')
          .then(response => response.json())
          .then(data => {
            if (data.country_code !== 'BR') {
              document.getElementById('loginMessage').innerText = 'Acesso bloqueado: país não permitido.';
            } else {
              if (pass === savedPass) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', user);
                window.location.href = 'painel.html';
              } else {
                document.getElementById('loginMessage').innerText = 'Usuário ou senha incorretos!';
              }
            }
          })
          .catch(() => {
            document.getElementById('loginMessage').innerText = 'Erro ao verificar localização.';
          });
  
        loginForm.reset();
      });
    }
  
    // PROTEÇÃO DO PAINEL
    if (window.location.pathname.includes('painel.html')) {
      if (localStorage.getItem('isLoggedIn') !== 'true') {
        alert('Acesso negado! Faça login.');
        window.location.href = 'login.html';
      }
  
      // AGENDAMENTO DE CONSULTAS
      const formConsulta = document.getElementById('formConsulta');
      const listaConsultas = document.getElementById('listaConsultas');
  
      const consultas = JSON.parse(localStorage.getItem('consultas')) || [];
      consultas.forEach(addConsultaToList);
  
      formConsulta.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nomePaciente').value;
        const dataHora = document.getElementById('dataHoraConsulta').value;
        const consulta = { nome, dataHora };
        consultas.push(consulta);
        localStorage.setItem('consultas', JSON.stringify(consultas));
        addConsultaToList(consulta);
        formConsulta.reset();
      });
  
      function addConsultaToList(consulta) {
        const li = document.createElement('li');
        li.innerText = `${consulta.nome} - ${new Date(consulta.dataHora).toLocaleString()}`;
        listaConsultas.appendChild(li);
      }
    }
  });
  
  // FUNÇÃO DE LOGOUT
  function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  }
  