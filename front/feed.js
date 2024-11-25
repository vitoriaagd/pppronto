const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
 
const app = express();
const db = new sqlite3.Database(':memory:'); // Usando uma base de dados em memória
 
// Configuração do diretório de visualizações e mecanismo de visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
 
// Configurando a base de dados
db.serialize(() => {
db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT, date TEXT, content TEXT, image TEXT)");
db.run("INSERT INTO posts (title, date, content, image) VALUES ('Postagem 1', '14 de Agosto de 2024', 'Conteúdo da Postagem 1', 'https://via.placeholder.com/600x400')");
db.run("INSERT INTO posts (title, date, content, image) VALUES ('Postagem 2', '13 de Agosto de 2024', 'Conteúdo da Postagem 2', 'https://via.placeholder.com/600x400')");
db.run("INSERT INTO posts (title, date, content, image) VALUES ('Postagem 3', '12 de Agosto de 2024', 'Conteúdo da Postagem 3', 'https://via.placeholder.com/600x400')");
});
 
// Rota para o feed de postagens
app.get('/', (req, res) => {
    db.all("SELECT * FROM posts", [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.render('index', { posts: rows });
    });
});
 
// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});