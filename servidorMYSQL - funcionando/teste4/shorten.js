// shorten.js

const express = require('express');
const crypto = require('crypto');

const app = express();
const port = 3000;

// Mapeamento de URLs longas para URLs curtas
const urlMapping = {};

// Função para encurtar a URL
function shortenURL(longURL) {
  const shortPath = crypto.createHash('md5').update(longURL).digest('hex').slice(0, 6);
  const shortURL = `http://localhost:${port}/${shortPath}`;
  urlMapping[shortPath] = longURL;
  return shortURL;
}

// Rota para encurtar uma URL
app.post('/shorten', express.json(), (req, res) => {
  const longURL = req.body.long_url;

  if (!longURL) {
    return res.status(400).json({ error: 'Por favor, forneça uma URL longa.' });
  }

  const shortURL = shortenURL(longURL);
  res.json({ short_url: shortURL });
});

// Rota para redirecionar para a URL original
app.get('/:shortPath', (req, res) => {
  const longURL = urlMapping[req.params.shortPath];

  if (longURL) {
    res.redirect(302, longURL);
  } else {
    res.status(404).send('URL não encontrada.');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
