
import { useState } from 'react'
import axios from 'react'

function Create({ onAdd }){
    const [tasks, setTasks] = useState()

    const handleAdd = () => {
      axios.post('http://localhost:5173/'),{tasks:tasks}
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
    return(
        <>
        <div className='flex align-center'>
            <input type='text' name='' id='' className="border " onChange={(e)=>{setTasks(e.target.value)}} value={tasks}/>
        <button className="bg-blue-500 rounded-tr rounded-br p-1 " onClick={handleAdd}>Add</button>
        </div>
        
        
        </>
    )
}
export default Create;