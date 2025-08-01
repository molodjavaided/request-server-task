import styles from "./Todo.module.css";
import { Link } from "react-router-dom";

function Todo({ id, title }) {
  const croppedTitle =
    title.length > 35 ? title.substring(0, 35) + "..." : title;

  return (
    <>
      <li className={styles.todo}>
        <Link to={`/todos/${id}`} className={styles.title}>
          {croppedTitle}
        </Link>
      </li>
    </>
  );
}

export default Todo;
