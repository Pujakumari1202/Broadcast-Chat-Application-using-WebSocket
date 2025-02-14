import './App.css';
import {useEffect} from 'react';


//websocket connection to the backend server



function App() {

  //on mounts it will connect to the backend server
  useEffect(()=>{

    const ws=new WebSocket("http://localhost:3000");
  },[]);


  return <div className='h-screen bg-black'>
    <div className='h-[90vh]'></div>
    <div className='w-full bg-white flex p-4'>
      <input type="text" className="flex-1 " ></input>
      <button className='bg-purple-600 text-white'>
        Send message
      </button>

    </div>
   hii there
  
  </div>
}

export default App

