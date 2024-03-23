
// Importando o Express e o Cors
const express = require('express');
const cors = require('cors');
const app = express();

// Configurando o middleware para lidar com dados JSON
app.use(express.json());

// Adicionando o middleware do cors
app.use(cors());

// Configurando uma rota para lidar com os dados do formulário
app.post('/submit', (req, res) => {
    const { name, email, password } = req.body;

    // Aqui, você pode fazer o que quiser com os dados, como salvá-los no banco de dados, etc.
    console.log('Nome:', name);
    console.log('E-mail:', email);
    console.log('Senha:', password);

    // Envie uma resposta de sucesso
    res.status(200).send('Dados recebidos com sucesso!');
});

// Configurando o servidor para ouvir na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
