// Obtém o elemento do botão "criar conta" do DOM
let criarconta = document.getElementById('criarconta');

// Adiciona um evento de clique ao botão
criarconta.onclick = async function() {
    // Obtém os valores dos campos de nome, e-mail e senha do formulário
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    // Cria um objeto 'data' contendo os valores coletados
    let data = { nome, email, senha };

    // Envia uma requisição POST para o servidor com os dados do usuário
    const response = await fetch('http://localhost:3001/api/store/usuario', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8' }, // Define o tipo de conteúdo como JSON
        body: JSON.stringify(data) // Converte o objeto 'data' em uma string JSON
    });

    // Converte a resposta do servidor para um objeto JSON
    let content = await response.json();

    // Verifica se a criação da conta foi bem-sucedida
    if (content.success) {
        alert('Sucesso!'); // Mostra uma mensagem de sucesso
    } else {
        alert('Algo deu errado, tente novamente!'); // Mostra uma mensagem de erro
    }

    // Redireciona para a página "home.html" após a operação
    let reload = await content;
    // reload = location.reload; // Linha comentada que tentava recarregar a página
    reload = window.location.href = 'home.html'; // Redireciona para a página "home.html"
}
