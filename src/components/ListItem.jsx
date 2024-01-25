import { useState } from 'react'
import formatDate from '../Helpers.jsx/formatDate'
import axios from 'axios'
import Content from './Content'
import EditMode from './EditMode'

const ListItem = ({ todo, setTodos, todos }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const handleDelete = () => {
    axios
      .delete(`/todos/${todo.id}`)
      .then(() => setTodos(todos => todos.filter(item => item.id !== todo.id)))
  }
  const handleEdit = e => {
    e.preventDefault()

    const newStatus = e.target[0].value
    const newTitle = e.target[1].value

    axios
      .patch(`/todos/${todo.id}`, {
        title: newTitle,
        status: newStatus
      })

      .then(() => {
        const updated = {
          ...todo,
          status: newStatus,
          title: newTitle
        }

        // dizideki eski todoyu kaldır yeni todo koy

        const newTodos = todos.map((todo) => todo.id === updated.id ? updated : todo
        );

        // stati güncelle
        setTodos(newTodos)
      })

    setIsEditMode(false)
  }

  return (
    <li
      className='relative p-3 list-group-item d-flex 
    justify-content-between align-items-center gap-2'
    >
      {!isEditMode ? (
        <Content
          todo={todo}
          setIsEditMode={setIsEditMode}
          handleDelete={handleDelete}
        />
      ) : (
        <EditMode
          todo={todo}
          setIsEditMode={setIsEditMode}
          handleEdit={handleEdit}
        />
      )}

      <span className='date'>{formatDate(todo.date)}</span>
    </li>
  )
}
export default ListItem
