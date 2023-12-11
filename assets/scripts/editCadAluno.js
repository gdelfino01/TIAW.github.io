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
    const requestBody = {
      name: userName,
      lastname: userLastName,
      CPF: userCPF,
      email: userEmail,
      password: userPassword
    };
  
    editCard(requestBody);
    
  }
  
  
  // Event listener para o envio do formulário
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-aluno');
    form.addEventListener('submit', submitForm);
  });
  

  async function editCard(newData) {
    
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (confirm("Tem certeza de que deseja editar o perfil?")) {
      try {
        const response = await fetch(`https://jsonserverfluentlinktiaw.gustavodelfino3.repl.co/aluno/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData) // Os novos dados que você quer atualizar
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data.message); // Mensagem de sucesso da edição
          window.location.href = `perfilAluno.html?aluno&id=${userId}`;// Redirecionar para outra página ou realizar outra ação, se necessário
        } else {
          const errorData = await response.json();
          console.error(errorData.error); // Mensagem de erro, se houver
        }
      } catch (error) {
        console.error("Ocorreu um erro ao editar o item:", error);
      }
    }
  }
