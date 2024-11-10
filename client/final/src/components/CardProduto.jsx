import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const CardProduto = (props) => {
  const navigate = useNavigate();

  const id = props.id;

  const handleDelete = async (e) => {
    const id = props.id;
    const req = await fetch(`http://localhost:5000/produtos/excluir/${id}`, {
      method: "GET",
    });

    alert("Produto deletado com sucesso");
    navigate("/home");
  };

  return (
    <div>
        <Card border="primary" style={{ width: "17rem", height:"26rem" }}>
          <Card.Img
            variant="top"
            src="https://assets.goal.com/images/v3/blt2aaca933046f8b00/Cristiano%20Ronaldo%20Portugal%202024%20(4).jpg?auto=webp&format=pjpg&width=3840&quality=60"
          />
          <Card.Body>
            <Card.Title>{props.nome} </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Preço: {props.preco}{" "}
            </Card.Subtitle>
            <Card.Text>
              <b> Descrição:</b> {props.descricao}
            </Card.Text>
            <Card.Text>
              <b> Categoria:</b> {props.categoria}
            </Card.Text>
            <Card.Link href={`/produtos/editar/${props.id}`}>
              <Button variant="warning" type="button">
                Editar
              </Button>
            </Card.Link>
            <Card.Link >
              <Button variant="danger" type="button" onClick={handleDelete}>
                Excluir
              </Button>
            </Card.Link>
          </Card.Body>
        </Card>
    </div>
  );
};

export default CardProduto;
