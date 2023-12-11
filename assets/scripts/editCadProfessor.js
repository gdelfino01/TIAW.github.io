// Função para lidar com o envio do formulário
async function submitForm(event) {
    event.preventDefault();

    // Obter dados do formulário
    const teacherName = document.getElementById('teacher-name').value;
    const teacherLastName = document.getElementById('teacher-lastName').value;
    const teacherCPF = document.getElementById('teacher-cpf').value;
    const teacherTelephone = document.getElementById('teacher-telephone').value;
    const teacherLanguage = document.getElementById('product-category').value;
    const teacherImage = document.getElementById('product-image-url').value;
    const teacherPersonal = document.getElementById('personal-description').value;
    const teacherClasroom = document.getElementById('clasroom-description').value;
    const teacherDiscord = document.getElementById('link-discord').value;
    const teacherMeet = document.getElementById('link-meet').value;
    const teacherSkype = document.getElementById('link-skype').value;
    const teacherTeams = document.getElementById('link-teams').value;
    const teacherEmail = document.getElementById('user-email').value;
    const teacherPassword = document.getElementById('user-password').value;

    // Realizar validação, se necessário

    // Preparar os dados da requisição
    const requestBody = {
        name: teacherName,
        lastName: teacherLastName,
        CPF: teacherCPF,
        language: teacherLanguage,
        photo: teacherImage,
        email: teacherEmail,
        cellphone: teacherTelephone,
        password: teacherPassword,
        personalDescription: teacherPersonal,
        clasroomDescription: teacherClasroom,
        discordLink: teacherDiscord,
        meetLink: teacherMeet,
        skypeLink: teacherSkype,
        teamsLink: teacherTeams
    };

    editCard(requestBody);

}


async function editCard(newData) {
    
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (confirm("Tem certeza de que deseja editar o perfil?")) {
      try {
        const response = await fetch(`https://jsonserverfluentlinktiaw.gustavodelfino3.repl.co/professor/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData) // Os novos dados que você quer atualizar
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data.message); // Mensagem de sucesso da edição
          window.location.href = `perfilProf.html?professor&id=${userId}`;// Redirecionar para outra página ou realizar outra ação, se necessário
        } else {
          const errorData = await response.json();
          console.error(errorData.error); // Mensagem de erro, se houver
        }
      } catch (error) {
        console.error("Ocorreu um erro ao editar o item:", error);
      }
    }
  }


// Função para carregar as categorias do servidor e preencher o dropdown
async function loadCategories() {
    const categoryDropdown = document.getElementById('product-category');

    try {
        const response = await fetch('https://jsonserverfluentlinktiaw.gustavodelfino3.repl.co/idiomas');
        const categories = await response.json();

        // Limpar opções existentes
        categoryDropdown.innerHTML = '';

        // Adicionar a opção inicial vazia e desativada
        const initialOption = document.createElement('option');
        initialOption.value = '';
        initialOption.text = 'Selecione uma categoria';
        initialOption.disabled = true;
        initialOption.selected = true;
        categoryDropdown.appendChild(initialOption);

        // Adicionar as novas opções
        categories.forEach((category) => {
            const option = document.createElement('option');
            option.value = category;
            option.text = category;
            categoryDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar as categorias:', error);
    }
}

// Event listener para o envio do formulário
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-professor');
    form.addEventListener('submit', submitForm);

    // Chamar a função para carregar as categorias
    loadCategories();
});