import { useEffect, useState } from "react";
import Form from "./components/form";
import Loader from "./components/Loader";
import ListItem from "./components/ListItem";
import axios from "axios";

axios.defaults.baseURL=`http://localhost:3000`

function App() {
  const [todos, setTodos] = useState(null)
  const [page, setPage] = useState(1)
  const [maxPageCount, setMaxPageCount] = useState()

  useEffect(() => {
    axios 
    .get('/todos',{
      timeout:3000,
      timeoutErrorMessage:'Zaman Aşımı',
      params:{
        _page: page,
        _per_page: 10,
      },
    })
    .then((res) => {
      setMaxPageCount(res.data.pages)
      setTodos(res.data.data)
    })
    .catch((err) =>{ 
      console.log(err)
    if (err.message === 'zaman asımı'){
    alert("istek zaman asımına ugradı")
   }
   });
  }, [page]);

  return (
    <div className="container p-3 p-md-5">
      <h2 className="text-center ">YAPILACAKLAR <span className="text-danger">LİSTESİ</span>
      </h2>

      <Form setTodos = {setTodos}/>

     <ul className="list-group">

      {!todos &&  <Loader /> }
      {todos?.map((todo) => (
        <ListItem key={todo.id} todo = {todo} setTodos= {setTodos}/>
      ))}
     </ul>
     <div className="d-flex justify-content-between my-5">
      <button disabled= {page === 1} 
      onClick= {() => setPage(page - 1)} className="btn btn-primary ">
        {'< Geri'}
      </button>
      <span>{page}</span>
<button 
disabled= { page === maxPageCount}
onClick= {() => setPage(page + 1)} 
className="btn btn-primary ">
        {' > İleri'}
  
</button>

     </div>
    </div>
  );
}

export default App;
