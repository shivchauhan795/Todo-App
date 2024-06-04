import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd = () => {
    if (todo === "") return
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:conatiner md:mx-auto my-5 rounded-xl bg-violet-200 p-5 m-10 min-h-[80vh] md:w-1/2">
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full px-5 rounded-lg py-2' />
          <button onClick={handleAdd} className='bg-violet-700 hover:bg-violet-900 p-2 py-1 text-white rounded-md text-sm font-bold '>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-lg font-bold'>Your Todo's</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No todos to display</div>}
          {todos.map(items => {

            return (showFinished || !items.isCompleted) && <div key={items.id} className="todo flex md:w-1/2 my-3 justify-between ">
              <div className='flex gap-5'>
                <input name={items.id} onChange={handleCheckBox} type="checkbox" checked={items.isCompleted} id="" />
                <div className={`${items.isCompleted ? "line-through" : ""}`}>{items.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, items.id) }} className='bg-violet-700 hover:bg-violet-900 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, items.id) }} className='bg-violet-700 hover:bg-violet-900 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
