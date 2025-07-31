import Todo from "../todo/Todo";
import styles from "./TodoList.module.css";

function TodoList({ todos }) {
  return (
    <>
      <ul className={styles.todolist}>
        {todos.map((todo) => (
          <Todo key={todo.id} id={todo.id} title={todo.title} />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
