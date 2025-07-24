import Todo from "../todo/Todo";
import styles from "./TodoList.module.css";
import EditTodoForm from "../edit-todoform/EditTodoForm";

function TodoList({
  todos,
  requestDeleteTodo,
  requestUpdateTodo,
  editTodo,
  cancelEdit,
  isLoading,
}) {
  return (
    <div className={styles.todolist}>
      {todos.map((todo) =>
        todo.isEdit ? (
          <EditTodoForm
            key={todo.id}
            id={todo.id}
            title={todo.title}
            requestUpdateTodo={requestUpdateTodo}
            editTodo={editTodo}
            cancelEdit={cancelEdit}
            isLoading={isLoading}
          />
        ) : (
          <Todo
            id={todo.id}
            key={todo.id}
            title={todo.title}
            editTodo={editTodo}
            requestDeleteTodo={requestDeleteTodo}
          />
        )
      )}
    </div>
  );
}

export default TodoList;
