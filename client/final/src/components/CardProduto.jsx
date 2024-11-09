import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const CardProduto = (props) => {
  const navigate = useNavigate();

  const id = props.id;
  const [status, setStatus] = useState();
  const [newStatus, setNewStatus] = useState();

  const handleChangeStatus = async (e) => {
    e.preventDefault();
    if (newStatus != status) {
      const task = { id: id, status: newStatus };
      console.log(task);
      const req = await fetch("http://localhost:5001/tarefa/alterarstatus", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      alert("Status alterado com sucesso");
    } else {
      alert("Status permanece o mesmo");
    }
  };

  const handleDelete = async (e) => {
    const id = props.id;
    const req = await fetch(`http://localhost:5001/tarefa/excluir/${id}`, {
      method: "GET",
    });

    alert("Tarefa deletada com sucesso");
    navigate("/home");
  };

  return (
    <div>
      <Form onSubmit={handleChangeStatus}>
        <Card border="primary" style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://assets.goal.com/images/v3/blt2aaca933046f8b00/Cristiano%20Ronaldo%20Portugal%202024%20(4).jpg?auto=webp&format=pjpg&width=3840&quality=60"
          />
          <Card.Body>
            <Card.Title>Nome Produto {props.nome} </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Preço:{props.preco}{" "}
            </Card.Subtitle>
            <Card.Text>
              <b> Descrição:</b> <br></br> {props.descricao}
            </Card.Text>
            <Card.Text>
              <b> Categoria:</b> <br></br> {props.categoria}
            </Card.Text>
            <Card.Link href={`/tarefa/edicao/${props.id}`}>
              <Button variant="warning" type="button">
                Editar
              </Button>
            </Card.Link>
            <Card.Link href={`/tarefa/excluir/${props.id}`}>
              <Button variant="danger" type="button" onClick={handleDelete}>
                Excluir
              </Button>
            </Card.Link>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
};

export default CardProduto;
