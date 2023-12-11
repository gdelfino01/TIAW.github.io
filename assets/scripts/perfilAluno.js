async function fetchUserDetails(userId) {
    try {
      const response = await fetch(`https://jsonserverfluentlinktiaw.gustavodelfino3.repl.co/aluno?id=${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  }
  
  async function excluirPerfil(userId) {
    if (confirm("Tem certeza de que deseja excluir o perfil?")) {
        try {
            const response = await fetch(`https://jsonserverfluentlinktiaw.gustavodelfino3.repl.co/aluno/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensagem de sucesso da exclusão
                window.location.href = 'login.html';
            } else {
                const errorData = await response.json();
                console.error(errorData.error); // Mensagem de erro, se houver
            }
        } catch (error) {
            console.error("Ocorreu um erro ao excluir o item:", error);
        }
    }
}
  
  async function updateUserDetails(user, usId) {
    if (user) {
      document.getElementById('user-name').textContent = user[usId].name;
      document.getElementById('user-lastName').textContent = user[usId].lastname;
      document.getElementById('user-CPF').textContent = user[usId].CPF;
      document.getElementById('user-email').textContent = user[usId].email;
      document.getElementById('user-password').textContent = user[usId].password;
    } else {
      alert('Usuário não encontrado');
    }
  } 

  function updateEditar(usId){
    if (usId){
      document.getElementById('btn-edit').href = `./editCadAluno.html?aluno&id=${usId}`;
    } else {
      alert('Usuário não encontrado');
    }
  }
  
  async function userDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
  
    let userType = '';
    if (urlParams.has('aluno')) {
      console.log('Esta URL se refere a um aluno');
      userType = 'aluno';
    } else if (urlParams.has('professor')) {
      console.log('Esta URL se refere a um professor');
      userType = 'professor';
    } else {
      console.log('Tipo não identificado');
    }
  
    const perfil = await fetchUserDetails(userId, userType);
    console.log(perfil);
    console.log(perfil[0].name);
    updateUserDetails(perfil, 0);
    updateEditar(userId);
  }
  
  const btnDelete = document.getElementById("btn-delete");
  btnDelete.addEventListener("click", function() {
    // Chama a função excluirPerfil passando o id do botão como parâmetro
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    excluirPerfil(userId);
  });


  userDetails();
  
  
