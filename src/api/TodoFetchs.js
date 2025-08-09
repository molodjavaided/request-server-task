const API_URL = 'http://localhost:3000/todos'

export const getTodos = async (path, order, value) => {
  const response = await fetch(
    `${API_URL}?_sort=${path}&_order=${order}&q=${value}`
  );
  if (!response.ok) throw new Error('Ошибка в запросе на сервер')
  return response.json();
};

export const createTodo = async (value) => {
  const response = await fetch(API_URL, {
    method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          title: value,
          completed: false,
        }),
  });
  if (!response.ok) throw new Error ('Ошибка в добавлении задачи');
  return response.json()
}

export const updateTodo = async (id, newTitle) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          title: newTitle,
        }),
      });
    if (!response.ok) throw new Error('Задача не обновлена')
    return response.json()
}

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Ошибка в удалении задачи')
  return response.json()
}