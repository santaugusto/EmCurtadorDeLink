const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '!e1969',
  database: 'cadastro'
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

class Tabelas {
  constructor(conexao) {
    this.conexao = conexao;
  }

  criarTabelaDeusuariosLinkCort() {
    const sql = `
      CREATE TABLE IF NOT EXISTS usuariosLinkCort (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        senha VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      )`;

    this.conexao.query(sql, (err) => {
      if (err) {
        console.error('Erro ao criar tabela usuariosLinkCort:', err);
      } else {
        console.log('Tabela usuariosLinkCort criada com sucesso!');
      }
    });
  }

  criarTabelaDeurlsLinkCort() {
    const sql = `
      CREATE TABLE IF NOT EXISTS urlsLinkCort (
        id INT NOT NULL AUTO_INCREMENT,
        urloriginal VARCHAR(255) NOT NULL,
        urlcortada VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      )`;

    this.conexao.query(sql, (err) => {
      if (err) {
        console.error('Erro ao criar tabela urlsLinkCort:', err);
      } else {
        console.log('Tabela urlsLinkCort criada com sucesso!');
      }
    });
  }
}

module.exports = { conexao, Tabelas };
