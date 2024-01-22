import { useEffect, useState } from "react";
import Form from "./components/form";
import Loader from "./components/Loader";
import ListItem from "./components/ListItem";
import axios from "axios";

axios.defaults.baseURL=`http://localhost:3000`

function App() {
  const [todos, setTodos] = useState(null)
  useEffect(() => {
    axios 
    .get('/todos',{
      timeout:3000,
      timeoutErrorMessage:'Zaman Aşımı'
    })
    .then((res) => setTodos(res.data))
    .catch((err) =>{ 
      console.log(err)
    if (err.message === 'zaman asımı'){
    alert("istek zaman asımına ugradı")
   }
   });
  }, []);

  return (
    <div className="container p-5">
      <h2 className="text-info ">YAPILACAKLAR <span className="text-danger">LİSTESİ</span>
      </h2>

      <Form setTodos = {setTodos}/>

     <ul>
      {!todos &&  <Loader /> }
      {todos?.map((todo) => (
        <ListItem key={todo.id} todo = {todo} setTodos= {setTodos}/>
      ))}
     </ul>
    </div>
  );
}

export default App;
