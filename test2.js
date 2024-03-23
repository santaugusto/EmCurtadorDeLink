import('node-fetch').then(async (nodeFetch) => {
    const fetch = nodeFetch.default;
  
    const bitlyAPI = (token) => {
      const apiUrl = 'https://api-ssl.bitly.com/v4';
  
      const encurtarUrl = async (urlLonga) => {
        try {
          const resposta = await fetch(`${apiUrl}/shorten`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              long_url: urlLonga,
            }),
          });
  
          const dados = await resposta.json();
          return dados.id;
        } catch (erro) {
          console.error('Erro ao encurtar a URL:', erro.message);
          throw erro;
        }
      };
  
      const expandirUrl = async (urlCurta) => {
        try {
          const resposta = await fetch(`${apiUrl}/expand?shortUrl=${urlCurta}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          const dados = await resposta.json();
          return dados.long_url;
        } catch (erro) {
          console.error('Erro ao expandir a URL:', erro.message);
          throw erro;
        }
      };
  
      return { encurtarUrl, expandirUrl };
    };
  
    // Substitua 'SEU_TOKEN_AQUI' pelo seu token de acesso do Bitly
    const bitly = bitlyAPI('711549716999288f8a5cecc96c915a728d459aac');
  
    // Exemplo de como encurtar uma URL
    const urlLonga = 'https://www.youtube.com/watch?v=qIGYM4S8x50&ab_channel=MatheusBattisti-HoradeCodar';
    try {
      const urlCurta = await bitly.encurtarUrl(urlLonga);
      console.log(`URL encurtada: ${urlCurta}`);
    } catch (erro) {
      console.error('Erro:', erro);
    }
  });
  