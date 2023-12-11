document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;
  const userType = document.getElementById('userType').value;

  try {
    const response = await fetch(`https://jsonserverfluentlinktiaw.gustavodelfino3.repl.co/${userType}`);
    const userData = await response.json();

    const user = userData.find(u => u.email === email && u.password === password); 
    if (user) {
      // Redireciona para a página de dashboard com os dados do usuário como parâmetros na URL
      if(userType == 'professor')
      {
        window.location.href = `perfilProf.html?${userType}&id=${user.id}`;
      }
      else
      {
        window.location.href = `perfilAluno.html?${userType}&id=${user.id}`;
      }
      
    } else {
      document.getElementById('loginMessage').innerText = 'Credenciais inválidas. Por favor, tente novamente.';
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
});
