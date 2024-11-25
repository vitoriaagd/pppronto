const { Router } = require('express');
const { storeUsuario, login } = require('../controller/cadastroController');
 
const router = Router();
 
router.post('/store/usuario', storeUsuario);

/**
* @swagger
* /store/usuario:
*   get:
*     summary: Cria o usuário
*     responses:
*       200:
*         description: Cria o usuário no banco de dados
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/

router.post('/store/login', login);

/**
* @swagger
* /store/login:
*   get:
*     summary: Faz login
*     responses:
*       200:
*         description: Salva login no banco de dados
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*/

 
module.exports = router;