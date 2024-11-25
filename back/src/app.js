const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const router_receita = require("./routes/receitasRouter")
const cadastroRouter = require("./routes/cadastroRouter")
const app = express();
 
app.set('port', process.env.PORT || 3005);
app.use(cors());
app.use(express.json());
app.use('/api', router_receita)
app.use('/api', cadastroRouter)
 
module.exports = app;