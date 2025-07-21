import Todo from "./todo/Todo";
import styles from "./TodoList.module.css";
import EditTodoForm from "./edit-todoform/EditTodoForm";

function TodoList({ todos, requestDeleteTodo, requestUpdateTodo, editTodo }) {
  return (
    <div className={styles.todolist}>
      {/* {todos.map(({ id, title }) =>
        isEdit ? (
          <EditTodoForm
            key={id}
            id={id}
            currentTitle={title}
            requestUpdateTodo={requestUpdateTodo}
          />
        ) : (
          <Todo
            id={id}
            key={id}
            title={title}
            requestDeleteTodo={requestDeleteTodo}
            editTodo={editTodo}
          />
        )
      )} */}

      {todos.map((todo) =>
        todo.isEdit ? (
          <EditTodoForm
            key={todo.id}
            id={todo.id}
            currentTitle={todo.title}
            requestUpdateTodo={requestUpdateTodo}
          />
        ) : (
          <Todo
            id={todo.id}
            key={todo.id}
            title={todo.title}
            requestDeleteTodo={requestDeleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
}

export default TodoList;
