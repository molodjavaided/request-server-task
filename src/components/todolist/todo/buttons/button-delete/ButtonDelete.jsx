import React from "react";

function ButtonDelete({ id, requestDeleteTodo }) {
  return (
    <button id={id} onClick={() => requestDeleteTodo(id)}>
      Delete
    </button>
  );
}

export default ButtonDelete;
