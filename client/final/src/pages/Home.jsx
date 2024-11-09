import CardProduto from "../components/CardProduto";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";

const url = "http://localhost:5001/";

const Home = () => {
  const [produtos, setProdutos] = useState([]);

  // Resgate de dados da api
  useEffect(() => {
    async function fetchData() {
      try {
        // busca os dados
        const res = await fetch(url);
        // converte o resultado pra json
        const prods = await res.json();
        setProdutos(prods);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <Container>
        <h1>Lista de produtos</h1>

        <div className="d-grid col-2 gap-2 d-inline-flex justify-content-center">
          <Button
            variant="primary"
            size="lg"
            className="mb-3 d-inline-flex justify-content-center"
            onClick={() => {
            
            }}
          >
            <span
              className="material-symbols-outlined flex"
              style={{ fontSize: "30px" }}
            >
              add_circle
            </span>
            Cadastrar
          </Button>
        </div>

        <Form.Group controlId="formGridCategoria">
          <Form.Label>Selecione uma categoria</Form.Label>
          <Form.Select defaultValue="...">
            <option>Cereal</option>
            <option>Bebidas</option>
          </Form.Select>
        </Form.Group>

        <div className="lista-produtos mt-3">
          <CardProduto />
          {produtos.map((prod) => (
            <CardProduto
              key={prod.it_id}
              id={prod.it_id}
              nome={prod.it_nome}
              descricao={prod.it_desc}
              preco={prod.it_preco}
              data={prod.it_dt_cad}
              categoria={prod.it_cat}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
