// Importação dos components do react-bootstrap utilizados
import Container from "react-bootstrap/esm/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

// Importação do useState pra monitorar as variáveis
import { useState, useEffect } from "react";

// Importação do useNavigate pra mudança da página
import { useNavigate } from "react-router-dom";

const CadastroProduto = () => {
  // variaveis pro usuario
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Eletrônicos");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");

  // variaveis pro alerta
  const [alertaClass, setAlertaClass] = useState("mb-3 d-none");
  const [alertaMensagem, setAlertaMensagem] = useState("");

  // variavel pro navigate
  const navigate = useNavigate();

  // variavel pras categorias
  const [cats, setCats] = useState([]);

  // Resgate de dados da api para preencher o select de categoria
  useEffect(() => {
    async function fetchData() {
      try {
        // busca os dados
        const req = await fetch("http://localhost:5000/produtos/categorias");
        // converte o resultado pra json
        const categoria = await req.json();
        setCats(categoria);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  //Função pra enviar os dados do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Cliquei");
    if (!nome == "") {
      if (!descricao == "") {
        if (!preco == "") {
          const prod = { nome, descricao, categoria, preco, imagem };
          const req = await fetch("http://localhost:5000/produtos/criar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prod),
          });

          alert("Produto cadastrado com sucesso");
          setNome("");
          setDescricao("");
          setPreco("");
          setImagem("");
          // navigate("/login");
        } else {
          setAlertaClass("mb-3");
          setAlertaMensagem("O campo preço não pode ser vazio");
        }
      } else {
        setAlertaClass("mb-3");
        setAlertaMensagem("O campo descrição não pode ser vazio");
      }
    } else {
      setAlertaClass("mb-3");
      setAlertaMensagem("O campo nome não pode ser vazio");
    }
  };

  return (
    <div>
      <Container>
        <h1>Cadastrar Produto</h1>
        <form onSubmit={handleSubmit} className="mt-3">
          <Row>
            <Col xs={6}>
              {/* caixinha do nome */}
              <FloatingLabel
                controlId="floatingInputName"
                label="Nome"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                  }}
                />
              </FloatingLabel>

              <Form.Group className="mb-3" controlId="formGridDescricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Form.Group>

              {/* select da categoria*/}
              <Form.Group controlId="formGridTipo" className="mb-3">
                <Form.Label>Tipo de produto</Form.Label>
                <Form.Select
                  value={categoria}
                  onChange={(e) => {
                    setCategoria(e.target.value);
                  }}
                >
                  {cats.map((cat) => (
                    <option key={cat.cat_id} value={cat.cat_id}>
                      {cat.cat_nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* caixinha de numero */}
              <FloatingLabel
                controlId="floatingInputPreco"
                label="Preco"
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  step="0.1"
                  placeholder="Digite so preço"
                  value={preco}
                  onChange={(e) => {
                    setPreco(e.target.value);
                  }}
                />
              </FloatingLabel>
            </Col>
            <Col xs={6}>
              {" "}
              <Form.Group controlId="formFileLg" className="mb-3">
                <Image
                  src="https://cdn.awsli.com.br/production/static/img/produto-sem-imagem.gif"
                  rounded
                  width={300}
                  height={250}
                />
                <br></br>
                <Form.Label className="mt-4">
                  Envie a foto do produto
                </Form.Label>
                <Form.Control
                  type="file"
                  size="lg"
                  value={imagem}
                  onChange={(e) => {
                    setImagem(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Alerta, caso possua algum erro*/}
          <Alert key="danger" variant="danger" className={alertaClass}>
            {alertaMensagem}
          </Alert>

          {/* Botão pra enviar o formulário*/}
          <Button variant="primary" size="lg" type="submit">
            Cadastrar
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default CadastroProduto;
