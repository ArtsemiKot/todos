import './App.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';
import style from './style.module.css'
function App() {
  const [arrList, setArrList] = useState([])
  const [value, setValue] = useState('')

  async function getData() {
    const responce = await axios.get('https://dummyjson.com/todos')
    setArrList(responce.data.todos)
  }

  const addTask = async () => {
    const responce = await axios.post('https://dummyjson.com/todos/add', {
      todo: value,
      completed: false,
      userId: 5,
    });
    setArrList([...arrList, responce.data]);
    setValue('');
  };

  const deleteTask = async (elem) => {
    const responce = await axios.delete(`https://dummyjson.com/todos/${elem.id}`);

    const newArrList = arrList.filter((el) => el.todo !== responce.data.todo);

    setArrList(newArrList);
  };

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className={style.wrapper}>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
      <Button variant="contained" onClick={() => addTask()}>Add</Button>
      <div className={style.list}>{arrList.map((el, i) => <div key={i}><p>{el.todo} <CreateIcon></CreateIcon> <DeleteIcon onClick={() => deleteTask(el)}></DeleteIcon></p></div>)}</div>
    </div>
  )
}

export default App
