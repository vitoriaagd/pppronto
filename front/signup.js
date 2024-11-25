// Adiciona um ouvinte de evento ao botão com o ID 'criarconta'.
// Quando o botão é clicado, a função assíncrona é executada.
document.getElementById('criarconta').addEventListener('click', async function(event) {
    // Impede o comportamento padrão do evento (que seria submeter o formulário e recarregar a página).
    event.preventDefault();

    // Obtém os valores dos campos de entrada 'email' e 'senha' e armazena em variáveis.
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Cria um objeto com os dados do formulário para enviar na requisição.
    let data = {email, senha};

    // Faz uma requisição POST para o endpoint da API especificado.
    // Envia os dados do formulário no corpo da requisição no formato JSON.
    const response = await fetch('http://localhost:3001/api/store/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });

    // Espera a resposta da requisição e a converte para JSON.
    let content = await response.json();
    let id = content.data.userId
    localStorage.setItem('userId', id)

    // Verifica se a resposta indica sucesso.
    if (content.success) {        
        // Se for bem-sucedido, mostra uma mensagem de sucesso e redireciona para 'home.html'.
        alert("SUCESSO");
        window.location.href = "home.html";
    } else {
        // Se houver um erro, mostra uma mensagem de erro.
        alert('DEU MERDA');
    }
});
