import "./App.css";
import Todoinput from "./component/Todoinput";
import Todolist from "./component/Todolist";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getTodo();
  }, [...todoList]);

  const getTodo = () => {
    return fetch("http://localhost:3001" + "/todo/")
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data);
      });
  };

  const addTodo = ({ title, id, check }) => {
    const newTodo = {
      id: id,
      title: title,
      check: check,
    };
    fetch("http://localhost:3001" + "/todo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then((res) => {
      if (res.status === 201) {
        getTodo();
      }
    });
  };

  const deleteCheckedTodo = () => {
    const checkedTodos = todoList.filter((todo) => todo.check === true);
    checkedTodos.forEach((todo) => {
      fetch(`http://localhost:3001/todo/${todo.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.status === 200) {
          getTodo();
        }
      });
    });
  };

  const deleteAllTodo = () => {
    todoList.forEach((todo) => {
      fetch(`http://localhost:3001/todo/${todo.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.status === 200) {
          getTodo();
        }
      });
    });
    window.open("https://www.youtube.com/watch?v=LIN_QEBviJc", "_blank");
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Just Do Eat</h1>
        <Todoinput className="input" addTodo={addTodo}></Todoinput>
        <div className="deleteButton">
          <Button variant="primary" onClick={deleteCheckedTodo}>
            먹은거 치우기
          </Button>
          <Button variant="secondary" onClick={deleteAllTodo}>
            다이어트 시작
          </Button>
        </div>
        <ul>
          {todoList.length === 0 ? (
            <h1>텅~</h1>
          ) : (
            todoList.map((todo, index) => {
              return <Todolist key={index} todo={todo} />;
            })
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
