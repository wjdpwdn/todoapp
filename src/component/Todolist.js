import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

function Todolist({ todo }) {
  const handleUpdateTodo = (e) => {
    const updateTodo = {
      ...todo,
      check: !todo.check,
    };

    fetch(`http://localhost:3001/todo/${todo.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        updateTodo();
      })
      .catch((err) => console.log(err));
  };

  return (
    <li>
      <h4 className={todo.check ? "completed" : ""}>{todo.title}</h4>
      <Button variant="light" onClick={handleUpdateTodo}>
        ✔️
      </Button>
    </li>
  );
}
export default Todolist;
