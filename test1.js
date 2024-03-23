const https = require('https');

const longUrl = "https://animesflix.net/assistir/887-shingeki-no-kyojin--attack-on-titan-/episode/3x3/";
const bitlyAccessToken = "SUA_CHAVE_DE_API_BITLY"; // Substitua pela sua chave de API Bitly

function encurtarUrl(longUrl) {
  const opcoes = {
    hostname: 'api-ssl.bitly.com',
    path: '/v4/shorten',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bitlyAccessToken}`,
      'Content-Type': 'application/json'
    }
  };

  const requisicao = https.request(opcoes, (resposta) => {
    let dados = '';

    resposta.on('data', (pedaco) => {
      dados += pedaco;
    });

    resposta.on('end', () => {
      const respostaJson = JSON.parse(dados);
      const urlCurta = respostaJson.id;
      console.log('Link original:', longUrl);
      console.log('Link encurtado:', urlCurta);
    });
  });

  requisicao.on('error', (erro) => {
    console.error('Erro ao encurtar o URL:', erro.message);
  });

  requisicao.write(JSON.stringify({ long_url: longUrl }));
  requisicao.end();
}

encurtarUrl(longUrl);
