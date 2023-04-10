import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function Todoinput({ addTodo }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title) {
      addTodo({
        title: title,
        id: Date.now(),
        check: false,
      });
      setTitle("");
    }
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <form action="" method="post" className="from" onSubmit={handleSubmit}>
      <InputGroup size="lg">
        <InputGroup.Text id="inputGroup-sizing-lg">뭐먹을까</InputGroup.Text>
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleChange}
          required
        />
        <Button type="submit">입력</Button>
      </InputGroup>
    </form>
  );
}

export default Todoinput;
