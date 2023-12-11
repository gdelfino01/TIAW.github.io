async function fetchUserDetails(userId, userType) {
  try {
    const response = await fetch(`https://jsonserverfluentlinktiaw.gustavodelfino3.repl.co/professor?id=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
}


async function updateUserDetails(user, usId) {
  if (user) {
    document.getElementById('foto-perfil').src = user[usId].photo;
    document.getElementById('user-name').textContent = user[usId].name;
    document.getElementById('user-lastName').textContent = user[usId].lastName;
    document.getElementById('user-CPF').textContent = user[usId].CPF;
    document.getElementById('user-telephone').textContent = user[usId].cellphone;
    document.getElementById('user-language').textContent = user[usId].language;
    document.getElementById('user-photo').textContent = user[usId].photo;
    document.getElementById('personal-description').textContent = user[usId].personalDescription;
    document.getElementById('clasroom-description').textContent = user[usId].clasroomDescription;
    document.getElementById('user-discord').textContent = user[usId].discordLink;
    document.getElementById('user-teams').textContent = user[usId].teamsLink;
    document.getElementById('user-meet').textContent = user[usId].meetLink;
    document.getElementById('user-skype').textContent = user[usId].skypeLink;
    document.getElementById('user-email').textContent = user[usId].email;
    document.getElementById('user-password').textContent = user[usId].password;

  } else {
    alert('Usuário não encontrado');
  }
} 

function updateEditar(usId){
  if (usId){
    document.getElementById('btn-edit').href = `./editCadProfessor.html?professor&id=${usId}`;
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

userDetails();

async function deleteCad(id){
  if (confirm("Tem certeza de que deseja excluir o perfil?")) {
    try {
        const response = await fetch(`https://jsonserverfluentlinktiaw.gustavodelfino3.repl.co/professor/${id}`, {
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

const btnDelete = document.getElementById("btn-delete");
  btnDelete.addEventListener("click", function() {
    // Chama a função excluirPerfil passando o id do botão como parâmetro
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    deleteCad(userId);
  });
