// home.js
const formContainer = document.getElementById('form-container');
const toggleFormButton = document.getElementById('toggle-form');
const recipeForm = document.getElementById('recipe-form');
const feed = document.getElementById('feed');
const modal_task = document.getElementById("task_open")
const title_task = document.getElementById('title_task')
const b_sair = document.getElementById("b_sair")
const b_excluir = document.getElementById("b_excluir")

toggleFormButton.addEventListener('click', () => {
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
});

const botão_criar = document.getElementById("b-criar");

botão_criar.addEventListener("click", async function(event) {
    event.preventDefault();
    
    let title = document.getElementById("recipe-title").value;
    let conteudo = document.getElementById("recipe-content").value;
    let animal_desc = document.getElementById('animal-content').value;
    let userId = localStorage.getItem('userId');
    
    let data = { title, conteudo, animal_desc, userId };
    
    const response = await fetch('http://localhost:3001/api/store/receitaCriar', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(data)
    });
    
    let content = await response.json();
    console.log(content)
    
    if (content.success) {
        // Exibe a receita no feed com o nome de usuário
        criarReceitas({ title, desc_receita: conteudo, username: content.username });
        recipeForm.reset();
    } else {
        alert("Erro ao adicionar receita");
    }
    location.reload()
});

// Função para carregar receitas na inicialização da página
document.addEventListener('DOMContentLoaded', async function buscarReceitas(event) {
    event.preventDefault();

    let user_id = localStorage.getItem('userId');

    let response = await fetch("http://localhost:3001/api/getReceitas", {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
        body: JSON.stringify({ user_id })
    });

    let content = await response.json();

    if (content.success) {
        content.data.forEach(function (receita) {
            criarReceitas(receita);
        });
    } else {
        console.log("Erro ao carregar receitas");
    }
});

function criarReceitas(receita) {
    let { id, title, desc_receita, animal_desc, nome, user_id } = receita;
    
    const feedItem = document.createElement('div');
    feedItem.classList.add('feed-item');
    feedItem.id = 'feed-item';

    feedItem.innerHTML = `<h3>${title}</h3><p><b>Descrição:</b> ${desc_receita}</p><p><b>Descrição Animal:</b> ${animal_desc}</p><small>Postado por: ${nome}</small>`;
    
    feed.appendChild(feedItem);
    
    formContainer.style.display = 'none';

    feedItem.addEventListener("click", () => abrirReceita( receita.id, receita.title, receita.desc_receita, receita.animal_desc, receita.nome, receita.user_id));

}


function abrirReceita(id, title, desc_receita, animal_desc, nome, user_id) {
    modal_task.style.opacity = '1'
    modal_task.style.visibility = 'visible'
    let userId = localStorage.getItem('userId');

    if (String(user_id) === userId) {

        title_task.textContent = title
        b_excluir.style.opacity = '1'
        b_excluir.style.visibility = 'visible'

        b_excluir.replaceWith(b_excluir.cloneNode(true));
        const novoExcluir = document.getElementById("b_excluir");

        novoExcluir.addEventListener('click', async function excluirReceita(event){
            event.preventDefault()
    
            let response = await fetch("http://localhost:3001/api/deletarReceita", {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json;charset=UTF-8' },
                body: JSON.stringify({ id })
            });
    
            let content = await response.json();
            console.log(content)
    
            if (content.success) {
                location.reload()
            } else {
                console.log("deu ruim")
            }
    
        })

    } else {
        title_task.textContent = "Você não pode excluir está Receita"
        b_excluir.style.opacity = '0'
        b_excluir.style.visibility = 'hidden'
        return
    }


}

b_sair.addEventListener("click", function(){
    modal_task.style.opacity = '0'
    modal_task.style.visibility = 'hidden'
})