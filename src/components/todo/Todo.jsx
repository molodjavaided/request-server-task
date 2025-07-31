import styles from "./Todo.module.css";
import { Link } from "react-router-dom";

function Todo({ id, title }) {
  return (
    <>
      <li>
        <Link to={`/todos/${id}`} className={styles.todo}>
          <div className={styles.title}>{title}</div>
        </Link>
      </li>
    </>
  );
}

export default Todo;
