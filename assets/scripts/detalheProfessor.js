async function fetchUserDetails(userId) {
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
      document.getElementById('user-telephone').textContent = user[usId].cellphone;
      document.getElementById('user-language').textContent = user[usId].language;
      document.getElementById('personal-id').textContent = user[usId].personalDescription;
      document.getElementById('class-id').textContent = user[usId].clasroomDescription;
      document.getElementById('link-discord').href = user[usId].discordLink;
      document.getElementById('link-teams').href = user[usId].teamsLink;
      document.getElementById('link-meet').href = user[usId].meetLink;
      document.getElementById('link-skype').href = user[usId].skypeLink;
      document.getElementById('user-photo').src = user[usId].photo;
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
  
    const perfil = await fetchUserDetails(userId);
    console.log(perfil);
    console.log(perfil[0].name);
    updateUserDetails(perfil, 0);
  
  }
  
  userDetails();
  
  