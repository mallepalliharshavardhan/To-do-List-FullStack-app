import { useEffect, useState } from 'react'
import axios from 'axios'
import Create from './Create'

const API_URL = 'http://localhost:8000'

function getErrorMessage(err) {
  return err.response?.data?.error || err.message || 'Something went wrong.'
}

function Home() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    let isCurrent = true

    axios.get(`${API_URL}/todos`)
      .then((response) => {
        if (isCurrent) setTodos(response.data)
      })
      .catch((err) => {
        if (isCurrent) setError(`Could not load tasks: ${getErrorMessage(err)}`)
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false)
      })

    return () => {
      isCurrent = false
    }
  }, [])

  const addTodo = async (task) => {
    const response = await axios.post(`${API_URL}/add`, { task })
    setTodos((currentTodos) => [response.data, ...currentTodos])
  }

  const updateTodo = async (todo, updates) => {
    setError('')
    try {
      const response = await axios.patch(`${API_URL}/todos/${todo._id}`, updates)
      setTodos((currentTodos) =>
        currentTodos.map((item) => item._id === todo._id ? response.data : item),
      )
      setEditingId(null)
      setEditText('')
    } catch (err) {
      setError(`Could not update task: ${getErrorMessage(err)}`)
    }
  }

  const deleteTodo = async (todo) => {
    setError('')
    try {
      await axios.delete(`${API_URL}/todos/${todo._id}`)
      setTodos((currentTodos) => currentTodos.filter((item) => item._id !== todo._id))
    } catch (err) {
      setError(`Could not delete task: ${getErrorMessage(err)}`)
    }
  }

  const remainingCount = todos.filter((todo) => !todo.completed).length

  return (
    <main className="page-shell">
      <section className="todo-app" aria-labelledby="page-title">
        <header>
          <h1 id="page-title">My to-do list</h1>
          <p>A small list of things to get done.</p>
        </header>
        <Create onAdd={addTodo} />
        <div className="list-heading">
          <h2>Your tasks</h2>
          <span className="task-count">
            {remainingCount} left
          </span>
        </div>
        {error && <p className="page-error" role="alert">{error}</p>}
        {isLoading ? (
          <p className="empty-state">Loading tasks...</p>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Add one above.</p>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li className={`todo-item${todo.completed ? ' is-complete' : ''}`} key={todo._id}>
                <input
                  className="complete-checkbox"
                  type="checkbox"
                  checked={Boolean(todo.completed)}
                  onChange={() => updateTodo(todo, { completed: !todo.completed })}
                  aria-label={`${todo.completed ? 'Mark' : 'Complete'} ${todo.task}`}
                />
                {editingId === todo._id ? (
                  <form
                    className="edit-form"
                    onSubmit={(event) => {
                      event.preventDefault()
                      const task = editText.trim()
                      if (task) updateTodo(todo, { task })
                    }}
                  >
                    <input
                      aria-label="Edit task"
                      value={editText}
                      onChange={(event) => setEditText(event.target.value)}
                      maxLength={200}
                      autoFocus
                    />
                    <button className="text-button" type="submit">Save</button>
                    <button
                      className="text-button muted-button"
                      type="button"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <span className="task-text">{todo.task}</span>
                    <div className="item-actions">
                      <button
                        className="icon-button"
                        type="button"
                        onClick={() => {
                          setEditingId(todo._id)
                          setEditText(todo.task)
                        }}
                        aria-label={`Edit ${todo.task}`}
                      >
                        Edit
                      </button>
                      <button
                        className="icon-button delete-button"
                        type="button"
                        onClick={() => deleteTodo(todo)}
                        aria-label={`Delete ${todo.task}`}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default Home
