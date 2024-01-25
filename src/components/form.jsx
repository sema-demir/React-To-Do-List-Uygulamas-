import { useState } from "react";
import { v4 } from "uuid";
import axios from "axios";

const Form = ({ setTodos }) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    const status = e.target[1].value;

    if (!title) {
      return alert("Lütfen Başlık Yazınız");
    }

    const newTodo = {
      title: title,
      status: status,
      id: v4(),
      date: new Date().toLocaleDateString(),
    };

    axios.post('/todos', newTodo)
      .then(() => {
        setTodos((todos) => [newTodo, ...todos]);
        setInputValue(''); // input değerini temizle
      })
      .catch(() => alert('Üzgünüz bir Sorun oluştu'));
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-center gap-3 my-5">
      <input
        placeholder="Ör: React Projesi Yap"
        className="form-control shadow"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <select className="form-select w-50 shadow">
        <option>Seçiniz</option>
        <option value="daily">Günlük</option>
        <option value="important">Önemli</option>
        <option value="weekly">Haftalık</option>
        <option value="job">İş</option>
      </select>

      <button type="submit" className="btn btn-primary">
        Gönder
      </button>
    </form>
  );
};

export default Form;