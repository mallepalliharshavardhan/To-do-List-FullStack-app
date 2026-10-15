import { useState } from 'react'

function Create({ onAdd }) {
  const [task, setTask] = useState('')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmedTask = task.trim()
    if (!trimmedTask) return

    setError('')
    setIsSaving(true)
    try {
      await onAdd(trimmedTask)
      setTask('')
    } catch (err) {
      setError(err.response?.data?.error || `Could not save task: ${err.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">New task</label>
      <input
        id="new-task"
        type="text"
        placeholder="What needs to get done?"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        maxLength={200}
      />
      <button className="primary-button" type="submit" disabled={isSaving || !task.trim()}>
        {isSaving ? 'Adding…' : 'Add task'}
      </button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  )
}

export default Create
