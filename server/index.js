const express = require("express");
const app = express();
const port = 5000;
const mysql = require("mysql2");

const path = require("path");

//Ler o body e transforma-lo em JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//Código para o Cors
const cors = require("cors");
const { isStringObject } = require("util/types");
const { stringify } = require("querystring");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.get("/", (req, res) => {
  res.status(200);
  res.end();
});

// Rota para criação do usuário
app.post("/usuario/criar", (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  const tipo = req.body.tipo;

  const sql = `INSERT INTO usuario (usu_nome, usu_email, usu_senha, usu_tipo ) VALUES ('${nome}', '${email}', '${senha}', '${tipo}')`;

  conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage).end();
    } else {
      res.status(200).json("Cadastro efetuado").end();
    }
  });
});

// Rota para login de usuário
app.get("/usuario/entrar", (req, res) => {
  const email = req.query.email;
  const senha = req.query.senha;
  console.log(email, senha);

  const sql = `SELECT * FROM usuario WHERE usu_email = '${email}' AND usu_senha = '${senha}' `;

  conn.query(sql, (erro, result) => {
    if (erro) {
      console.log(erro);
      res.status(500).json(erro).end();
    } else {
      console.log(result);
      if (result.length === 0) {
        res.status(500).json("Usuário ou senha incorretas").end();
      } else {
        res.status(200).json(JSON.stringify(result)).end();
        // console.log(JSON.stringify(result));
      }
    }
  });
});

app.get("/produtos/categorias", (req, res) => {
  const sql = `SELECT * FROM categoria`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados);
      res.end();
    }
  });
});

app.get("/produtos", (req, res) => {
  const sql = `SELECT * FROM item_categoria`;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados);
      res.end();
    }
  });
});

// Rota para criação do produto
app.post("/produtos/criar", (req, res) => {
  const nome = req.body.nome;
  const descricao = req.body.descricao;
  const categoria = req.body.categoria;
  const preco = req.body.preco;
  const imagem = req.body.imagem;

  const sql = `INSERT INTO itens (it_nome, it_desc, it_cat, it_preco, it_imagem ) VALUES ('${nome}', '${descricao}', '${categoria}', '${preco}', '${imagem}')`;

  conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage).end();
    } else {
      res.status(200).json("Cadastro de produto efetuado").end();
    }
  });
});

// Rota para deletar um produto
app.get("/produtos/excluir/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM itens WHERE it_id = '${id}'`;

  conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage).end();
    } else {
      res.status(200).json("Produto deletado com sucesso").end();
    }
  });
});


// Rota para selecionar um produto
app.get("/produtos/edicao/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM item_categoria WHERE it_id = '${id}' `;

  conn.query(sql, (erro, dados) => {
    if (erro) {
      console.log(erro);
    } else {
      res.json(dados);
      res.end();
    }
  });
});

// Rota para atualizar um produto
app.put("/produtos/edicao/:id", (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const descricao = req.body.descricao;
  const categoria = req.body.categoria;
  const preco = req.body.preco;
  const imagem = req.body.imagem;

  const sql = `UPDATE itens SET it_nome = '${nome}', it_desc = '${descricao}', it_cat = '${categoria}', it_preco = '${preco}', it_imagem = '${imagem}' WHERE it_id = '${id}' `;

  conn.query(sql, (erro) => {
    if (erro) {
      console.log(erro);
      res.status(500).end();
    } else {
      res.status(200).end();
    }
  });
});

//Criar variavel pra conexao com o banco
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crudfinal",
});

// Código pra só iniciar a aplicação se conectar ao banco primeiro
conn.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("Conectado com sucesso");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  }
});
