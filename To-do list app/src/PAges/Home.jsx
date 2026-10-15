import Create from './Create'
import {useState} from 'react'
function Home(){
 const [todos, setTodos]=useState([])

    const addTodo = (todo) => {
        
    }

    return(
         
        <div  className='Justify-center align-center' >
           <h1 className='text-2xl font-bold'>To-Do List</h1>
        <Create onAdd={addTodo} />
        { 
            todos.length === 0 ?
            <div><h2>No List</h2></div>
            :
            todos.map((todo) => <div key={todo}>{todo}</div>)
        
        }
        </div>

    
       
         
    )
}
export default Home;