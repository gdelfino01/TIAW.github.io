// Função para lidar com o envio do formulário
async function submitForm(event) {
    event.preventDefault();
  
    // Obter dados do formulário
    const userName = document.getElementById('user-name').value;
    const userLastName = document.getElementById('user-lastName').value;
    const userCPF = document.getElementById('user-cpf').value;
    const userEmail = document.getElementById('user-email').value;
    const userPassword = document.getElementById('user-password').value;
  
    // Preparar os dados da requisição
    const requestBody = JSON.stringify({
      name: userName,
      lastname: userLastName,
      CPF: userCPF,
      email: userEmail,
      password: userPassword
    });
  
    try {
      // Realizar uma requisição POST usando fetch com async/await
      const response = await fetch('https://jsonserverfluentlinktiaw.gustavodelfino3.repl.co/aluno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
  
      if (response.ok) {
        // Produto adicionado com sucesso
        console.log('Usuário adicionado com sucesso');
        //Redirecionar para a página de home
        window.location.href = 'login.html';

      } else {
        // Lidar com erros
        console.error('Erro ao adicionar o usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error);
    }
  }
  
  
  // Event listener para o envio do formulário
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-aluno');
    form.addEventListener('submit', submitForm);
  });
  