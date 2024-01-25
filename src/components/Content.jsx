import getStatus from "../Helpers.jsx/GetStatus"

const Content = ({todo, setIsEditMode, handleDelete}) => {
  return (
    <>
    {getStatus(todo.status)}

  <span>{todo.title}</span>

  <div className='btn-group'>

    <button onClick={() => setIsEditMode(true)} className='btn btn-sm btn-primary'>Düzenle</button>
    <button onClick={handleDelete} className='btn btn-sm btn-danger'>
      Sil
    </button>
  </div>
  </>
  )
}

export default Content