import formatDate from '../Helpers.jsx/formatDate'
import getStatus from '../Helpers.jsx/GetStatus'
import axios from 'axios'

const ListItem = ({ todo, setTodos }) => {
  const handleDelete = () => {
    axios.delete(`/todos/${todo.id}`)
    .then(() => setTodos((todos) => todos.filter((item) => item.id !== todo.id )) )
  }
  return (
    <li className='relative p-3 list-group-item d-flex justify-content-between align-items-center'>
      {getStatus(todo.status)}
      <span>{todo.title}</span>
      <div className='btn-group'>
        <button className='btn btn-sm btn-primary'>Düzenle</button>
        <button onClick={handleDelete} className='btn btn-sm btn-danger'>
          Sil
        </button>
      </div>
      <span className='date'>{formatDate(todo.date)}</span>
    </li>
  )
}
export default ListItem
