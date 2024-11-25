const { Router } = require('express');
 
const router = Router();
 
const { pawbuddy, getReceitas, deletarReceita } = require('../controller/receitasController');
//importar função nova do get
 

/**
 * @swagger
 * /store/receitaCriar:
 *   get:
 *     summary: Cria a receita
 *     responses:
 *       200:
 *         description: Cria a receita no banco de dados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
*/
router.post('/store/receitaCriar', pawbuddy);
router.post('/getReceitas', getReceitas)
router.delete('/deletarReceita', deletarReceita)

//criar nova rota para o get

module.exports = router;